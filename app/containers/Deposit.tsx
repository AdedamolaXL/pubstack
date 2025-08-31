"use client";
import { useWallet } from "@/app/axios";
import { BackButton, CopyButton } from "@/app/components";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

interface DepositProps {
  walletId: string;
}

export const Deposit: React.FC<DepositProps> = ({ walletId }) => {
  const router = useRouter();

  const { data: wallet } = useWallet(walletId);
  const walletAddress = wallet?.data.wallet.address ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <nav className="mb-6">
          <BackButton onClick={router.back} className="text-indigo-600 hover:text-indigo-700">
            Deposit
          </BackButton>
        </nav>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center gap-8">
            <p className="text-gray-600 text-center">
              Use the QR code or wallet address to deposit directly to this wallet.
            </p>
            
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <QRCode 
                value={walletAddress} 
                size={200}
                className="w-full h-auto"
              />
            </div>
            
            <CopyButton
              variant="solid"
              copyValue={walletAddress}
              copyLabel={walletAddress}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
