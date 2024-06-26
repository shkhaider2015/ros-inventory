import Layout from "@/components/Layout";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";
import { ConfigProvider, App as AntApp } from "antd";
import theme from "@/theme/themeConfig";
import { RootStyleRegistry } from "@/components/RootStyleRegistry/RootStyleRegistry";

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
          <RootStyleRegistry>
            <ConfigProvider theme={theme}>
              <AntApp>
                <Layout>{children}</Layout>
              </AntApp>
            </ConfigProvider>
            <div id="modal-root"></div>
            <div id="carousel-root"></div>
          </RootStyleRegistry>
        </Providers>
      </body>
    </html>
  );
}
