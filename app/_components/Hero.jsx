import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

function Hero() {
  return (
    <div className="flex items-center flex-col justify-center pt-14 pb-10">
      <h2 className="font-bold text-[46px] text-center leading-tight">
        Find Home 
        <span className="text-primary"> Service/Repair</span>
        <br />
        Near You
      </h2>
      <h2 className="text-lg text-gray-500 mt-2">
        Explore the Best Home Services
      </h2>
      <div className="mt-6 flex gap-4 items-center">
        <Input 
          placeholder="Search" 
          className="rounded-full md:w-[300px] shadow-sm"
        />
        <Button className="rounded-full h-[40px]">
            <Search className='w-4 h-4'></Search>
        </Button>
      </div>
    </div>
  );
}

export default Hero;



//eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzI2ODg5MzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtM2s1Mjg4bTAydGYwN3V4dDdubTNkOGQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJhZDM5NTRkZS1kYTUwLTRmNjUtOGY3NC1lYzk1NzAzMjAyMDYiLCJqdGkiOiJjbTN6aTk4azQwNHhiMDdwZTNxejQxcXN5In0.sXKj0NvXd9uPr2ttEfdQNESark-Tkq_q93nDA_mclC5C_PWSY9DRvffPg2GT5OtfM8z5vGh0hIsJjp6JxU9IfgRIW1sHBkHCVnTHLyXVhn37mw1yHXeHo6FXG97InkR00XpnNEdbvTA70_PVgeBV3NtM0fV9fq5lTftB58trHSoPhtzKVVt64kGpU6vs4f4CDc5PDp2O-Um1TGTl6Rb76Uy-91PYs2BnlwpXjgpStJJNiVt0cSVRaK-DE-OlTqrc8qHevthw4eb_244iKGY_slqivcZX6DxZbj-p0j5hObJ1PW1GJ7eQTjIDl7q0djVcMxiGUs_BmzKSOLTGFbWibzy0s0fAWjvXDMKFNEOO7thWCB6I1M4vwtEmE3guEBy50Ff1AKAGEx0WHl8M8_45QQg0Q0CqipzW1pNAk8xIm_DIHehTEkSaKRCRRcoA3KxUIzQErst56mHxmFXyIxg-eCpRByZMof8YEkdr3_3vxp59ygbZxQ1uRFGWTvlwuyPXB990ASRKWR-DqH34jwjlQRJagw-7ZQe3LDBBWzKcbEUaXKAETIVVly45rAHMKoBcx_hYgmolDp2tUwQteAaCmTX8QgT3xfaeARkN8soRgOJLer9QYvwymfQW8rT9jZ6CpYW2fnVJ_9WX4Wx0YQpbSvl1tqxot1U0h0X7Xy3l-f4