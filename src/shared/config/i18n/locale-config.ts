export const SUPPORTED_LOCALES = ["fr", "en", "ru"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "fr";

export function isSupportedLocale(value: string | undefined): value is AppLocale {
  return value !== undefined && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** pathname e.g. /fr/admin -> /admin */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  const [first, ...rest] = parts;
  if (isSupportedLocale(first)) {
    return rest.length ? `/${rest.join("/")}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
