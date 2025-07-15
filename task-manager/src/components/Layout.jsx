import Navbar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow px-4 max-w-4xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
