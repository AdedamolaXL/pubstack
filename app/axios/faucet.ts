"use client";
import { axios } from "@/app/axios";
import { FaucetDripInput } from "../shared/types";
import { useMutation } from "react-query";

const faucetDripHelper = (input: FaucetDripInput) => {
  return axios.post(`/faucet/drips`, input);
};

export const useFaucetDripMutation = () => {
  return useMutation(faucetDripHelper);
};
