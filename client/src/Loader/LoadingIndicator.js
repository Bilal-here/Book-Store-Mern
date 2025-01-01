import React from 'react';
import { Slab } from "react-loading-indicators";

function LoadingIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Slab color="#4f46e5" size="large" text="Loading..." textColor="" />
    </div>
  );
}

export default LoadingIndicator;
