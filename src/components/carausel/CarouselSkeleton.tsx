export const MovieListSkeleton = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-20">
      <div className="text-center mb-8">
        <div className="h-8 w-48 mx-auto bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
          >
            <div className="w-full h-[400px] bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4 mx-auto animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
