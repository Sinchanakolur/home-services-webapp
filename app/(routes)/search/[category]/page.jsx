"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import BusinessList from "@/app/_components/BusinessList";

function BusinessByCategory({ params }) {
  const [businessList, setBusinessList] = useState([]);
  const [category, setCategory] = useState(params?.category || null);

  useEffect(() => {
    if (category) {
      getBusinessList(category);
    }
  }, [category]);

  const getBusinessList = async (category) => {
    try {
      const resp = await GlobalApi.getBusinessByCategory(category);
      console.log("Full API Response:", resp);

      if (resp?.length > 0) {
        console.log("Businesses found:", resp);
        setBusinessList(resp);
      } else {
        console.log("No businesses found for this category.");
        setBusinessList([]);
      }
    } catch (error) {
      console.error("Error fetching business by category:", error);
      setBusinessList([]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Business by Category: {category}</h1>
      <BusinessList title={category || "Loading..."} businessList={businessList} />
      {businessList.length > 0 ? (
        <div>
          {businessList.map((business) => (
            <div key={business.id} className="p-4 border-b">
              <h2 className="font-semibold text-lg">{business.name}</h2>
              <p>{business.description || "No description available."}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No businesses found in this category.</p>
      )}
    </div>
  );
}

export default BusinessByCategory;
