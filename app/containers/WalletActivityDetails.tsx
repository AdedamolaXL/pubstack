"use client";
import { useWallet } from "@/app/axios";
import {
  LoadingWrapper,
  BackButton,
  CopyButton,
} from "@/app/components";
import {
  findChipColor,
  formatDate,
  getTransactionOperation,
  roundNum,
} from "@/app/shared/utils";
import { useTokenDetailsQuery } from "@/app/axios/tokens";
import { useTransactionQuery } from "@/app/axios/transactions";
import { blockchainNames } from "../shared/types";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

interface WalletActivityDetailsProps {
  walletId: string;
  transactionId: string;
}

export const WalletActivityDetails: React.FC<WalletActivityDetailsProps> = ({
  walletId,
  transactionId,
}) => {
  const router = useRouter();
  const { data: transaction } = useTransactionQuery(transactionId);
  const { data: wallet } = useWallet(walletId);
  const { operation } = getTransactionOperation(
    wallet?.data.wallet.address ?? "",
    transaction,
  );

  const tokenId = transaction?.tokenId ?? "";
  const { data: tokenDetails, isLoading } = useTokenDetailsQuery(
    tokenId,
    transaction?.tokenId !== undefined,
  );
  const date = useMemo(() => {
    return transaction?.createDate
      ? new Date(transaction.createDate)
      : new Date();
  }, [transaction?.createDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingWrapper isLoading={isLoading}>
        <div className="max-w-4xl mx-auto p-4">
          {/* Return to Wallet Activity Page */}
          <div className="mb-6">
            <BackButton onClick={router.back} className="text-indigo-600 hover:text-indigo-700">
              Activity
            </BackButton>
          </div>

          {/* Transaction Amount */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {`${operation} ${transaction?.amounts?.[0]} ${tokenDetails?.symbol}`}
            </h1>
          </div>

          {/* Transaction Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            {operation == "Deposited" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">From</label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{transaction?.sourceAddress ?? ""}</span>
                  <CopyButton copyValue={transaction?.sourceAddress ?? ""} />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">To</label>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{transaction?.destinationAddress ?? ""}</span>
                <CopyButton copyValue={transaction?.destinationAddress ?? ""} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Network</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">
                  {blockchainNames[transaction?.blockchain ?? ""]}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gas Fee</label>
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between">
                <span className="text-green-600">Paid By Circle</span>
                <span className="text-gray-900">
                  {`${roundNum(transaction?.networkFee ?? "0", 8)} ${transaction?.blockchain}`}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Transaction Hash</label>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{transaction?.txHash ?? "Not yet available"}</span>
                {transaction?.txHash && <CopyButton copyValue={transaction?.txHash ?? ""} />}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {transaction?.state && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    findChipColor(transaction.state) === "success" ? "bg-green-100 text-green-800" :
                    findChipColor(transaction.state) === "danger" ? "bg-red-100 text-red-800" :
                    findChipColor(transaction.state) === "neutral" ? "bg-gray-100 text-gray-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {transaction.state}
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">
                  {`${date.toLocaleTimeString()} ${formatDate(date)}`}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push("/wallets")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go to home
            </button>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
};
