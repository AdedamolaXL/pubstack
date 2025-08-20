'use client'
import {
  BackButton,
  Content,
  CopyButton,
} from "@/app/components";
import { useSendTokenContext } from "@/app/providers/SendTokenProvider";
import {   useW3sContext } from '@/app/providers/W3sProvider'
import Image from "next/image";
import {
  calculateEstimatedFee,
  roundNum,
  tokenHelper,
} from "@/app/shared/utils";
import { useCreateTransferMutation } from "@/app/axios";
import { BlockchainEnum, blockchainNames } from "@/app/shared/types";
import { TextField } from "@/app/components/TextField";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

export const SendTokenConfirm = () => {
  const { tokenName, walletId, setStep, tokenAndRecipient, estimatedFee } =
    useSendTokenContext();
  const [loading, setLoading] = useState(false);
  const { client } = useW3sContext();
  const transferMutation = useCreateTransferMutation();

  const imageSymbol = tokenHelper(tokenName);

  const handleSubmit = async () => {
    setLoading(true);
    const { challengeId } = await transferMutation.mutateAsync({
      destinationAddress: tokenAndRecipient.address,
      tokenId: tokenAndRecipient.tokenId,
      walletId,
      amounts: [tokenAndRecipient.amount],
      feeLevel: "LOW",
    });

    client?.execute(challengeId, (error) => {
      if (!error) {
        setStep(3);
      }
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Content>
        <nav className="mb-4">
          <BackButton onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-700">
            Summary
          </BackButton>
        </nav>

        <div className="flex flex-col items-center mb-8">
          <Image
            className="mb-4"
            src={imageSymbol.svg}
            width={80}
            height={80}
            alt="coin"
          />
          <span className="text-3xl font-semibold text-gray-900 text-center max-w-xs">
            {tokenAndRecipient.amount} {imageSymbol.symbol}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <TextField
            value={tokenAndRecipient.address}
            label="To"
            endDecorator={<CopyButton copyValue={tokenAndRecipient.address} />}
            readOnly
            className="w-full"
          />
          
          <TextField
            value={blockchainNames[tokenAndRecipient.network as BlockchainEnum]}
            label="Network"
            readOnly
            className="w-full"
          />
          
          <TextField
            readOnly
            startDecorator={
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">
                Paid By Circle
              </span>
            }
            label="Estimated Gas Fee"
            value={`${roundNum(String(calculateEstimatedFee(estimatedFee)), 8)} ${tokenAndRecipient.network}`}
            className="w-full"
          />
        </div>

        <button
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin">↻</span>
          ) : (
            <>
              <PaperAirplaneIcon className="h-5 w-5" />
              Send
            </>
          )}
        </button>
      </Content>
    </div>
  );
};
