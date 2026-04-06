import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aero-Lift Antigravity Mouse",
  description: "O fim do atrito. A tecnologia de suspensÃ£o eletromagnÃ©tica chegou ao seu desktop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-[#050505]">{children}</body>
    </html>
  );
}
