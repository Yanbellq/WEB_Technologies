import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Lottery App - Lab 7",
    description: "Next.js Lottery Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
            <body className="antialiased">{children}</body>
        </html>
    );
}
