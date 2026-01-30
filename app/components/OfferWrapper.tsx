"use client";

import dynamic from "next/dynamic";

const Skiper16 = dynamic(() => import("./Offer").then((mod) => ({ default: mod.Skiper16 })), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="text-center py-20">Ładowanie...</div>
    </div>
  ),
});

export default Skiper16;
