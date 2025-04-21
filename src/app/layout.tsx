import "start/styles/globals.css";

import { type Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import { ConfigProvider } from 'antd';

import { TRPCReactProvider } from "start/trpc/react";
import { AuthProvider } from "./contexts/auth.context";
import RouteLoader from "./components/common/RouteLoader";

// Define custom theme colors
const THEME_COLORS = {
  primary: '#01311F', // Dark green
  secondary: '#C6AA58', // Gold/Tan
  background: '#F3F2ED', // Off-white
  accent: '#D6BD74', // Lighter gold for accents
  darkAccent: '#015F3B', // Darker green for hover states
};

export const metadata: Metadata = {
  title: "Roots IMS",
  description: "Inventory Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-raleway",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <body style={{ 
        backgroundColor: THEME_COLORS.background,
        margin: 0,
        padding: 0,
        fontFamily: 'var(--font-poppins)',
      }}>
        <TRPCReactProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: THEME_COLORS.primary,
                colorLink: THEME_COLORS.secondary,
                colorLinkHover: THEME_COLORS.darkAccent,
                colorBgBase: THEME_COLORS.background,
                fontFamily: 'var(--font-poppins)',
              },
              components: {
                Button: {
                  colorPrimary: THEME_COLORS.primary,
                  colorPrimaryHover: THEME_COLORS.darkAccent,
                  colorPrimaryActive: THEME_COLORS.darkAccent,
                  borderRadius: 6,
                },
                Card: {
                  colorBorderSecondary: THEME_COLORS.secondary,
                  borderRadiusLG: 12,
                },
                Input: {
                  borderRadius: 6,
                },
                Typography: {
                  fontWeightStrong: 600,
                },
              },
            }}
          >
            <AuthProvider>
              <RouteLoader />
              {children}
            </AuthProvider>
          </ConfigProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
