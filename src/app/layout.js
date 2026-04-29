import "./globals.css";

export const metadata = {
  title: "ASCEND AI",
  description: "Meet The Future You"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}