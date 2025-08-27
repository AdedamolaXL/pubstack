'use client';
import { useSearchParams } from 'next/navigation';
import { Content } from '@/app/components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useWallet } from '@/app/axios';
import { useTransactionQuery } from '@/app/axios/transactions';

// Create a component that uses useSearchParams
function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const walletId = searchParams.get('wallet');
  const amount = searchParams.get('amount');
  const [walletAddress, setWalletAddress] = useState('');
  const challengeId = searchParams.get('challengeId');
  const txHash = searchParams.get('txHash');
  const [transaction, setTransaction] = useState<any>(null);
  
  // Get wallet details to show the actual address
  const { data: wallet } = useWallet(walletId || '');

  const { data: txData } = useTransactionQuery(txHash || '');

  useEffect(() => {
    if (wallet) {
      setWalletAddress(wallet.data.wallet.address);
    }
    
    if (txData) {
      setTransaction(txData);
    }
  }, [wallet, txData]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Content>
        <div className="text-center">
          <Image
            src="/Success.gif"
            width={120}
            height={120}
            alt="Success"
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-serif font-bold text-dune-900 mb-2">Payment Successful!</h1>
          <p className="text-dune-600 mb-8">
            Your payment of ${amount} USDC has been processed successfully
          </p>
          
          {walletAddress && (
            <div className="bg-gray-100 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
              <p className="font-medium text-dune-900 mb-1">From Wallet:</p>
              <p className="text-sm text-dune-600 break-all">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
              </p>
              <p className="font-medium text-dune-900 mt-3 mb-1">Amount:</p>
              <p className="text-sm text-dune-600">${amount} USDC</p>
              <p className="font-medium text-dune-900 mt-3 mb-1">Status:</p>
              <p className="text-sm text-green-600">Confirmed</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Continue Shopping
            </Link>
            <Link
              href="/wallets"
              className="px-6 py-3 bg-white border border-gray-300 text-dune-700 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View Wallets
            </Link>
          </div>
        </div>
      </Content>
    </div>
  );
}

// Main component with Suspense boundary
export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}