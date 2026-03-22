import { useCallback } from "react";
import { useParams } from "react-router";
import { DEFAULT_LOCALE, isSupportedLocale, type AppLocale } from "../config/i18n/locale-config";

/**
 * Builds paths with the current locale prefix: /:lang/...
 * @param path - absolute-style path e.g. "/", "/admin/dashboard", "event/123"
 */
export function useLocalizedPath() {
  const { lang } = useParams<{ lang?: string }>();
  const safeLang: AppLocale = isSupportedLocale(lang) ? lang : DEFAULT_LOCALE;

  return useCallback(
    (path: string) => {
      const trimmed = path.trim();
      const withoutLeading = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
      return `/${safeLang}${withoutLeading ? `/${withoutLeading}` : ""}`;
    },
    [safeLang]
  );
}
