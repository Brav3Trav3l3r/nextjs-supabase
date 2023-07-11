"use client";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row-reverse md:h-full ">
      <div className="md:flex-1 h-28 md:h-screen relative z-0">
        <img
          className="w-3/4 mx-auto object-contain"
          src="https://cdn.pixabay.com/photo/2023/06/13/15/05/astronaut-8061095_1280.png"
          alt=""
        />
      </div>
      <div className="form-widget w-full p-8 md:flex-1 flex flex-col gap-4 bg-base-200 relative h-screen">
        <h1 className="text-xl font-semibold mx-auto p-4">Account setting</h1>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={session?.user.email}
            disabled
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="fullName" className="text-sm">
            Full Name
          </label>
          <input
            id="fullName"
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label htmlFor="website" className="text-sm">
            Website
          </label>
          <input
            id="website"
            className="input input-bordered w-full max-w-xs"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className="btn btn-primary block"
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
