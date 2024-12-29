import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function BookingHistoryList({ bookingHistory, type }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
      {bookingHistory.map((booking, index) => (
        <div key={index} className='border rounded-lg p-4 mb-5'>
          <div className='flex gap-4'>
            {booking?.businessList?.images?.[0]?.url && (
              <Image
                src={booking.businessList.images[0].url}
                alt='Business Image'
                width={120}
                height={120}
                className='rounded-lg object-cover'
              />
            )}
            <div className='flex flex-col gap-2'>
              <h2 className='font-bold'>{booking?.businessList?.name || 'N/A'}</h2>
              <h2 className='flex gap-2 text-primary'>
                <User /> {booking?.businessList?.contactPerson || 'N/A'}
              </h2>
              <h2 className='flex gap-2 text-gray-500'>
                <MapPin className='text-primary' /> {booking?.businessList?.address || 'N/A'}
              </h2>
              <h2 className='flex gap-2 text-gray-500'>
                <Calendar className='text-primary' /> Service on: <span className='text-black'>{booking?.date || 'N/A'}</span>
              </h2>
              <h2 className='flex gap-2 text-gray-500'>
                <Clock className='text-primary' /> Service Time: <span className='text-black'>{booking?.time || 'N/A'}</span>
              </h2>
            </div>
          </div>

          {/* Cancel Button */}
          <Button
            variant="outline"
            className="mt-5 w-full border-red-300"
            onClick={() => console.log(`Cancel booking with ID: ${booking.id}`)}
          >
            Cancel Appointment
          </Button>
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryList;
