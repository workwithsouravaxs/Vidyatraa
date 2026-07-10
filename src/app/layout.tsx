import type { Metadata } from "next";
import { Fredoka, Nunito, Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App as AntdApp } from "antd";
import { AuthProvider } from "@/context/AuthContext";
import AIAssistant from "@/components/AIAssistant";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vidyatraa | AI-Powered Scholarships & Class 10 Prep",
  description: "Vidyatraa is a unified student platform. Find, match, and apply for educational scholarships, plus ace your Class 10 board exams with Vidyatraa Prep mock tests and AI study helpers.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fdfdfd] text-[#0f172a]">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0B3C91",
                borderRadius: 12,
                fontFamily: "var(--font-nunito), var(--font-poppins)",
              },
              components: {
                Button: {
                  controlHeight: 40,
                  fontWeight: 600,
                },
              },
            }}
          >
            <AntdApp>
              <AuthProvider>
                <div className="flex flex-col min-h-screen">
                  {children}
                </div>
                <AIAssistant />
              </AuthProvider>
            </AntdApp>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
