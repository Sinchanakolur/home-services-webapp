import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Share, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

function BusinessInfotop({ business }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-gray-50 shadow-md rounded-lg max-w-5xl mx-auto text-gray-800">
      {business?.images?.[0]?.url ? (
        <Image
          src={business.images[0].url}
          alt={business.name || "Business Image"}
          width={160}
          height={160}
          className="rounded-full object-cover border border-gray-300"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border border-gray-300">
          No Image
        </div>
      )}
      <div className="flex flex-col gap-6 w-full md:w-auto">
        <h2 className="text-primary bg-blue-100 rounded-full text-lg font-semibold px-6 py-2">
          {business?.category?.name || "No category available"}
        </h2>
        <h2 className="text-4xl font-extrabold text-gray-900">{business.name}</h2>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="text-2xl text-gray-700" />
          <p className="text-lg">{business.address || "No address available"}</p>
        </div>
        <div className="flex items-center gap-3 text-gray-900">
          <Mail className="text-2xl text-gray-700" />
          <p className="text-lg">{business.email || "No email available"}</p>
        </div>
      </div>
      <div className="ml-auto flex flex-col justify-between items-end text-right w-full md:w-auto gap-6">
        <Button className="flex items-center gap-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-3 px-5">
          <Share className="text-white" />
          Share
        </Button>
        <div className="flex flex-col text-gray-800">
          <div className="flex items-center gap-3 text-lg">
            <User className="text-2xl text-gray-700" />
            <p className="whitespace-nowrap">{business.contactPerson || "No contact person available"}</p>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Clock className="text-2xl text-gray-700" />
            <p className="whitespace-nowrap">Available 9:00 AM to 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfotop;
