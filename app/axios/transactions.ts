"use client";
import { axios } from "@/app/axios";
import {
  EstimateFeeInput,
  EstimateFeeResponse,
  Transaction,
} from "../shared/types";
import { useQuery } from "react-query";
import { useMutation } from "react-query";

const transactionsHelper = async (walletId: string) => {
  const response = await axios.get<{
    transactions: Transaction[];
  }>(`/transactions`, { params: { walletIds: [walletId] } });

  return response.data.transactions;
};

export const useTransactionsQuery = (walletId: string) => {
  return useQuery({
    queryKey: ["listTransactions", walletId],
    queryFn: () => transactionsHelper(walletId),
  });
};

const transactionHelper = async (transactionId: string) => {
  const response = await axios.get<{
    transaction: Transaction;
  }>(`/transactions/${transactionId}`);

  return response.data.transaction;
};

export const useTransactionQuery = (transactionId: string) => {
  return useQuery({
    queryKey: ["getTransaction", transactionId],
    queryFn: () => transactionHelper(transactionId),
  });
};

const estimateFeeHelper = async (input: EstimateFeeInput) => {
  const response = await axios.post<EstimateFeeResponse>(
    "/transactions/transfer/estimateFee",
    input
  );

  return response.data;
};

export const useEstimateFeeMutation = () => useMutation(estimateFeeHelper);

const validateAddressMutationHelper = async ({
  address,
  blockchain,
}: {
  address: string;
  blockchain: string;
}) => {
  const { data } = await axios.post<{}, { data: { isValid: boolean } }>(
    "/transactions/validateAddress",
    {
      address,
      blockchain,
    }
  );

  return data;
};

export const useValidateAddressMutation = () =>
  useMutation(validateAddressMutationHelper);

const createTransferHelper = async (bodyParams: {
  destinationAddress: string;
  tokenId: string;
  walletId: string;
  amounts: string[];
  feeLevel: "LOW" | "MEDIUM" | "HIGH";
}) => {
  const response = await axios.post<{ challengeId: string }>(
    "/transactions/transfer",
    bodyParams
  );

  return response.data;
};

export const useCreateTransferMutation = () =>
  useMutation(createTransferHelper);
