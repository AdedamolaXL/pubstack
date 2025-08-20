"use client";
import { axios } from "@/app/axios";
import { useMutation } from "react-query";
import { FaucetDripInput } from "../shared/types";

const faucetDripHelper = (input: FaucetDripInput) => {
  return axios.post(`/faucet/drips`, input);
};

export const useFaucetDripMutation = () => {
  return useMutation(faucetDripHelper);
};
