import { NotebookPen } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from './BookingSection';


function SimilarBussiness({ business }) {
  return (
    <div>
      
      <BookingSection business={business}>
        <Button className="flex gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg shadow-md">
          <NotebookPen className="text-white" />
            Book Appointment
        </Button>
      </BookingSection>
    </div>
  );
}

export default SimilarBussiness;
