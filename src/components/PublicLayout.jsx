// src/components/PublicLayout.jsx
import React from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Wand, Image, CreditCard, Code } from "lucide-react";
import { buildLocalizedPath, createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher.jsx";
import { Toaster } from "sonner";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const NAV_ITEMS = [
  { key: "home", path: "/", icon: Home, requiresAuth: false },
  { key: "transform", path: "transform", icon: Wand, requiresAuth: true },
  { key: "gallery", path: "gallery", icon: Image, requiresAuth: true },
  { key: "pricing", path: "pricing", icon: CreditCard, requiresAuth: false },
  { key: "api", path: "api", icon: Code, requiresAuth: false },
];

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const { i18n, t } = useTranslation("common");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const currentLang = SUPPORTED_LANGUAGES.includes(lang || "") ? lang : i18n.language;
    if (!currentLang) return;

    if (!SUPPORTED_LANGUAGES.includes(lang || "")) {
      navigate(buildLocalizedPath(location.pathname, currentLang), { replace: true });
      return;
    }

    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLang;
    }
  }, [i18n, lang, location.pathname, navigate]);

  const openChat = () => window.open("https://t.me/", "_blank");

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-gray-900">
      {/* === HEADER === */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-[#FAFAF9]/95 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4 py-3 gap-2">
          {/* 1. Лого + мобайл-правый блок */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link
              to={buildLocalizedPath("/", lang)}
              className="flex items-center gap-3 text-gray-900"
            >
              <img
                src="/logo-80px.webp"
                srcSet="/logo-160px.webp 2x"
                alt="HomeDesign Pro — a professional real estate visualization service"
                width="80"
                height="80"
                className="h-10 w-10 sm:h-16 sm:w-16 object-contain rounded-lg"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold">HomeDesign Pro</span>
                <span className="text-xs text-gray-500">
                  Pro staging in seconds
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:hidden">
              <LanguageSwitcher />
              <Link to={createPageUrl("sign-in", lang)}>
                <Button
                  size="sm"
                  className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-3"
                >
                  {t("buttons.signIn")}
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. Навигация */}
          <div className="flex gap-2 sm:gap-4 order-last sm:order-none overflow-x-auto no-scrollbar whitespace-nowrap px-1 -mx-1">
            {NAV_ITEMS.filter((i) => !i.requiresAuth).map((item) => {
              const isActive = location.pathname === buildLocalizedPath(item.path, lang);
              return (
                <Link
                  key={item.path}
                  to={buildLocalizedPath(item.path, lang)}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {t(`layout.nav.${item.key}`)}
                </Link>
              );
            })}
          </div>

          {/* 3. Правая часть десктоп */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={openChat}
            >
              {t("buttons.chat")}
            </Button>

            <Link to={createPageUrl("sign-in", lang)}>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4"
              >
                {t("buttons.signIn")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-[9.5rem] sm:pt-[7rem] pb-24">
        <Outlet />
      </main>

      {/* TOASTER */}
      <Toaster position="top-right" richColors closeButton />

      {/* FOOTER */}
      <footer className="mt-20 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <img
                  src="/logo-80px.webp"
                  srcSet="/logo-160px.webp 2x"
                  alt="HomeDesign Pro — a professional real estate visualization service"
                  width="80"
                  height="80"
                  loading="lazy"
                  className="h-10 w-10 sm:h-16 sm:w-16 object-contain rounded-lg"
                />
                <span className="text-lg font-bold">HomeDesign Pro</span>
              </div>
              <p className="max-w-sm text-sm text-gray-600">
                {t("layout.footer.description")}
              </p>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">
                {t("layout.footer.product")}
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <Link␊
                  to={createPageUrl("transform", lang)}
                  className="block hover:text-gray-900"␊
                >␊
                  {t("layout.footer.transform")}
                </Link>
                <Link␊
                  to={createPageUrl("gallery", lang)}
                  className="block hover:text-gray-900"␊
                >␊
                  {t("layout.footer.gallery")}
                </Link>
                <Link␊
                  to={createPageUrl("pricing", lang)}
                  className="block hover:text-gray-900"␊
                >␊
                  {t("layout.footer.pricing")}
                </Link>
                <Link␊
                  to={createPageUrl("api", lang)}
                  className="block hover:text-gray-900"␊
                >␊
                  {t("layout.footer.api")}
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">
                {t("layout.footer.company")}
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-gray-900"
                >
                  {t("layout.footer.contact")}
                </a>
                <Link␊
                  to={createPageUrl("pricing", lang)}
                  className="block hover:text-gray-900"␊
                >␊
                  {t("layout.footer.upgrade")}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6 text-sm text-gray-500">
            <span>
              {t("layout.footer.rights", { year: new Date().getFullYear() })}
            </span>
            <div className="flex gap-4">
              <a href="/privacy-policy.html" className="hover:text-gray-900">
                {t("layout.footer.privacy")}
              </a>
              <a
                href="/terms-of-services.html"
                className="hover:text-gray-900"
              >
                {t("layout.footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
