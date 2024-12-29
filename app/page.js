"use client";

import { useState, useEffect } from "react";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  // Fetch categories and business lists
  useEffect(() => {
    fetchCategoryList();
    fetchBusinessList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const response = await GlobalApi.getCategory();
      console.log("Fetched Categories:", response); // Debugging
      setCategories(response); // Setting categories data
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchBusinessList = async () => {
    try {
      const response = await GlobalApi.getAllBusinessList();
      console.log("Fetched Business List:", response); // Debugging
      setBusinessList(response); // Setting business list data
    } catch (error) {
      console.error("Error fetching business list:", error);
      setBusinessList([]);
    }
  };

  return (
    <div>
      <Hero />
      <h2 className="text-xl font-bold my-4">Categories</h2>
      <CategoryList categories={categories} />
      <BusinessList businessList={businessList} title={'Popular Business'} />
    </div>
  );
}
