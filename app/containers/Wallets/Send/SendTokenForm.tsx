"use client";
import { tokenHelper } from "@/app/shared/utils";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  BackButton,
  Content,
  LoadingWrapper,
  TextField,
} from "@/app/components";
import { useSendTokenContext } from "@/app/providers/SendTokenProvider";
import {
  useEstimateFeeMutation,
  useValidateAddressMutation,
} from "@/app/axios/transactions";
import { useRouter } from "next/navigation";
import { useWalletBalances } from "@/app/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const SendTokenForm = () => {
  const {
    tokenName,
    walletId,
    tokenAndRecipient,
    setTokenAndRecipient,
    setStep,
    setEstimatedFee,
  } = useSendTokenContext();
  const imageSymbol = tokenHelper(tokenName);
  const router = useRouter();

  const estimateFeeMutation = useEstimateFeeMutation();
  const { data: tokenBalanceData, isLoading } = useWalletBalances(walletId, {
    name: tokenName,
  });

  const token = tokenBalanceData?.data.tokenBalances[0];

  const FormInputs = yup.object().shape({
    address: yup.string().required("Wallet Address required"),
    amount: yup
      .string()
      .test("Check positive nonzero integer", function (val, ctx) {
        if (val) {
          const num = parseFloat(val);
          return num > 0
            ? true
            : ctx.createError({
                message: "Enter a number that is larger than zero",
              });
        } else {
          return true;
        }
      })
      .test("Check less than the wallet balance", function (val, ctx) {
        if (val && token) {
          const num = parseFloat(val);
          return num <= parseFloat(token.amount)
            ? true
            : ctx.createError({
                message: "Cannot send more than the wallet balance",
              });
        } else {
          return true;
        }
      })
      .required("Amount required"),
  });

  type FormInputSchema = yup.InferType<typeof FormInputs>;

  const { register, handleSubmit, setValue, formState, setError, watch } =
    useForm<FormInputSchema>({
      resolver: yupResolver(FormInputs),
      defaultValues: {
        amount: tokenAndRecipient.amount,
        address: tokenAndRecipient.address,
      },
    });

  const validateAddressMutation = useValidateAddressMutation();

  const submitHandler = async (data: FormInputSchema) => {
    const resp = await validateAddressMutation.mutateAsync({
      address: data.address,
      blockchain: token?.token.blockchain ?? "",
    });

    if (resp.isValid === false) {
      setError("address", {
        message: "The address you entered is invalid. Please double-check it.",
      });
      return;
    }
    const tokenId = token?.token.id ?? "";

    const estimatedFee = await estimateFeeMutation.mutateAsync({
      destinationAddress: data.address,
      tokenId: tokenId,
      walletId,
      amount: [data.amount],
    });

    setEstimatedFee(estimatedFee.low);
    setTokenAndRecipient({
      network: token?.token.blockchain ?? "",
      tokenId: tokenId,
      ...data,
    });
    setStep(2);
  };

  return (
    <LoadingWrapper isLoading={isLoading}>
      <form onSubmit={handleSubmit(submitHandler)} className="min-h-screen bg-gray-50">
        <Content>
          <nav className="mb-4">
            <BackButton onClick={router.back} className="text-indigo-600 hover:text-indigo-700">
              Send {token?.token.symbol}
            </BackButton>
          </nav>
          
          <div className="flex flex-col items-center mb-6">
            <Image
              alt="token icon"
              height={80}
              width={80}
              src={imageSymbol.svg}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-900">
              {token?.amount} {token?.token.symbol} available
            </p>
          </div>

          <div className="space-y-4">
            <TextField
              {...register("address")}
              error={!!formState.errors.address?.message}
              helperText={formState.errors.address?.message}
              placeholder="Recipient Address"
              className="w-full"
            />
            
            <TextField
              {...register("amount")}
              error={!!formState.errors.amount?.message}
              placeholder="Amount"
              endDecorator={
                <button
                  type="button"
                  onClick={() => {
                    setValue("amount", token?.amount ?? "");
                  }}
                  className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors"
                >
                  Max
                </button>
              }
              helperText={formState.errors.amount?.message}
              className="w-full"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={token?.amount === "0"}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                token?.amount === "0"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next
            </button>
          </div>
        </Content>
      </form>
    </LoadingWrapper>
  );
};
