import Layout from "@/components/Layout";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // style: [ 'normal' ]
});

export const metadata = {
  title: "RunofShow Inventory",
  description: "RunofShow Inventory System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <div id="modal-root"></div>
        <div id="carousel-root"></div>
      </body>
    </html>
  );
}
