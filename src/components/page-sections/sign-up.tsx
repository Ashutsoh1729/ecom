"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      onClick={() => signIn("github", { redirectTo: "/" })}
      className="bg-white text-black font-medium border border-slate-400 hover:cursor-pointer"
    >
      Github SignIn
    </button>
  );
}
