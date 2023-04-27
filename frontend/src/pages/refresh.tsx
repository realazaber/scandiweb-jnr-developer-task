import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Refresh() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return null;
}
