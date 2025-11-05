"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/use-translation";

export default function SobreSite() {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary-900 font-heading">{t('aboutSite')}</h1>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('siteAboutText')}
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('siteContentFree')}
      </p>
      <h2 className="text-xl font-bold mt-8 mb-2 text-brand-primary-900 font-heading">{t('contact')}</h2>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('contactLinkedinText')}
      </p>
      <a
        href="https://www.linkedin.com/in/edmozer-cavalcante/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2 rounded-full bg-brand-primary-700 text-white font-semibold shadow hover:bg-brand-primary-800 transition-all mb-8"
      >
        {t('contactCta')}
      </a>
    </div>
  );
}
