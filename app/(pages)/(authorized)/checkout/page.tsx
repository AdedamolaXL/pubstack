'use client';
import { useCart } from '@/app/context/CardContext';
import { useSession } from 'next-auth/react';
import { useWallets, useWallet, useWalletBalances } from '@/app/axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlockchainEnum } from '@/app/shared/types';
import { Content, LoadingWrapper } from '@/app/components';
import Image from 'next/image';
import { useCreateTransferMutation } from '@/app/axios/transactions';
import { useW3sContext } from '@/app/providers/W3sProvider';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: wallets } = useWallets();
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { client } = useW3sContext();
  
  const MERCHANT_ADDRESS = '0xb3afadfe63167826a993fc600ce811b8595e16e3';

  // Get the selected wallet details
  const { data: selectedWallet } = useWallet(selectedWalletId || '');
  
  // Get the USDC token balance for the selected wallet
  const { data: walletBalances } = useWalletBalances(
    selectedWalletId || '',
    { name: 'USDC' }
  );
  
  const createTransfer = useCreateTransferMutation();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  const polygonWallets = wallets?.data?.wallets?.filter(
    wallet => wallet.blockchain === BlockchainEnum.MATIC_AMOY
  );

  const handlePayment = async () => {
    if (!selectedWalletId) {
      setError('Please select a wallet');
      return;
    }
    
    // Find USDC token details
    const usdcTokenBalance = walletBalances?.data?.tokenBalances[0];
    if (!usdcTokenBalance) {
      setError('USDC token not found in wallet');
      return;
    }
    
    const usdcToken = usdcTokenBalance.token;
    
    // Check if wallet has sufficient USDC balance
    const usdcBalance = parseFloat(usdcTokenBalance.amount);
    if (usdcBalance < cartTotal) {
      setError(`Insufficient USDC balance. You need ${cartTotal} USDC but only have ${usdcBalance}`);
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Payment details:', {
        destinationAddress: MERCHANT_ADDRESS,
        tokenId: usdcToken.id,
        walletId: selectedWalletId,
        amounts: [cartTotal.toFixed(6)], // Use display units with 6 decimal places
        feeLevel: "LOW",
        cartTotal: cartTotal
      });
      
      // Create actual payment transaction (use display units, not base units)
      const { challengeId } = await createTransfer.mutateAsync({
        destinationAddress: MERCHANT_ADDRESS,
        tokenId: usdcToken.id,
        walletId: selectedWalletId,
        amounts: [cartTotal.toFixed(6)], // Use display units with 6 decimal places
        feeLevel: "LOW"
      });

      console.log('Transaction initiated with challengeId:', challengeId);
      
      // Execute the transaction
      client?.execute(challengeId, (error) => {
        if (error) {
          setError('Payment failed: ' + error.message);
          setIsProcessing(false);
        } else {
          // Only clear cart and redirect on success
          clearCart();
          router.push(`/checkout/success?wallet=${selectedWalletId}&amount=${cartTotal}&challengeId=${challengeId}`);
        }
      });
    } catch (err) {
      setError('Payment failed: ' + (err as Error).message);
      setIsProcessing(false);
    }
  };

  if (status === 'loading') {
    return <LoadingWrapper isLoading={true} children={undefined} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <li key={item.id} className="py-4 flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)} USDC</span>
          </div>
        </div>

        {/* Wallet Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Pay with USDC</h2>
          <p className="text-gray-600 mb-4">
            Select a Polygon Amoy wallet to complete your payment
          </p>
          
          {polygonWallets?.length === 0 ? (
            <div className="text-center py-8">
              <Image
                src="/NoWallet.svg"
                width={80}
                height={80}
                alt="No wallets"
                className="mx-auto mb-4"
              />
              <p className="text-gray-600 mb-4">
                You don't have any Polygon Amoy wallets
              </p>
              <button
                onClick={() => router.push('/wallets/create')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {polygonWallets?.map(wallet => {
                // Get balance for display
                const walletBalance = walletBalances?.data?.tokenBalances[0];
                const displayBalance = walletBalance ? walletBalance.amount : '0.00';
                
                return (
                  <div
                    key={wallet.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedWalletId === wallet.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedWalletId(wallet.id)}
                  >
                    <div className="flex items-center">
                      <Image
                        src="/Matic.svg"
                        width={24}
                        height={24}
                        alt="Polygon"
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </p>
                        <p className="text-sm text-gray-500">Polygon Amoy</p>
                      </div>
                      {selectedWalletId === wallet.id && (
                        <div className="text-right">
                          <p className="font-medium">
                            {displayBalance} USDC
                          </p>
                          <p className="text-sm text-gray-500">Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!selectedWalletId || isProcessing}
          className={`w-full py-3 rounded-lg font-medium ${
            !selectedWalletId || isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isProcessing ? 'Processing Payment...' : 'Pay with USDC'}
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

        {isProcessing && (
          <div className="mt-4 text-center text-gray-600">
            <p>Confirming transaction in your wallet...</p>
          </div>
        )}
      </div>
    </div>
  );
}