// src/components/ClerkLayout.jsx
import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import Layout from "@/components/Layout.jsx";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) throw new Error("Missing Clerk Publishable Key");

export default function ClerkLayout() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      frontendApi="clerk.homedesignpro.ai"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      signInForceRedirectUrl="/"
      signUpForceRedirectUrl="/"
    >
      {/* Layout уже содержит <Outlet /> */}
      <Layout />
    </ClerkProvider>
  );
}
