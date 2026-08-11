import { User } from "../types/user";

export async function getCurrentUser(): Promise<User | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem("mock_current_user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch (e) {
      console.error("Failed to parse mock user", e);
      return null;
    }
  }

  return null;
}
