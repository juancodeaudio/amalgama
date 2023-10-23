import "./_styles/globals.css"
import { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { siteConfig } from "@/app/_config/site";
import { fontSans, fontMagilio, fontMigha } from "@/app/_config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/app/_components/navbar/navbar";
import clsx from "clsx";

import Footer from "./_components/footer";

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
    <ClerkProvider>
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
