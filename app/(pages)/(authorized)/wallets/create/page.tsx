"use client";

import { useCreateWallet, useWallets } from "@/app/axios";
import { BackButton, Content } from "@/app/components";
import { useW3sContext } from '@/app/providers/W3sProvider'
import { BlockchainEnum, blockchainNames } from "@/app/shared/types";
import { blockchainMeta } from "@/app/shared/utils";
import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreateWalletPage() {
  const createWalletMutation = useCreateWallet();
  const router = useRouter();
  const { client } = useW3sContext();

  const previousWalletsCount = useRef<number>(0);
  const [selected, setSelected] = useState<BlockchainEnum>();
  const [loading, setLoading] = useState(false);

  const walletsQuery = useWallets(
    undefined,
    createWalletMutation.status === "success" ? 1000 : undefined,
  );

  useEffect(() => {
    if (
      previousWalletsCount?.current > 0 &&
      previousWalletsCount.current !== walletsQuery.data?.data.wallets.length
    ) {
      router.push("/wallets");
    }
    previousWalletsCount.current = walletsQuery.data?.data.wallets.length ?? 0;
  }, [router, walletsQuery.data?.data.wallets.length]);

  const createLoading = createWalletMutation.isLoading || loading;

  // Group wallets by blockchain to show which ones user already has
  const existingBlockchains = walletsQuery.data?.data.wallets.map(w => w.blockchain) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Content>
        <nav className="mb-6">
          <BackButton 
            onClick={() => router.push("/wallets")}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to Wallets
          </BackButton>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Create Wallet</h1>
        </nav>

        <p className="text-gray-600 mb-6">Select a blockchain to deploy your wallet</p>

        <div className="space-y-3 mb-8">
          {[
            BlockchainEnum.MATIC_AMOY,
            BlockchainEnum.ETH_SEPOLIA,
            BlockchainEnum.AVAX_FUJI,
            BlockchainEnum.SOL_DEVNET,
          ].map((blockchain) => {
            const isDisabled =
              createLoading ||
              existingBlockchains.includes(blockchain);
            
            const blockchainInfo = blockchainMeta(blockchain);
            
            return (
              <button
                key={blockchain}
                disabled={isDisabled}
                onClick={() => setSelected(blockchain)}
                className={`w-full p-4 border rounded-lg flex items-center justify-between transition-colors ${
                  selected === blockchain
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center">
                  <Image
                    alt={`${blockchain}-icon`}
                    src={blockchainInfo.svg}
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  <div className="text-left">
                    <span className="block">{blockchainNames[blockchain]}</span>
                    <span className="text-sm text-gray-500 block">
                      {blockchainInfo.testnet}
                    </span>
                    {existingBlockchains.includes(blockchain) && (
                      <span className="text-xs text-green-600 block mt-1">
                        Wallet already exists
                      </span>
                    )}
                  </div>
                </div>
                {selected === blockchain && (
                  <CheckIcon className="h-5 w-5 text-indigo-600" />
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Gas-Free Transactions</h3>
          <p className="text-blue-700 text-sm">
            All transactions on testnet are gas-free, powered by Circle&apos;s gas credits.
            No need to worry about transaction fees during testing.
          </p>
        </div>

        <div className="grow" />

        {createLoading && (
          <p className="text-center text-gray-500 mb-6">
            Please wait while we create your brand new wallet.
          </p>
        )}

        <button
          disabled={!selected || createLoading}
          onClick={async () => {
            if (selected) {
              const { data: challengeId } =
                await createWalletMutation.mutateAsync({
                  blockchain: selected,
                });

              client?.execute(challengeId, (err) => {
                setLoading(true);
                if (err) {
                  setLoading(false);
                }
              });
            }
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            !selected || createLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {createLoading ? "Creating..." : "Create Wallet"}
        </button>
      </Content>
    </div>
  );
}