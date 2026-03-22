import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
} from "../../shared/config/i18n/locale-config";

/**
 * Validates :lang, syncs i18next with the URL, and renders nested routes.
 */
export function LocaleLayout() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (isSupportedLocale(lang)) {
      void i18n.changeLanguage(lang);
      return;
    }
    // e.g. /login → /fr/login (first segment is not fr|en|ru)
    navigate(`/${DEFAULT_LOCALE}${location.pathname}${location.search}`, { replace: true });
  }, [lang, location.pathname, location.search, navigate, i18n]);

  if (!isSupportedLocale(lang)) {
    return null;
  }

  return <Outlet />;
}
