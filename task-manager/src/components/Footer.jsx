export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 p-4 text-center border-t dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} Task Manager. All rights reserved.
    </footer>
  );
}
