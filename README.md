# PUBSTACK

Check out the [live demo](https://user-controlled-wallets-sample-app.circle.com/) first to see what to expect!

## Problem Background

Crypto's promise has always been borderless, censorship-resistant payments. Yet after 5 years of broader adoption, users still face double friction: paying for a product and sourcing native gas tokens. The impact of this is that: users drops off at checkout and businesses lose customers. 

Circle’s gasless payment system eliminates this hurdle. Users typically only need USDC (a stable, familiar currency) and gas is abstracted by the platform (sponsored via Paymaster). This simple looking process breaks the UX barriers for a global payment system driven by crypto. While, at the same time being transformative for the average online business whose users are typically not crypto-savvy.

For the purpose of this hackathon, we built PUBSTACK, a creator-focused platform. We chose this direction because creators; whether independent operators on their own sites or writers on aggregators like Substack and Medium represent niche businesses with significant, though highly uneven, revenue potential.

A quick survey of 2024 creator earnings shows this spectrum clearly:

- Online courses, where creators earn $500–$5,000 per month, while established ones in high-demand niches (programming, digital marketing) can surpass $100,000 annually.
- E-books publishers that average ~$1,800/month in royalties, with some hitting $20,000+ annually by targeting medium-content niches (puzzles, coloring books).

Conversely,

- Medium writers earn under $100, with only the top 1% earn $5,000–$30,000 monthly.
- Substack creators income is directly tied to paid subscribers-- with ~100 subscribers, creators can earn anywhere from $350 to $6,500 per month, depending on tiering.

Compare with ad revenue from,

- Outlets with 1M+ monthly visitors can earn hundreds of thousands per year in ad revenue, while smaller ones average ~$3,000–$5,000 for every 100,000 mobile visitors.

## Problem Statement
These numbers show both the opportunity and the precariousness of creator income. Despite attracting large audiences, most creators earn little. The gap is not just content-related however— it’s financial infrastructure. Revenue is lost at the payment layer due to:
- Audience friction: Card failures, FX markups, geo-restrictions.
- Creator dependence: Reliance on Stripe, PayPal, or local card rails.
- Platform overhead: Managing wallets, native tokens, and fragmented payout rails.

Through the simplicity of PUBSTACK's checkout flow; we hypothesize that introducing gasless USDC payments can break new ground in creator monetization by:
- Offering global, instant settlement without reliance on card networks.
- Expanding audiences by removing geographic payment barriers.
- Reducing overhead for creators and platforms alike.

## Solution: PUBSTACK

PUBSTACK is a creator-focused platform that integrates Circle Wallets and Gas Station to deliver frictionless, borderless payments in USDC.

### Key Features:

- Gasless Checkout: Buyers pay in USDC. Native gas fees are sponsored via Circle Paymaster, ensuring a smooth, one-step checkout.
- Creator Wallets: Each creator gets a secure, programmable wallet powered by Circle on signup. No seed phrases.
- Global Accessibility: Audiences can pay from anywhere, without dependency on card networks or local rails.
- Seamless Settlement: Payments arrive instantly in USDC, reducing reliance on intermediaries like Stripe or PayPal.

Value Delivered:
- For Audiences: Seamless, card-free global checkout with stable USDC.
- For Creators: Higher conversion, instant earnings, lower dependency on centralized payment providers.
- For Platforms: Simplified wallet + payment infrastructure, reduced support overhead.

How It Works
- User selects a digital product (ebook, course module).
- Checkout prompts a USDC payment → PUBSTACK abstracts gas via Circle Paymaster.
- USDC is routed directly to the creator’s wallet, provisioned via Circle’s Wallet-as-a-Service.
- Creator accesses funds instantly, with no payout delays or middlemen.

## CORE FUNCTIONS:

### 1. User Onboarding & Authentication
- Email/password registration and login
- Seamless wallet creation during onboarding
- Session management with JWT tokens
- PIN security setup for wallet operations

### 2. Multi-Chain Wallet Management
- Programmable wallet creation across 4 testnets:
  - Polygon Amoy
  - Ethereum Sepolia
  - Avalanche Fuji
  - Solana Devnet
- Native token and USDC balance monitoring
- Deposit addresses and QR codes
- Transaction history with status tracking

### 3. Creator Marketplace
- Product catalog for digital goods (ebooks, mentorship)
- Shopping cart with persistent storage
- Shopping cart experience with quantity management
- Merchant-specific payment addresses per blockchain

### 4. Gasless Checkout Flow
- USDC balance validation pre-purchase
- One-click gasless transactions
- Real-time payment status updates
- Automated order confirmation and cart clearing

### 5. Creator Dashboard
- Sales analytics and revenue tracking
- Payment method analytics (USDC vs traditional)
-Gas savings calculations
-Customer management and order history

## Overview

User-Controlled Wallets Sample App showcases the integration of Circle's Web3 Services products (Web SDK, [Smart Contract Accounts (SCA)](https://developers.circle.com/w3s/docs/programmable-wallets-account-types) user-controlled wallets, gasless transactions). You can download and easily run and configure for your own projects. The use case it will be supporting is integrating user-controlled wallets into an existing web application, so that you can provide wallets to your end users.

This is a sample frontend UI that plays a part in the larger Sample App project. We use [Circle Web3 Services Web SDK](https://developers.circle.com/w3s/docs/web) to protect users' sensitive data like PINs or security answers, which will be used to interact with Circle APIs for [User-Controlled Wallets](https://developers.circle.com/w3s/reference/createuser).

## Prerequisites

1. Sign up for [Circle's Dev Console](https://developers.circle.com/w3s/docs/circle-developer-account) to obtain an [App ID](https://console.circle.com/wallets/user/configurator). Side Bar Navigation: Programmable Wallets / User Controlled / Configurator

2. Install [nvm](https://github.com/nvm-sh/nvm), [openssl](https://formulae.brew.sh/formula/openssl@3), and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), these are required development tools.

3. **_Important:_** Set up the [Sample Server](https://github.com/circlefin/w3s-sample-user-controlled-server-node) as well to get the end-to-end experience. Please be aware that the [SDK user token](https://developers.circle.com/w3s/reference/getusertoken) will expire after 60 minutes.

## Configure the Sample App

1. Run `yarn env:config`, and you will see a `.env` file generated in the root directory
2. Paste your [App ID](https://console.circle.com/wallets/user/configurator) with `[APP_ID goes here]` in the `.env` file.

## Get Started

Run the following commands to start the UI at `localhost:3000`:

``` bash
nvm use
yarn install
yarn dev
```

1. `nvm use`: set node version.
2. `yarn install`: install dependencies.
3. `yarn dev`: run the server, hot reload is supported.

## Architecture

The frontend UI will play the role as `Your Application`, see [details](<https://developers.circle.com/w3s/docs/sdk-architecture-for-user-controlled-wallets#sdk-architecture>).
![image](https://files.readme.io/a2a1678-SDK_UserC_Wallets_Sequence__Detailed2x.png)

## Code Structure

We use [Next.js](https://nextjs.org/) as [React](https://react.dev/) framework and [Joy UI](https://mui.com/joy-ui/getting-started/) as React component library.

- The main logic to interact with the Circle Web3 Services Web SDK is going to be in our client side component in `app/components`:
  - `providers/W3sProvider.tsx`: holds the value to setup and instantiate a SDK instance. Part of the setup is authorizing with the App ID,
  
      ```javascript
        webClient?.setAppSettings({
          appId,
        });
      ```

      setting up the forgot pin callback,

      ```javascript
        webClient?.setOnForgotPin(async () => {
          const response = await axios.post<{ challengeId: string }>(
            "/users/pin/restore",
          );
          if (response.data) {
            webClient.execute(response.data.challengeId);
          }
        });
      ```

      and authenticating with the user token + encryption key.

      ```javascript
        client.setAuthentication({
            userToken: currUser.userToken,
            encryptionKey: currUser.encryptionKey,
          });
      ```

  - `Authentication/AuthenticationForm.tsx` has an example of executing a challenge ID and cutomizing behavior based off a successful execution.

    ```javascript
      client.execute(session.user.challengeId, (error, result) => {
        if (error) {
          setFormMessage("An error occurred on PIN Setup. Please try again.");
        } else if (result) {
          router.push("/wallets");
        }
      });
    ```

- `app/(pages)` contains all the server side pages of this Next.js application. Any directory wrapped in `()` is a [route grouping](https://nextjs.org/docs/app/building-your-application/routing/route-groups).
  - `(authorized)/`: all server side pages that can only be viewed if the user has a valid session. Check out `(authorized)/layout.ts` to see session validation.
- The above are the most important files to get an understanding of this application. All other files are specific to this application and not crucial to using Circle Web3 Services Web SDK.

**Happy Coding!**

## Additional Resources
  
- [Circle Web3 Services Web SDK](https://developers.circle.com/w3s/docs/web-sdk-ui-customizations) supports UI customization, check [more examples](https://github.com/circlefin/w3s-pw-web-sdk).
- Need help: <customer-support@circle.com>
- Join our Discord community: <https://discord.com/invite/buildoncircle>
