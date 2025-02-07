import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { navigator } from "../../utils";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  // AUTH CODE
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // LOG SESSION
  console.log(session?.user);

  const signUp = async () =>
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  supabase.auth.onAuthStateChange(async (e) => {
    if (e !== "SIGNED_OUT") {
      navigator("/auth/login");
    } else {
      navigator("/");
    }
  });

  if (!session) {
    return (
      <div className=" max-w-=[500px]">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "apple", "twitter"]}
        />
        {/* <button onClick={signUp}>Sign in with Google</button> */}
      </div>
    );
  } else {
    return (
      <div className=" max-w-=[500px]">
        <p>Wlcome {session?.user.email}</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
}
