import "./globals.css";

export const metadata = {
  title: "Dat Nguyen — Photo Album",
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
