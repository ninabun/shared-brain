import "./globals.css";

export const metadata = {
  title: "Wing Yee AI Lab",
  description: "Website redevelopment workspace.",
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
