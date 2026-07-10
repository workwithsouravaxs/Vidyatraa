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
  metadataBase: new URL("https://vidyatraa.vercel.app"),
  title: {
    default: "Vidyatraa | AI-Powered Scholarships & Class 10 Board Prep",
    template: "%s | Vidyatraa"
  },
  description: "Vidyatraa is India's unified student success ecosystem. Match with verified scholarships, prepare for Class 10 boards with diagnostic mock tests & formula cheat sheets, and earn pocket stipends through student micro-internships.",
  keywords: [
    "Vidyatraa",
    "Vidyatraa Prep",
    "Scholarships for Indian students",
    "Class 10 board exam prep",
    "CBSE Class 10 Mock Tests",
    "SSC mock tests",
    "State board formula sheets",
    "EWS student scholarships",
    "AI scholarship matcher",
    "Student micro-internships",
    "School student gigs",
    "Class 10 revision notes",
    "Educational financial aid India",
    "Pre-matric scholarships",
    "Post-matric scholarships",
    "Indian education grants"
  ],
  authors: [{ name: "Vidyatraa Team" }],
  creator: "Vidyatraa Team",
  publisher: "Vidyatraa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vidyatraa.vercel.app",
    title: "Vidyatraa | AI-Powered Scholarships & Class 10 Board Prep",
    description: "Match with verified scholarships, prepare for Class 10 boards with diagnostic mock tests, and earn pocket stipends through student micro-internships.",
    siteName: "Vidyatraa",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Vidyatraa Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyatraa | AI-Powered Scholarships & Class 10 Board Prep",
    description: "Unified student ecosystem for board exam preparation, verified scholarships matching, and student work opportunities.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://vidyatraa.vercel.app",
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
