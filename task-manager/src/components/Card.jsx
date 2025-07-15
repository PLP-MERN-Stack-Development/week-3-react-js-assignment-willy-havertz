export default function Card({ title, body }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-600">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{body}</p>
    </div>
  );
}
