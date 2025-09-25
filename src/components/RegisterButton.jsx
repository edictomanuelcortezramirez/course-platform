"use client";
import React from "react";
import Link from "next/link";

const RegisterButton = () => {
  return (
    <Link href="/account/signup">
      <button className="bg-white text-gray-700 px-4 py-2 rounded-md shadow transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:translate-x-[-1px] hover:translate-y-[2px] hover:shadow-lg">
        Regístrate
      </button>
    </Link>
  );
};

export default RegisterButton;
