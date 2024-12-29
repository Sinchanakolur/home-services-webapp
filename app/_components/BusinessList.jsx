import React from 'react';
import Image from 'next/image'; // Import Next.js Image for optimization
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link from Next.js

function BusinessList({ businessList = [], title = "Business List" }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-[22px]">{title}</h2> {/* Fallback for title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {businessList.length > 0 ? (
          businessList.map((business) => (
            <Link
              href={'/detail/' + business.id}
              key={business?.id || Math.random()} // Corrected key usage
              className="shadow-md rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer
              hover:scale-105 transition-all ease-in-out"
            >
              <Image
                src={business?.images?.[0]?.url || '/placeholder.jpg'} // Fallback for missing image
                alt={business?.name || 'Business'}
                width={500}
                height={200}
                className="h-[150px] md:h-[200px] object-cover rounded-lg"
              />
              <div className="flex flex-col items-baseline p-3 gap-1">
                <h2 className="p-1 bg-blue-200 text-sky-900 rounded-full px-2 text-[12px]">
                  {business?.category?.name || 'Unknown Category'} {/* Fallback for missing category */}
                </h2>
                <h2 className="font-bold text-lg">
                  {business?.name || 'Unnamed Business'} {/* Fallback for missing name */}
                </h2>
                <h2 className="text-blue-900">
                  {business?.contactPerson || 'No Contact Person'} {/* Fallback for missing contact */}
                </h2>
                <h2 className="text-gray-500 text-sm">
                  {business?.address || 'No Address Provided'} {/* Fallback for missing address */}
                </h2>
                <Button className="rounded-full mt-3">Book Now</Button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No businesses found in this category.
          </p> /* Show message if `businessList` is empty */
        )}
      </div>
    </div>
  );
}

export default BusinessList;
