import { User } from "../types/user";

export async function getCurrentUser(): Promise<User | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

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

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("mock_current_user");
    localStorage.removeItem("active_booking_draft");
    localStorage.removeItem("estimate_data");
    window.location.href = "/login";
  }
}

