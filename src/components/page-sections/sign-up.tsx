"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div id="sign-in-container" className="flex flex-col gap-6 ">
      <button
        onClick={() => signIn("github", { redirectTo: "/" })}
        className="bg-white flex items-center text-black rounded-md px-[24px] gap-3 py-2 font-medium border border-slate-400 hover:cursor-pointer"
      >
        <Image
          src={"/github-mark/github-mark.png"}
          alt="github-img"
          width="28"
          height="28"
        />
        Github
      </button>
      <button
        className="bg-white flex items-center text-black rounded-md px-[24px] gap-3 py-2 font-medium border border-slate-400 hover:cursor-pointer"
        onClick={() => signIn("google", { redirectTo: "/" })}
      >
        Google
      </button>
    </div>
  );
}
