import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import MainNave from "@/src/app/[locale]/components/MainNave";
import MainFooter from "@/src/app/[locale]/components/ProductsComponents/MainFooter";
import "../styles/globals.css";
import ProvidersWrapper from "@/src/app/[locale]/components/ProvidersWrapper";
import { Toaster } from "react-hot-toast";

import { Cairo } from "next/font/google"; // استخدم خط Cairo

// تعريف الخط Cairo كـ CSS variable
const cairo = Cairo({
  subsets: ["arabic", "latin"], // لتغطية العربية والإنجليزية
  weight: ["400", "500", "700"], // الأوزان اللي تحتاجها
  variable: "--font-cairo",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/src/messages/${locale}.json`)).default;
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className={cairo.variable}>
      <body className="font-sans"> {/* نستفيد من Tailwind font-sans */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProvidersWrapper>
            <MainNave  />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
            <MainFooter />
          </ProvidersWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
