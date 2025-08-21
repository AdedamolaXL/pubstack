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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <LoadingWrapper isLoading={loading}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm p-8 max-w-md mx-auto text-center">
          <Image
            src="/ErrorIcon.svg"
            height={100}
            width={100}
            alt="No wallets"
            className="mb-6 mx-auto"
          />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </p>
          <p className="text-gray-600 mb-6">
            Sign out and restart the app to try again
          </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Sign out
          </button>
        </div>
      </LoadingWrapper>
    </div>
  );
}