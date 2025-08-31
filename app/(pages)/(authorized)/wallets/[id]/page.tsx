import { WalletDetails } from "@/app/containers/WalletDetails";

type WalletDetailsParams = {
  params: {
    id: string;
  };
};

export default function WalletDetailsPage({ params }: WalletDetailsParams) {
  return <WalletDetails id={params.id} />;
}