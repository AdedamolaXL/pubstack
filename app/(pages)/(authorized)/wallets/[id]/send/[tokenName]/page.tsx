'use client'
import { SendToken } from "@/app/containers/Wallets/Send";
import { ReactElement } from 'react';

interface WalletSendTokenProps {
  params: {
    id: string;
    tokenName: string;
  };
}

export default function WalletSendTokenPage({ params }: WalletSendTokenProps): ReactElement {
  return (
    <SendToken
      walletId={params.id}
      tokenName={decodeURIComponent(params.tokenName)}
    />
  );
}
