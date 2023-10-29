import useAxios from "axios-hooks";

export function useSession() {
  const [{ data, error }] = useAxios({
    url: process.env.NEXT_PUBLIC_API + "/api/auth",
  });

  if (error || !data) return { loggedIn: false };

  const { email, role } = data.data;

  return { loggedIn: true, email, role };
}
