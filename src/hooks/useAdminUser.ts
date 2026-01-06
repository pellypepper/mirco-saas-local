import { useEffect, useState } from "react";



export function useAdminUser (){

const [users, setUser] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/customer");

      if (!res.ok) {
        throw new Error("Failed to fetch customers");
      }

      const json = await res.json();

      setUser(Array.isArray(json.users) ? json.users : []);
    } catch (err: any) {
      console.error(err);
      setUser([]);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);






  return { users,error, loading };

}