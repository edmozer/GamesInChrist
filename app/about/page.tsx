"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/use-translation";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary-900 font-heading">{t('aboutDevTitle')}</h1>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('aboutDevText1')}
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('aboutDevText2')}
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('aboutDevText3')}
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        {t('aboutDevText4')}
      </p>
      <div className="mt-8">
        <Link href="/" className="text-brand-primary-700 underline hover:text-brand-primary-900">{t('back')}</Link>
      </div>
    </div>
  );
}
