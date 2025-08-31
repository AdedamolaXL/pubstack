"use client";
import { TokenBalance } from "@/app/shared/types";
import {
  useWallet,
  useWalletBalances,
  useFaucetDripMutation,
} from "@/app/axios";
import { LoadingWrapper, TokenCard } from "@/app/components";
import { useCallback, useMemo, useState } from "react";
import { blockchainMeta, tokenHelper } from "../shared/utils";
import { WalletActivity } from "./WalletActivity";
import FaucetSvg from "@/public/Faucet.svg"
import Image from "next/image";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

interface WalletDetailsProps {
  id: string;
}

type TabType = 'tokens' | 'activity';

export const WalletDetails: React.FC<WalletDetailsProps> = ({ id }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const { data: balanceData, isLoading } = useWalletBalances(id);
  const { data: walletData } = useWallet(id);
  const dripFaucet = useFaucetDripMutation();

  const mainBalance = useMemo(() => {
    if (!balanceData?.data) {
      return;
    }

    const sorted = balanceData.data.tokenBalances.sort((a, b) => {
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
    <div className="min-h-screen">
      <LoadingWrapper isLoading={isLoading}>
        <div className="max-w-2xl mx-auto p-4">
          {/* Token balance */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2 font-medium">Total Balance</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              {mainBalance?.amount ?? "0"}{" "}
              <span className="text-3xl text-gray-600">
                {mainBalance
                  ? nativeTokenInfo.name
                  : blockchainInfo.nativeTokenName}
              </span>
            </h1>
            <p className="text-gray-500 text-sm">
              {blockchainInfo.testnet}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => router.push(`/wallets/${id}/deposit`)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
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
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
              >
                <Image src="/Faucet.svg" alt="Faucet" width={30} height={70} className="h-5 w-5" />
                Get USDC
              </button>
            ) : (
              <button
                onClick={() => router.push(`/wallets/${id}/send`)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                <ArrowUpIcon className="h-5 w-5" />
                Send
              </button>
            )}
          </div>

          {isWalletEmpty && (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-sm">
              <Image
                alt='no tokens'
                src={`/NoTokens.svg`}
                height={100}
                width={100}
                className="mb-4 opacity-80"
              />
              <div className="max-w-md mx-auto">
                {(dripFaucet?.status === "idle" ||
                  dripFaucet?.status === "loading") && (
                  <p className="text-gray-500">
                    Your wallet is empty. Get started by adding some funds.
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
                      className="text-indigo-600 hover:underline font-medium"
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm">
              <div className="border-b border-gray-200/50">
                <nav className="flex">
                  <button 
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'tokens' 
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('tokens')}
                  >
                    Tokens
                  </button>
                  <button 
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'activity' 
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('activity')}
                  >
                    Activity
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'tokens' && (
                  <div className="space-y-4">
                    {balanceData?.data.tokenBalances.map(
                      (token: TokenBalance) => (
                        <div key={token?.token.name} className="bg-white rounded-xl p-4 border border-gray-200/70 shadow-sm hover:shadow-md transition-all">
                          <TokenCard
                            amount={token?.amount}
                            token={token.token}
                          />
                        </div>
                      ),
                    )}
                  </div>
                )}
                
                {activeTab === 'activity' && (
                  <WalletActivity id={id} />
                )}
              </div>
            </div>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};