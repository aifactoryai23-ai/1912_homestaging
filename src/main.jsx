// src/main.jsx
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, redirect, RouterProvider, Link, useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import "@radix-ui/themes/styles.css";

import i18n, { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES, getPreferredLanguage } from "@/i18n";
import { buildLocalizedPath } from "@/utils";

import Layout from "@/components/Layout.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";

// Styles
import "@/styles/external/main.css";
import "@/index.css";

// Lazy pages
const Home = lazy(() => import("@/pages/Home.jsx"));
const Transform = lazy(() => import("@/pages/Transform.jsx"));
const Gallery = lazy(() => import("@/pages/Gallery.jsx"));
const Pricing = lazy(() => import("@/pages/Pricing.jsx"));
const API = lazy(() => import("@/pages/API.jsx"));
const Images = lazy(() => import("@/pages/Images.jsx"));

const SignInPage = lazy(() => import("@/pages/SignInPage.jsx"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage.jsx"));
const ToastTest = lazy(() => import("@/pages/ToastTest.jsx"));
const SuccessPage = lazy(() => import("@/pages/Success.jsx"));
const FailPage = lazy(() => import("@/pages/Fail.jsx"));

const AiInteriorDesign = lazy(() => import("@/pages/ai-interior-design.jsx"));
const ProfessionalPropertySale = lazy(() => import("@/pages/professional-property-sale.jsx"));

// 404
function NotFound() {
  const { lang } = useParams();
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | HomeDesign Pro</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">404 — Page Not Found</h1>
        <Link to={buildLocalizedPath("/", lang)} className="text-blue-600 hover:underline">
          Go Home
        </Link>
      </div>
    </>
  );
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) throw new Error("Missing Clerk Publishable Key");

const getValidatedLanguage = (lang) =>
  SUPPORTED_LANGUAGES.includes(lang || "") ? lang : getPreferredLanguage();

const router = createBrowserRouter([
  // ✅ 1) Redirect "/" -> "/:lang"
  {
    path: "/",
    loader: () => {
      const preferred = getPreferredLanguage();
      throw redirect(buildLocalizedPath("/", preferred));
    },
  },

  // ✅ 2) All app routes are under "/:lang"
  {
    path: "/:lang",
    element: <Layout />,
    loader: ({ params }) => {
      const validated = getValidatedLanguage(params.lang);
      if (validated !== params.lang) {
        throw redirect(buildLocalizedPath("/", validated));
      }
      return null;
    },
    children: [
      // Public
      { index: true, element: <Home /> },
      { path: "images", element: <Images /> },
      { path: "pricing", element: <Pricing /> },
      { path: "api", element: <API /> },
      { path: "ai-interior-design", element: <AiInteriorDesign /> },
      { path: "professional-property-sale", element: <ProfessionalPropertySale /> },

      // Protected
      {
        path: "transform",
        element: (
          <ProtectedRoute>
            <Transform />
          </ProtectedRoute>
        ),
      },
      {
        path: "gallery",
        element: (
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        ),
      },

      // Auth
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-in/sso-callback", element: <SignInPage /> },
      { path: "sign-in/verify-email-address", element: <SignInPage /> },

      { path: "sign-up", element: <SignUpPage /> },
      { path: "sign-up/sso-callback", element: <SignUpPage /> },
      { path: "sign-up/verify-email-address", element: <SignUpPage /> },
      { path: "sign-up/verify-email-address/sso-callback", element: <SignUpPage /> },

      // Other
      { path: "toast-test", element: <ToastTest /> },

      // Payment
      { path: "success", element: <SuccessPage /> },
      { path: "fail", element: <FailPage /> },

      // Catch-all within /:lang
      { path: "*", element: <NotFound /> },
    ],
  },

  // Catch-all outside
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={clerkPubKey}
    frontendApi="clerk.homedesignpro.ai"

    // ✅ IMPORTANT: use the *new* props (you already do, keep them)
    signInFallbackRedirectUrl={buildLocalizedPath("transform", i18n.language || FALLBACK_LANGUAGE)}
    signUpFallbackRedirectUrl={buildLocalizedPath("transform", i18n.language || FALLBACK_LANGUAGE)}
    signInForceRedirectUrl={buildLocalizedPath("transform", i18n.language || FALLBACK_LANGUAGE)}
    signUpForceRedirectUrl={buildLocalizedPath("transform", i18n.language || FALLBACK_LANGUAGE)}
  >
    <HelmetProvider>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center text-lg">
            {i18n.t("loading")}
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
      <Analytics />
    </HelmetProvider>
  </ClerkProvider>
);

