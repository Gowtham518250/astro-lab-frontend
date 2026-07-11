export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">

      <div className="flex flex-col items-center gap-4">

        <div className="h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

        <p className="text-gray-500">
          Loading...
        </p>

      </div>

    </div>
  );
}