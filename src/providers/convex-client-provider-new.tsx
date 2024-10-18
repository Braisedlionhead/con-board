"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
// import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated, useQuery } from "convex/react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";



interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const publicShableKey = process.env.NEXT_PUBLIC_CLERK_PUBLIC_KEY!;
// const publicShableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={publicShableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <span>content...</span>
        {/* <Content /> */}
      </Authenticated>
        <span>up</span>
          {children}
        <span>down</span>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
