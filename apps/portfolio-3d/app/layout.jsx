import "./globals.css";

export const metadata = {
  title: "Wing Yee AI Lab",
  description:
    "A premium personal AI lab website for Wing Yee Lee, Clinical AI Innovation Designer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
