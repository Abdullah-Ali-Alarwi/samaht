import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import MainNave from '@/src/app/[locale]/components/MainNave';
import MainFooter from '@/src/app/[locale]/components/ProductsComponents/MainFooter';
import '../styles/globals.css';
import ProvidersWrapper from '@/src/app/[locale]/components/ProvidersWrapper';
import { Toaster } from "react-hot-toast";

import { Noto_Kufi_Arabic } from "next/font/google";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"], // مهم لأنه خط عربي
  weight: ["400", "500", "600", "700"], // الأوزان اللي تحتاجها
  variable: "--font-notoKufi", // نعرفه كـ CSS variable
});
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/src/messages/${locale}.json`)).default;
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction } className={notoKufi.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProvidersWrapper>
            <MainNave />
            {children}
              <Toaster position="top-right" reverseOrder={false} />
            <MainFooter />
          </ProvidersWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
