"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date()); // Current selected date
  const [timeSlot, setTimeSlot] = useState([]); // List of available time slots
  const [selectedTime, setSelectedTime] = useState(); // Selected time slot
  const [bookedSlot, setBookedSlot] = useState([]); // List of already booked slots
  const { data } = useSession(); // User session data

  // Fetch time slots on component mount
  useEffect(() => {
    generateTimeSlots();
  }, []);

  // Fetch booked slots whenever the date changes
  useEffect(() => {
    if (date) {
      fetchBookedSlots();
    }
  }, [date]);

  /**
   * Fetch the booked slots for the selected date
   */
  const fetchBookedSlots = async () => {
    try {
      const resp = await GlobalApi.BusinessBookedSlot(
        business.id,
        moment(date).format("YYYY-MM-DD")
      );
      console.log("Booked Slots Response:", resp); // Debug response
      setBookedSlot(resp.bookings || []); // Update booked slots
    } catch (error) {
      console.error("Error fetching booked slots:", error); // Log error
      toast.error("Failed to fetch booked slots. Please try again.");
    }
  };

  /**
   * Generate time slots for booking
   */
  const generateTimeSlots = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` });
      timeList.push({ time: `${i}:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: `${i}:00 PM` });
      timeList.push({ time: `${i}:30 PM` });
    }
    setTimeSlot(timeList);
  };

  /**
   * Save the booking for the selected date and time slot
   */
  const saveBooking = async () => {
    try {
      const resp = await GlobalApi.createNewBooking(
        business.id,
        moment(date).format("YYYY-MM-DD"),
        selectedTime,
        data.user.email,
        data.user.name
      );

      if (resp) {
        console.log("Booking Success Response:", resp); // Debug success response
        console.log("Booking Details:", {
          businessName: business.name,
          businessId: business.id,
          date: moment(date).format("YYYY-MM-DD"),
          time: selectedTime,
          userEmail: data.user.email,
          userName: data.user.name,
        });

        toast.success("Service booked successfully!"); // Success feedback
        setSelectedTime(""); // Clear selected time
        fetchBookedSlots(); // Refetch booked slots
      }
    } catch (error) {
      console.error("Error saving booking:", error); // Log error
      toast.error("Error while creating booking. Please try again.");
    }
  };

  /**
   * Check if a specific time slot is already booked
   */
  const isSlotBooked = (time) => {
    return bookedSlot.some((item) => item.time === time); // Check if time is booked
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select a date and time slot to book a service
              {/* Date Picker */}
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="mt-5 font-bold">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              {/* Time Slot Picker */}
              <h2 className="my-5 font-bold">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    disabled={isSlotBooked(item.time)}
                    variant="outline"
                    className={`border rounded-full 
                      p-2 px-3 hover:bg-primary
                      hover:text-white
                      ${selectedTime === item.time && "bg-primary text-white"}`}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive">Cancel</Button>
                <Button
                  disabled={!(selectedTime && date)} // Disable if no date or time is selected
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
