import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6">

      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="text-gray-500">
        Page Not Found
      </p>

      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Back Home
      </Link>

    </div>
  );
}