import { Deposit } from "@/app/containers/Deposit";

type DepositParams = {
  params: {
    id: string;
  };
};

export default function DepositPage({ params }: DepositParams) {
  return <Deposit walletId={params.id} />;
}
