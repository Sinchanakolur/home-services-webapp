'use client';

import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import BusinessInfo from '../_components/BusinessInfotop';
import BusinessInfotop from '../_components/BusinessInfotop';
import SimilarBussiness from '../_components/SimilarBussiness';
import BusinessDescMid from '../_components/BusinessDescMid';

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState(null); // Initialize state for business details

  useEffect(() => {
    if (params && params.businessId) {
      fetchBusinessById();
    }
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, [status]);

  const fetchBusinessById = async () => {
    try {
      const response = await GlobalApi.getBusinessById(params.businessId);
      setBusiness(response[0]); // Assuming response is an array, set the first object
      console.log("Business Data:", response); // Log to inspect
    } catch (error) {
      console.error("Error fetching business details:", error);
    }
  };

  const checkUserAuth = () => {
    if (status === 'loading') {
      console.log("Authentication Status: Loading...");
    }

    if (status === 'unauthenticated') {
      console.log("Authentication Status: Unauthenticated. Redirecting to sign in...");
      signIn('descope');
    }

    if (status === 'authenticated') {
      console.log("Authentication Status: Authenticated.");
    }
  };

  return (
    status === 'authenticated' && business && (
      <div className='py-8 md:py-20 px-10 md:px-36'>
        {/* Pass business details to the BusinessInfo component */}
        <BusinessInfotop business={business} />
        <div className='grid grid-cols-3 mt-8'>
          <div className='col-span-4 md:col-span-2 order-last md:order-first'>
          <BusinessDescMid business={business}/>
          </div>
          <div className='hidden md:block'>
          <SimilarBussiness business={business}/>
          </div>
        </div>

        <div className='grid grid-cols-3 mt-16'>
          {/* Additional components or content can go here */}
        </div>
      </div>
    )
  );
}

export default BusinessDetail;
