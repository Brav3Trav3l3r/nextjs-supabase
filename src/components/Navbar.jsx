import React from "react";
import Login from "./auth/Login";
import Avatar from "./Avatar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="border-b-2 border-base-content p-3 border-opacity-10 flex items-center h-16">
      <div className="auth w-fit flex items-center gap-3 ml-auto">
        {!session ? <Login /> : <Avatar />}
      </div>
    </nav>
  );
}
