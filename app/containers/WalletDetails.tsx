"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import FaucetSvg from "/public/Faucet.svg";
import { TokenBalance } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import {
  useWallet,
  useWalletBalances,
  useFaucetDripMutation,
} from "@/app/axios";
import { LoadingWrapper, Content, TokenCard } from "@/app/components";
import { useCallback, useMemo } from "react";
import { blockchainMeta, tokenHelper } from "../shared/utils";
import { WalletActivity } from "./WalletActivity";
import Image from "next/image";

interface WalletDetailsProps {
  id: string;
}

export const WalletDetails: React.FC<WalletDetailsProps> = ({ id }) => {
  const router = useRouter();

  const { data: balanceData, isLoading } = useWalletBalances(id);
  const { data: walletData } = useWallet(id);
  const dripFaucet = useFaucetDripMutation();

  const mainBalance = useMemo(() => {
    if (!balanceData?.data) {
      return;
    }

    const sorted = balanceData.data.tokenBalances.sort((a, b) => {
      // if native token with amount go first
      if (a.token.isNative && parseFloat(a.amount) > 0) {
        return -1;
      }

      if (parseFloat(a.amount) > parseFloat(b.amount)) {
        return -1;
      }

      return 1;
    });

    return sorted[0];
  }, [balanceData?.data]);

  const getUsdc = useCallback(async () => {
    await dripFaucet.mutateAsync({
      address: walletData?.data.wallet.address ?? "",
      blockchain: walletData?.data.wallet.blockchain ?? "",
    });
  }, [
    dripFaucet,
    walletData?.data.wallet.address,
    walletData?.data.wallet.blockchain,
  ]);

  const nativeTokenInfo = tokenHelper(mainBalance?.token.name);
  const blockchainInfo = blockchainMeta(walletData?.data.wallet.blockchain);
  const isWalletEmpty =
    !isLoading && balanceData?.data.tokenBalances.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingWrapper isLoading={isLoading}>
        <div className="max-w-4xl mx-auto p-4">
          {/* Token balance */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              {mainBalance?.amount ?? "0"}{" "}
              {mainBalance
                ? nativeTokenInfo.name
                : blockchainInfo.nativeTokenName}
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => router.push(`/wallets/${id}/deposit`)}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ArrowDownIcon className="h-5 w-5" />
              Deposit
            </button>
            
            {isWalletEmpty ? (
              <button
                disabled={
                  dripFaucet.isLoading ||
                  dripFaucet.isSuccess ||
                  dripFaucet.isError
                }
                onClick={getUsdc}
                className="flex items-center gap-2 px-6 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Image src={FaucetSvg} alt="Faucet" className="h-5 w-5" />
                Get USDC
              </button>
            ) : (
              <button
                onClick={() => router.push(`/wallets/${id}/send`)}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowUpIcon className="h-5 w-5" />
                Send
              </button>
            )}
          </div>

          {isWalletEmpty && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Image
                alt='no tokens'
                src={`/NoTokens.svg`}
                height={120}
                width={120}
                className="mb-4"
              />
              <div className="max-w-md mx-auto">
                {(dripFaucet?.status === "idle" ||
                  dripFaucet?.status === "loading") && (
                  <p className="text-gray-500">
                    No tokens yet
                  </p>
                )}

                {dripFaucet.isSuccess && (
                  <p className="text-gray-500">
                    Your funds have been requested, please wait up to 10 seconds
                    for the transaction to settle.
                  </p>
                )}

                {dripFaucet.isError && (
                  <p className="text-gray-500">
                    Oops! There was an issue requesting tokens, please use our{" "}
                    <a
                      href='https://faucet.circle.com'
                      target='_blank'
                      className="text-indigo-600 hover:underline"
                    >
                      public faucet.
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tabs */}
          {!isWalletEmpty && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button className="px-4 py-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                    Tokens
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Activity
                  </button>
                </nav>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  {balanceData?.data.tokenBalances.map(
                    (token: TokenBalance) => (
                      <TokenCard
                        key={token?.token.name}
                        amount={token?.amount}
                        token={token.token}
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="p-4">
                <WalletActivity id={id} />
              </div>
            </div>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};
