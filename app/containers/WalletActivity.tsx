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
          className="mb-4"
        />
        <p className="text-gray-500">
          No activity yet
        </p>
      </div>
    );
  }

  return (
    <LoadingWrapper isLoading={isLoading}>
      {transactions?.length ? (
        <ul className="divide-y divide-gray-200">
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
        className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex justify-between items-center"
      >
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
            operator === '+' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {operator === '+' ? (
              <ArrowDownIcon className="h-5 w-5" />
            ) : (
              <ArrowUpIcon className="h-5 w-5" />
            )}
          </div>
          <div className="ml-4 text-left">
            <p className="font-medium text-gray-900">{operation}</p>
            <p className="text-sm text-gray-500">{formatDate(date)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">
            {operator}
            {transaction.amounts && transaction.amounts[0]}{" "}
            {tokenDetails?.symbol}
          </p>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </button>
    </li>
  );
};
