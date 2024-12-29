"use client";

import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CategorySideBar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    if (pathname) {
      const selected = pathname.split("/")[2];
      setSelectedCategory(selected);
    }
  }, [pathname]);

  const fetchCategoryList = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      console.log("API Response:", resp);
      setCategories(resp);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <h2 className="font-bold mb-4 text-xl text-primary">Categories</h2>
      <div>
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center">Loading categories...</p>
        ) : (
          categories.map((category, index) => (
            <Link
              href={`/search/${category.name}`}
              key={index}
              className={`flex gap-4 items-center p-4 mb-3 border rounded-lg cursor-pointer 
                transition-all duration-300 ease-in-out 
                hover:bg-purple-100 hover:shadow-md
                ${
                  selectedCategory === category.name &&
                  "bg-purple-100 border-purple-500 text-purple-600 shadow-md"
                }`}
            >
              <Image
                src={category.icon?.url || "/placeholder.png"}
                alt={category.name || "icon"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="font-medium text-lg">{category.name || "Unnamed Category"}</h2>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default CategorySideBar;
