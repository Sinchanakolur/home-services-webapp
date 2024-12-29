"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_component/BookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";

function MyBooking() {
  const { data } = useSession(); // Access session data
  const [bookingHistory, setBookingHistory] = useState([]); // State to store booking history

  // Fetch booking history whenever session data changes
  useEffect(() => {
    if (data) {
      GetUserBookingHistory();
    }
  }, [data]);

  /**
   * Fetch user's booking history
   */
  const GetUserBookingHistory = async () => {
    try {
      const resp = await GlobalApi.GetUserBookingHistory(data.user.email); // API call
      console.log("Booking History Response:", resp); // Debugging: Log the entire response
      if (resp && resp.bookings) {
        setBookingHistory(resp.bookings); // Update state with bookings
      } else {
        console.warn("No bookings found in response:", resp);
        setBookingHistory([]); // Clear state if no bookings are found
      }
    } catch (error) {
      console.error("Error fetching booking history:", error); // Error logging
    }
  };

  const filterData=(type)=>{
        const result=bookingHistory.filter(item=>
                type=='booked'?
                new Date(item.date)>new Date()
                :new Date(item.date)<new Date());
                return result;


        
  }

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          {/* Pass bookingHistory to the BookingHistoryList component */}
          <BookingHistoryList bookingHistory={filterData('booked')} />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList bookingHistory={filterData('completed')}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
