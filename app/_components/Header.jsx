"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from 'next/link';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { data, status } = useSession();

  useEffect(() => {
    console.log("Session Data:", data);
  }, [data]);

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-8">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <div className="flex items-center gap-6">
          <h2 className="hover:scale-100 hover:text-primary cursor-pointer">
            Home
          </h2>
          <h2 className="hover:scale-100 hover:text-primary cursor-pointer">
            Service
          </h2>
          <h2 className="hover:scale-100 hover:text-primary cursor-pointer">
            About Us
          </h2>
        </div>
      </div>

      {/* User Authentication */}
      <div className="ml-auto">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.user?.image || "/default-avatar.png"} // Fallback for missing image
                alt="user"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/mybooking'}>My Bookings</Link>
                </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope")}>Login / SignUp</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
