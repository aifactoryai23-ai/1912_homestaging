// src/routes/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

export default function AuthLayout() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      frontendApi="clerk.homedesignpro.ai"
      // твои редиректы как раньше
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      signInForceRedirectUrl="/"
      signUpForceRedirectUrl="/"
    >
      {/* сюда рендерятся все auth/protected роуты */}
      <Outlet />
    </ClerkProvider>
  );
}
