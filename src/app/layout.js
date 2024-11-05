import "./globals.css";

export const metadata = {
  title: "Logging Notifications App",
  description: "Logging notifications real time privy app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
