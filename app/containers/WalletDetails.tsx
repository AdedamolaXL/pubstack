"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import FaucetSvg from "@/public/Faucet.svg"
import { TokenBalance, Wallet } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import {
  useWallet,
  useWalletBalances,
  useFaucetDripMutation,
  useWallets,
} from "@/app/axios";
import { LoadingWrapper, TokenCard } from "@/app/components";
import { useCallback, useMemo, useState } from "react";
import { blockchainMeta, tokenHelper, getAddressAbbreviation } from "../shared/utils";
import { WalletActivity } from "./WalletActivity";
import Image from "next/image";

interface WalletDetailsProps {
  id: string;
}

type TabType = 'tokens' | 'activity' | 'wallets';

export const WalletDetails: React.FC<WalletDetailsProps> = ({ id }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const { data: walletsData } = useWallets();

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
    <div className="min-h-screen">
      <LoadingWrapper isLoading={isLoading}>
        <div className="max-w-2xl mx-auto">
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
                <Image src={FaucetSvg} alt="Faucet" className="h-5 w-5" />
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
                  <button 
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'wallets' 
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('wallets')}
                  >
                    Wallets
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
                
                {activeTab === 'wallets' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Your Wallets</h3>
                      <button
                        onClick={() => router.push("/wallets/create")}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        <span>+</span>
                        Create New
                      </button>
                    </div>
                    
                    {walletsData?.data.wallets.map((wallet: Wallet) => (
                      <WalletItem 
                        key={wallet.id} 
                        wallet={wallet} 
                        isCurrent={wallet.id === id}
                        onClick={() => router.push(`/wallets/${wallet.id}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};

// New component to display individual wallet with balance
const WalletItem = ({ 
  wallet, 
  isCurrent, 
  onClick 
}: { 
  wallet: Wallet; 
  isCurrent: boolean;
  onClick: () => void;
}) => {
  const { data: balanceData, isLoading } = useWalletBalances(wallet.id);
  
  // Calculate total balance for this wallet
  const totalBalance = useMemo(() => {
    if (!balanceData?.data) return "0.00";
    
    return balanceData.data.tokenBalances.reduce((total, tokenBalance) => {
      return total + parseFloat(tokenBalance.amount);
    }, 0).toFixed(2);
  }, [balanceData]);

  // Find USDC balance specifically
  const usdcBalance = useMemo(() => {
    if (!balanceData?.data) return "0.00";
    
    const usdc = balanceData.data.tokenBalances.find(
      tb => tb.token.name === "USD Coin" || tb.token.symbol === "USDC"
    );
    
    return usdc ? parseFloat(usdc.amount).toFixed(2) : "0.00";
  }, [balanceData]);

  return (
    <div 
      className={`bg-white rounded-xl p-4 border ${
        isCurrent 
          ? 'border-indigo-300 bg-indigo-50/30' 
          : 'border-gray-200/70 hover:border-indigo-200'
      } shadow-sm hover:shadow-md transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-sm">
            <Image
              src={blockchainMeta(wallet.blockchain).svg}
              alt={`${wallet.blockchain}-icon`}
              width={20}
              height={20}
              className="filter brightness-110"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {blockchainMeta(wallet.blockchain).testnet}
            </p>
            <p className="text-sm text-gray-500">
              {getAddressAbbreviation(wallet.address)}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          {isLoading ? (
            <div className="animate-pulse flex flex-col items-end">
              <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-900">
                ${totalBalance}
              </p>
              <p className="text-xs text-gray-500">
                {usdcBalance} USDC
              </p>
            </>
          )}
          <p className={`text-xs mt-1 ${
            isCurrent 
              ? 'text-indigo-600 font-medium' 
              : 'text-gray-500'
          }`}>
            {isCurrent ? 'Current' : 'Switch'}
          </p>
        </div>
      </div>
    </div>
  );
};