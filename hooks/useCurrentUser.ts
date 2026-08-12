import { useState, useEffect } from "react";
import { User } from "../types/user";
import { getCurrentUser } from "../services/auth.service";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        if (mounted) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching user", error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}
