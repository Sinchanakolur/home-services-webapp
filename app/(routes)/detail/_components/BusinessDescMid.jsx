import React from 'react';
import Image from 'next/image'; // Import Next.js Image for optimization

function BusinessDescMid({ business }) {
  return (
    business?.name && (
      <div>
        <h2 className="font-bold text-[25px] mt-10">Description</h2>
        <p className="mt-4 text-lg text-gray-600">{business.about}</p>

        <h2 className="font-bold text-[25px] mt-10">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {business?.images?.map((item, index) => (
            <Image
              src={item?.url || '/placeholder.jpg'} // Fallback image if URL is missing
              key={index}
              alt={`Gallery image ${index + 1}`}
              width={700}
              height={200}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    )
  );
}

export default BusinessDescMid;
