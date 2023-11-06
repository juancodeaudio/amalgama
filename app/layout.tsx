import clsx from "clsx";
import { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { esES } from "@clerk/localizations";

import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer";

import "@/styles/globals.css"
import { siteConfig } from "@/config/site";
import { fontSans, fontMagilio, fontMigha } from "@/config/fonts";
import { Providers } from "./providers";


export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <ClerkProvider localization={esES} appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={clsx(
            "font-sans antialiased",
            fontSans.variable,
            fontMagilio.variable,
            fontMigha.variable,
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
	);
}
