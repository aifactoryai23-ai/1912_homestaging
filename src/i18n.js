import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ✅ путь указывает на /src/locales/
const translationModules = import.meta.glob("./locales/*/*.json", {
  eager: true,
  import: "default",
});

const resources = Object.entries(translationModules).reduce((acc, [path, module]) => {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) return acc;
  const [, lng, ns] = match;
  acc[lng] = acc[lng] || {};
  acc[lng][ns] = module;
  return acc;
}, {});

const supportedLanguages = Object.keys(resources);
const namespaces = Array.from(
  new Set(Object.values(resources).flatMap((lngNamespaces) => Object.keys(lngNamespaces)))
);

export const FALLBACK_LANGUAGE = "en";

export const detectLanguageFromPath = (pathname = "") => {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return null;
  const candidate = segments[0].toLowerCase();
  return supportedLanguages.includes(candidate) ? candidate : null;
};

const getLanguageFromStorage = () => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem("lang");
  if (stored && supportedLanguages.includes(stored)) {
    return stored;
  }
  return null;
};

export const getPreferredLanguage = (pathname = "") => {
  const pathLanguage = detectLanguageFromPath(pathname);
  if (pathLanguage) return pathLanguage;

  const stored = getLanguageFromStorage();
  if (stored) return stored;

  if (typeof window !== "undefined") {
    const browserLanguage = navigator.language?.toLowerCase() || "";

    if (browserLanguage.startsWith("ru")) return "ru";
    if (browserLanguage.startsWith("es")) return "es";
    if (browserLanguage.startsWith("zh") || browserLanguage.startsWith("cn")) return "cn";
    if (browserLanguage.startsWith("ja")) return "ja";
    if (browserLanguage.startsWith("ko")) return "ko";
  }

  return FALLBACK_LANGUAGE;
};

const initialLanguage = getPreferredLanguage(
  typeof window !== "undefined" ? window.location.pathname : ""
);

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: FALLBACK_LANGUAGE,
  supportedLngs: supportedLanguages,
  ns: namespaces,
  defaultNS: "common",
  returnObjects: true,
  interpolation: { escapeValue: false },
});

if (import.meta.env.DEV) {
  console.log("🌍 Loaded i18n resources:", resources);
  console.log("✅ Supported languages:", supportedLanguages);
  console.log("📦 Namespaces detected:", namespaces);
  console.log("🌐 Default language:", initialLanguage);
}

i18n.on("languageChanged", (lng) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("lang", lng);
  if (import.meta.env.DEV) {
    console.log(`🌀 Language changed to: ${lng}`);
  }
});

export const SUPPORTED_LANGUAGES = supportedLanguages;
export default i18n;
