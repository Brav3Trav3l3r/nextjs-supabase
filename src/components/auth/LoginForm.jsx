"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginForm({ session }) {
  console.log(session);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("login");
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <button onClick={handleLogout} className="btn btn-sm hover:btn-error">
      logout
    </button>
  ) : (
    <div>
      <button className="btn btn-sm" onClick={() => my_modal_2.showModal()}>
        login
      </button>
      <dialog id="my_modal_2" className="modal ">
        <form method="dialog" className="modal-box">
          <div className="inputs flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {type === "login" ? (
            <>
              <div
                onClick={handleLogin}
                className="btn btn-primary w-full mt-4"
              >
                Login
              </div>
              <h1 className="py-2">
                Don't have an account?{" "}
                <span onClick={() => setType("signup")} className="text-info">
                  Sign up
                </span>
              </h1>
            </>
          ) : (
            <>
              <div
                onClick={handleSignUp}
                className="btn btn-primary w-full mt-4"
              >
                Sign Up
              </div>
              <h1 className="py-2">
                Already have an account?{" "}
                <span onClick={() => setType("login")} className="text-info">
                  Log in
                </span>
              </h1>
            </>
          )}
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
