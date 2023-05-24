import "./globals.css";

export const metadata = {
  title: "chào",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="loading">
        {children}
      </body>
    </html>
  );
}
