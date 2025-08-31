"use client";
import { axios } from "@/app/axios";
import { Token } from "../shared/types";
import { useQuery } from "react-query";

const tokenDetailsHelper = async (tokenId: string) => {
  const response = await axios.get<{
    token: Token;
  }>(`/tokens/${tokenId}`);

  return response.data.token;
};

export const useTokenDetailsQuery = (tokenId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["getTokenDetails", tokenId],
    queryFn: () => tokenDetailsHelper(tokenId),
    enabled: enabled ?? true
  });
};
