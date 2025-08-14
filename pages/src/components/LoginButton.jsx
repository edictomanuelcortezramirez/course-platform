"use client";
import React from "react";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href="/PanelAdmin">
      <button className="px-4 py-2 border border-gray-500 text-gray-700 rounded shadow transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:translate-x-[-1px] hover:translate-y-[2px] hover:shadow-lg text-sm">
        Iniciar sesión
      </button>
    </Link>
  );
};

export default LoginButton;
