"use client";

import React from "react";
import CategorySideBar from "./_components/CategorySideBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full bg-blue-50 p-4 shadow-md lg:sticky lg:top-0 lg:h-screen overflow-auto hidden md:block">
        <CategorySideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 lg:p-10 shadow-md">
        <div className= "bg-white p-6 rounded-lg shadow-lg md:col-span-3">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
