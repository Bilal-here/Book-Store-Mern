import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import RecentlyAdded from '../components/Hero/RecentlyAdded';
import LoadingIndicator from '../Loader/LoadingIndicator'; // Assuming you have a LoadingIndicator component

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay with setTimeout
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000); 
    return () => clearTimeout(timer); // Clean up the timeout if component unmounts
  }, []);

  return (
    <div className='bg-zinc-50'>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <LoadingIndicator /> {/* Show your LoadingIndicator here */}
        </div>
      ) : (
        <>
          <Hero />
          <RecentlyAdded />
        </>
      )}
    </div>
  );
}

export default Home;
