import { useEffect, useState } from "react";
import { getAuth } from "../queries/get-auth";
import { usePathname } from "next/navigation";
import { User as AuthUser } from "lucia";

const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetching(false);
    };
    fetchUser();
  }, [pathname]);

  return { user, isFetching };
};

export { useAuth };
