import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ihthishamirshad.vercel.app"),
  title: { default: "M. Ihthisham Irshad | AI / Machine Learning Developer", template: "%s | M. Ihthisham Irshad" },
  description: "AI and Machine Learning developer building agentic systems, multimodal intelligence, and research-led data products.",
  keywords: ["AI developer", "machine learning developer", "agentic AI", "generative AI", "RAG", "multimodal AI", "Sri Lanka"],
  authors: [{ name: "M. Ihthisham Irshad" }],
  creator: "M. Ihthisham Irshad",
  openGraph: {
    title: "M. Ihthisham Irshad — AI / Machine Learning Developer",
    description: "Building intelligent systems across agentic AI, multimodal ML, and data intelligence.",
    type: "website",
    url: "/",
    images: [{ url: "/images/ihthisham-profile.png", width: 1200, height: 1200, alt: "M. Ihthisham Irshad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Ihthisham Irshad — AI / Machine Learning Developer",
    description: "Agentic AI, multimodal intelligence, and research-led data products.",
    images: ["/images/ihthisham-profile.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#080a09", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
