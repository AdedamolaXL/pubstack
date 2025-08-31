import { WalletActivityDetails } from "@/app/containers/WalletActivityDetails";

type WalletActivityDetailsParams = {
  params: {
    id: string;
    transactionId: string;
  };
};

export default function WalletActivityDetailsPage({
  params,
}: WalletActivityDetailsParams) {
  return (
    <WalletActivityDetails
      walletId={params.id}
      transactionId={params.transactionId}
    />
  );
}
