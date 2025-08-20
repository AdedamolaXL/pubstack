'use client'
import Image from "next/image";
import { formatDate, tokenHelper } from "@/app/shared/utils";
import { Content, CopyButton } from "@/app/components";
import { useSendTokenContext } from '@/app/providers/SendTokenProvider'
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { BlockchainEnum, blockchainNames } from "@/app/shared/types";
import { TextField } from "@/app/components/TextField";

export const SendTokenSummary: React.FC = () => {
  const { tokenName, tokenAndRecipient } = useSendTokenContext();
  const router = useRouter();
  const params = useParams();

  const imageSymbol = tokenHelper(tokenName);
  const date = useMemo(() => new Date(), []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Content>
        <div className="flex flex-col items-center mb-8">
          <Image
            src={`/Success.gif`}
            width={80}
            height={80}
            alt="Success"
            className="mb-4"
          />
          <span className="text-xl font-semibold text-gray-900 text-center">
            Sent {tokenAndRecipient.amount} {imageSymbol.symbol}
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
            value={formatDate(date)} 
            label="Date" 
            readOnly 
            className="w-full"
          />
        </div>

        <button
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            router.push(`/wallets/${params.id}`);
          }}
        >
          Go to home
        </button>
      </Content>
    </div>
  );
};
