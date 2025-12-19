import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES, detectLanguageFromPath, getPreferredLanguage } from "@/i18n";

export function cn(...inputs) {
  const classes = [];

  const process = (value) => {
    if (!value) {
      return;
    }

    if (typeof value === "string") {
      classes.push(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(process);
      return;
    }

    if (typeof value === "object") {
      Object.entries(value).forEach(([key, condition]) => {
        if (condition) {
          classes.push(key);
        }
      });
    }
  };

  inputs.forEach(process);
  return classes.join(" ");
}

const sanitizeSegment = (value = "") =>
  value
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .toLowerCase();

const normalizeLang = (lang) => {
  if (lang && SUPPORTED_LANGUAGES.includes(lang)) return lang;
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const fromPath = detectLanguageFromPath(pathname);
  if (fromPath) return fromPath;
  return getPreferredLanguage(pathname) || FALLBACK_LANGUAGE;
};

export const buildLocalizedPath = (path = "/", lang = undefined) => {
  const targetLang = normalizeLang(lang);
  const raw = String(path || "");

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const [pathPart, hash = ""] = raw.split("#");
  const [pathname, search = ""] = pathPart.split("?");
  const cleaned = pathname.replace(/^\/+/g, "").replace(/\/+/g, "/");

  const segments = cleaned
    .split("/")
    .filter(Boolean)
    .map((segment) => sanitizeSegment(segment))
    .filter(Boolean);

  if (segments[0] && SUPPORTED_LANGUAGES.includes(segments[0])) {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }

  const basePath = `/${segments.join("/")}` || `/${targetLang}`;
  const searchPart = search ? `?${search}` : "";
  const hashPart = hash ? `#${hash}` : "";

  return `${basePath}${searchPart}${hashPart}`;
};

export function createPageUrl(name = "", lang = undefined) {
  const raw = String(name || "").trim();
  if (!raw) {
    return buildLocalizedPath("/", lang);
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const cleaned = raw.replace(/^\/+/g, "").replace(/\/+/g, "/");
  const slug = cleaned
    .split("/")
    .filter(Boolean)
    .map((segment) => sanitizeSegment(segment))
    .filter(Boolean)
    .join("/");

  if (!slug) {
    return buildLocalizedPath("/", lang);
  }

  return buildLocalizedPath(`/${slug}`, lang);
}

export const replaceLanguageInPath = (pathname = "", lang = FALLBACK_LANGUAGE) => {
  const safePath = pathname || "/";
  return buildLocalizedPath(safePath, lang);
};
