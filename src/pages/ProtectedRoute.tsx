import { ReactNode, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        setSession(data.session);
      } else {
        navigate("/auth/login");
      }
    }
    getSession();
  }, []);

  return session ? children : null;
}
