"use client";
import React from "react";
import { StarGradientButton } from "./gradientBackground";



export function ButtonGradient({children}: {children: React.ReactNode}) {
  return (

      <StarGradientButton className="rounded-[22px] text-black max-w-sm p-4 sm:p-10 bg-white">
       <button> {children}  </button>
      </StarGradientButton>

  );
}
