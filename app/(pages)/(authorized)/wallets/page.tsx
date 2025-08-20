"use client";
import { useRouter } from "next/navigation";
import { useWallets } from "@/app/axios";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "@/app/components";
import { UseQueryOptions } from "react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function WalletPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const refetchIntervalFn: UseQueryOptions["refetchInterval"] = (
    _data,
    query,
  ) => {
    if (query.state.dataUpdateCount < 3) {
      return 2000;
    } else {
      setLoading(false);
      return false;
    }
  };
  const { data: wallets } = useWallets(undefined, refetchIntervalFn);

  useEffect(() => {
    if (wallets && wallets.data?.wallets?.length > 0) {
      // redirect to the first wallet
      const firstWallet = wallets.data.wallets[0];
      const walletId = firstWallet.id;
      router.push(`/wallets/${walletId}`);
    }
  }, [router, wallets]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <LoadingWrapper isLoading={loading}>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Image
            src="/ErrorIcon.svg"
            height={100}
            width={100}
            alt="No wallets"
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </p>
          <p className="text-gray-600 mb-6">
            Sign out and restart the app to try again
          </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      </LoadingWrapper>
    </div>
  );
}
