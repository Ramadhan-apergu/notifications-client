import "./globals.css";

export const metadata = {
  title: "Logging Notifications App",
  description: "Logging notifications real time privy app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Warning message for small screens */}
        <div className="lg:hidden fixed inset-0 bg-privy-dark-800 bg-opacity-75 flex items-center justify-center text-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-privy-red-600 mb-4">Desktop Only</h2>
            <p className="text-privy-dark-700">
              This application is only available on desktop devices. Please switch to a larger screen to use the app.
            </p>
          </div>
        </div>

        {/* Main application content for larger screens */}
        <div className="hidden lg:block">
          {children}
        </div>
      </body>
    </html>
  );
}
