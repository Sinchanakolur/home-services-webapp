import Link from "next/link";

const CategoryList = ({ categories = [] }) => {
  return (
    <div className="mx-4 md:mx-2 lg:mx-52 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Link href={'/search/'+category.name}
            key={category.id}
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-100"
            style={{ backgroundColor: category.bgcolor?.hex || "#f0f0f0" }} // Fallback for bgcolor
          >
            <img
              src={category.icon?.url || "/placeholder.png"} // Fallback for icon URL
              alt={category.name || "Category"}
              className="w-16 h-16 object-contain mb-2 transition-transform duration-300 transform hover:scale-110"
            />
            <p className="text-center text-sm font-medium text-gray-700">
              {category.name || "Unnamed Category"} {/* Fallback for category name */}
            </p>
          </Link>
        ))
      ) : (
        // Skeleton loader when there are no categories
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg">
            {/* Skeleton content can go here if necessary */}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
