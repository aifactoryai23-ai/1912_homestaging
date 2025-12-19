// src/components/Layout.jsx
import React from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Wand, Image, Images, CreditCard } from "lucide-react";
import { buildLocalizedPath } from "@/utils";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import LanguageSwitcher from "@/components/LanguageSwitcher.jsx";
import { Toaster } from "sonner";
import { SUPPORTED_LANGUAGES } from "@/i18n";

// ✅ Radix Themes (используем только на /images)
import { Theme, Button as RButton, Badge, Flex, Text } from "@radix-ui/themes";

const NAV_ITEMS = [

  { key: "home", path: "/", icon: Home, requiresAuth: false },
  { key: "images", path: "/images", icon: Image, requiresAuth: false, badge: "NEW" },
  { key: "transform", path: "/transform", icon: Wand, requiresAuth: true },
  { key: "gallery", path: "/gallery", icon: Images, requiresAuth: true },
  { key: "pricing", path: "/pricing", icon: CreditCard, requiresAuth: false },
];


export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const { i18n, t } = useTranslation("common");
  const [scrolled, setScrolled] = React.useState(false);

  const isImagesPage = location.pathname.includes("/images");
  const navRef = React.useRef(null);
  const updateHeaderVar = React.useCallback(() => {
    const el = navRef.current;
    if (!el || typeof document === "undefined") return;
    const h = el.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--app-header-h", `${h}px`);
  }, []);

  // ✅ измеряем реальную высоту fixed header
  React.useLayoutEffect(() => {
    updateHeaderVar();
  
    const el = navRef.current;
    if (!el) return;
  
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateHeaderVar());
      ro.observe(el);
    }
  
    window.addEventListener("resize", updateHeaderVar);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", updateHeaderVar);
    };
  }, [updateHeaderVar]);

// ✅ FIX: при SPA-переходе (/pricing -> /images) пересчитываем высоту шапки
  React.useEffect(() => {
    requestAnimationFrame(() => {
      updateHeaderVar();
      requestAnimationFrame(updateHeaderVar);
    });
  
    const id = setTimeout(updateHeaderVar, 120);
    return () => clearTimeout(id);
  }, [location.pathname, lang, isImagesPage, updateHeaderVar]);
  
  // ✅ scroll shadow
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // ✅ язык/роутинг как у тебя
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

  // ======= CLASSES (для НЕ /images остаётся твой стиль) =======
  const navBase =
    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors";

  const linkClass = (isActive) => {
    if (isImagesPage) {
      return `${navBase} ${
        isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`;
    }
    return `${navBase} ${
      isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`;
  };

  const badgeClass = () => {
    if (isImagesPage) {
      return "ml-2 rounded-full border border-white/20 bg-white/10 px-2 py-[2px] text-[10px] font-medium uppercase tracking-wide text-white/90";
    }
    return "ml-2 rounded-full border border-gray-300/60 bg-gray-100/60 px-2 py-[2px] text-[10px] font-medium uppercase tracking-wide text-gray-700";
  };

  // ======= NAV RENDER (Radix на /images, Tailwind на остальных) =======
  const renderNav = (signedIn) => {
    const items = signedIn ? NAV_ITEMS : NAV_ITEMS.filter((i) => !i.requiresAuth);

    if (isImagesPage) {
      return (
        <Flex
          gap="2"
          align="center"
          wrap="wrap"
          justify="center"
          className="px-1 -mx-1"
        >

          {items.map((item) => {
            const to = buildLocalizedPath(item.path, lang);
            const isActive = location.pathname === to;

            return (
              <RButton
                key={item.path}
                asChild
                variant={isActive ? "soft" : "ghost"}
                color="gray"
                radius="full"
                size="2"
                highContrast
              >
                <Link to={to} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <Text as="span" size="2" weight="medium">
                    {t(`layout.nav.${item.key}`)}
                  </Text>
                  {item.badge ? (
                    <Badge color="gray" variant="soft" radius="full">
                      {item.badge}
                    </Badge>
                  ) : null}
                </Link>
              </RButton>
            );
          })}
        </Flex>
      );
    }

    // НЕ /images — твой оригинал
    return (
      <div className="flex gap-2 sm:gap-4 order-last sm:order-none overflow-x-auto no-scrollbar whitespace-nowrap px-1 -mx-1">
        {items.map((item) => {
          const isActive = location.pathname === buildLocalizedPath(item.path, lang);
          return (
            <Link
              key={item.path}
              to={buildLocalizedPath(item.path, lang)}
              className={linkClass(isActive)}
            >
              <item.icon className="h-4 w-4" />
              <span>{t(`layout.nav.${item.key}`)}</span>
              {item.badge ? <span className={badgeClass()}>{item.badge}</span> : null}
            </Link>
          );
        })}
      </div>
    );
  };

  // ======= HEADER RIGHT (Radix на /images) =======
  const renderDesktopRight = () => {
      if (isImagesPage) {
        return (
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
      
            <RButton
              variant="soft"
              color="gray"
              radius="full"
              size="2"
              onClick={openChat}
              highContrast
            >
              {t("buttons.chat")}
            </RButton>
      
            <SignedIn>
              <UserButton
                afterSignOutUrl={buildLocalizedPath("/", lang)}
                appearance={{
                  elements: {
                    userButtonBox: "h-8 w-8 sm:h-9 sm:w-9",
                    userButtonAvatarBox: "h-8 w-8 sm:h-9 sm:w-9",
                  },
                }}
              />
            </SignedIn>
      
            <SignedOut>
              <SignInButton mode="modal">
                <RButton
                  radius="full"
                  size="2"
                  highContrast
                  className="bg-white text-black hover:bg-white/90 border border-white/30"
                >
                  {t("buttons.signIn")}
                </RButton>
              </SignInButton>
            </SignedOut>
          </div>
        );
      }


    // НЕ /images — твой оригинал
    return (
      <div className="hidden sm:flex items-center gap-3">
        <LanguageSwitcher />

        <Button variant="outline" size="sm" className="text-xs" onClick={openChat}>
          {t("buttons.chat")}
        </Button>

        <SignedIn>
          <UserButton
            afterSignOutUrl={buildLocalizedPath("/", lang)}
            appearance={{
              elements: {
                userButtonBox: "h-8 w-8 sm:h-9 sm:w-9",
                userButtonAvatarBox: "h-8 w-8 sm:h-9 sm:w-9",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button
              size="sm"
              className="text-xs px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {t("buttons.signIn")}
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    );
  };

  const renderMobileRight = () => {
    return (
      <div className="flex items-center gap-2 sm:hidden">
        <LanguageSwitcher />
        <SignedIn>
          <UserButton
            afterSignOutUrl={buildLocalizedPath("/", lang)}
            appearance={{
              elements: {
                userButtonBox: "h-8 w-8",
                userButtonAvatarBox: "h-8 w-8",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            {isImagesPage ? (
            <RButton
              radius="full"
              size="2"
              highContrast
              className="bg-white text-black hover:bg-white/90 border border-white/30"
            >
              {t("buttons.signIn")}
            </RButton>
            ) : (
              <Button
                size="sm"
                className="text-xs px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {t("buttons.signIn")}
              </Button>
            )}
          </SignInButton>
        </SignedOut>
      </div>
    );
  };

  // ======= CONTENT (общий) =======
  const content = (
    <div
      className={`min-h-screen flex flex-col relative ${
        isImagesPage ? "text-white" : "bg-[#FAFAF9] text-gray-900"
      }`}
    >
      {/* === BACKGROUND === */}
      {isImagesPage && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-40 left-1/2 h-[48rem] w-[70rem] -translate-x-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(140,75,255,0.70),transparent_55%),radial-gradient(circle_at_80%_15%,rgba(255,170,85,0.55),transparent_55%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* === CONTENT LAYER === */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* === HEADER === */}
        <nav
          ref={navRef}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? isImagesPage
                ? "bg-black/70 backdrop-blur-md border-b border-white/10"
                : "bg-white/95 backdrop-blur-md shadow-sm"
              : isImagesPage
                ? "bg-black/40 backdrop-blur-md border-b border-white/10"
                : "bg-[#FAFAF9]/95 backdrop-blur-md"
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-4 py-3 gap-2">
            {/* left/top */}
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Link
                to={buildLocalizedPath("/", lang)}
                className={`flex items-center gap-3 ${isImagesPage ? "text-white" : "text-gray-900"}`}
              >
                <img
                  src="/logo-80px.webp"
                  srcSet="/logo-160px.webp 2x"
                  alt="HomeDesign Pro — a professional real estate visualization service"
                  width="80"
                  height="80"
                  className="h-10 w-10 sm:h-16 sm:w-16 object-contain rounded-lg"
                />

                {/* ✅ /images — типографика Radix */}
                {isImagesPage ? (
                  <div className="flex flex-col leading-tight">
                    <Text as="span" size="4" weight="bold">
                      HomeDesign Pro
                    </Text>
                    <Text as="span" size="1" color="gray">
                      Pro staging in seconds
                    </Text>
                  </div>
                ) : (
                  <div className="flex flex-col leading-tight">
                    <span className="text-lg font-bold">HomeDesign Pro</span>
                    <span className="text-xs text-gray-500">Pro staging in seconds</span>
                  </div>
                )}
              </Link>

              {renderMobileRight()}
            </div>

            {/* nav */}
            <SignedIn>{renderNav(true)}</SignedIn>
            <SignedOut>{renderNav(false)}</SignedOut>

            {/* right desktop */}
            {renderDesktopRight()}
          </div>
        </nav>

        {/* === MAIN === */}
        <main
          className="flex-1 pb-24"
          style={{ paddingTop: "calc(var(--app-header-h, 9.5rem) + 12px)" }}
        >

          <Outlet />
        </main>

        {/* === TOASTER === */}
        <Toaster position="top-right" richColors closeButton />

        {/* === FOOTER === */}
        <footer
          className={`${isImagesPage ? "mt-0" : "mt-20"} border-t ${
            isImagesPage ? "border-white/10 bg-black text-white" : "border-gray-100 bg-white"
          }`}
        >
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

                  {isImagesPage ? (
                    <Text as="span" size="4" weight="bold">
                      HomeDesign Pro
                    </Text>
                  ) : (
                    <span className="text-lg font-bold">HomeDesign Pro</span>
                  )}
                </div>

                <p className={`max-w-sm text-sm ${isImagesPage ? "text-white/60" : "text-gray-600"}`}>
                  {t("layout.footer.description")}
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">{t("layout.footer.product")}</h3>
                <div className={`space-y-2 text-sm ${isImagesPage ? "text-white/60" : "text-gray-600"}`}>
                  <Link to={buildLocalizedPath("/transform", lang)} className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}>
                    {t("layout.footer.transform")}
                  </Link>
                  <Link to={buildLocalizedPath("/gallery", lang)} className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}>
                    {t("layout.footer.gallery")}
                  </Link>
                  <Link to={buildLocalizedPath("/images", lang)} className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}>
                    {t("layout.footer.images")}
                  </Link>
                  <Link to={buildLocalizedPath("/pricing", lang)} className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}>
                    {t("layout.footer.pricing")}
                  </Link>
                  <Link to={buildLocalizedPath("/api", lang)} className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}>
                    {t("layout.footer.api")}
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">{t("layout.footer.company")}</h3>
                <div className={`space-y-2 text-sm ${isImagesPage ? "text-white/60" : "text-gray-600"}`}>
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}
                  >
                    {t("layout.footer.contact")}
                  </a>
                  <Link to={buildLocalizedPath("/pricing", lang)} className={`block ${isImagesPage ? "hover:text-white" : "hover:text-gray-900"}`}>
                    {t("layout.footer.upgrade")}
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={`mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-8 text-sm ${
                isImagesPage ? "border-white/10 text-white/50" : "border-gray-100 text-gray-500"
              }`}
            >
              <span>{t("layout.footer.rights", { year: new Date().getFullYear() })}</span>
              <div className="flex gap-4">
                <a href="/privacy-policy.html" className={isImagesPage ? "hover:text-white" : "hover:text-gray-900"}>
                  {t("layout.footer.privacy")}
                </a>
                <a href="/terms-of-services.html" className={isImagesPage ? "hover:text-white" : "hover:text-gray-900"}>
                  {t("layout.footer.terms")}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );

  // ✅ ВАЖНО: Theme оборачивает Layout только на /images
  if (isImagesPage) {
    return (
      <Theme appearance="dark" accentColor="violet" grayColor="slate" radius="large" scaling="100%">
        {content}
      </Theme>
    );
  }

  return content;
}




