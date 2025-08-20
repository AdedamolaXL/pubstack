"use client";
import {
  useTokenDetailsQuery,
  useTransactionsQuery,
  useWallet,
} from "@/app/axios";
import { LoadingWrapper } from "@/app/components";
import Image from "next/image";
import { Transaction } from "../shared/types";
import { useRouter } from "next/navigation";
import { MegaphoneIcon, ChevronRightIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { getTransactionOperation, formatDate } from "../shared/utils";

interface WalletActivityProps {
  id: string;
}

export const WalletActivity: React.FC<WalletActivityProps> = ({ id }) => {
  const { data: transactions, isLoading } = useTransactionsQuery(id);
  const { data: wallet } = useWallet(id);

  if (!isLoading && transactions?.length === 0) {
     return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Image
          alt='no tokens'
          src={`/NoActivity.svg`}
          height={80}
          width={80}
          className="mb-4 opacity-70"
        />
        <p className="text-gray-500">
          No activity yet
        </p>
      </div>
    );
  }

  return (
    <LoadingWrapper isLoading={isLoading}>
      <div className="rounded-xl overflow-hidden">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>
        
        {transactions?.length ? (
          <ul className="divide-y divide-gray-200/50">
            {transactions?.map((transaction: Transaction, index: number) => (
              <li key={transaction.id}>
                <TransactionRow
                  transaction={transaction}
                  walletId={id}
                  walletAddress={wallet?.data.wallet.address ?? ""}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 flex items-center">
              No transactions for this wallet
              <MegaphoneIcon className="h-5 w-5 ml-2" />
            </p>
          </div>
        )}
      </div>
    </LoadingWrapper>
  );
};

const TransactionRow = ({
  transaction,
  walletId,
  walletAddress,
}: {
  transaction: Transaction;
  walletId: string;
  walletAddress: string;
}) => {
  const router = useRouter();

  const { operation, operator } = getTransactionOperation(
    walletAddress,
    transaction,
  );

  const tokenId = transaction?.tokenId ?? "";
  const { data: tokenDetails } = useTokenDetailsQuery(
    tokenId,
    transaction.tokenId !== undefined,
  );
  const date = useMemo(() => {
    return transaction?.createDate
      ? new Date(transaction.createDate)
      : new Date();
  }, [transaction?.createDate]);

  return (
    <li>
      <button
        onClick={() =>
          router.push(`/wallets/${walletId}/activity/${transaction.id}`)
        }
        className="w-full px-4 py-4 hover:bg-indigo-50/30 transition-colors flex justify-between items-center rounded-lg group"
      >
        <div className="flex items-center">
          <div className={`rounded-xl h-12 w-12 flex items-center justify-center ${
            operator === '+' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {operator === '+' ? (
              <ArrowDownIcon className="h-6 w-6" />
            ) : (
              <ArrowUpIcon className="h-6 w-6" />
            )}
          </div>
          <div className="ml-4 text-left">
            <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{operation}</p>
            <p className="text-sm text-gray-500">{formatDate(date)}</p>
            <p className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
              transaction.state === 'COMPLETE' 
                ? 'bg-green-100 text-green-700' 
                : transaction.state === 'FAILED' 
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {transaction.state}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-medium ${operator === '+' ? 'text-green-600' : 'text-red-600'}`}>
            {operator}
            {transaction.amounts && transaction.amounts[0]}{" "}
            {tokenDetails?.symbol}
          </p>
          <p className="text-sm text-gray-500">
            {transaction.networkFee && `Fee: ${transaction.networkFee}`}
          </p>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
      </button>
    </li>
  );
};