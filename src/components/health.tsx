import { client } from "@/api/client";
import { useEffect, useState } from "react";

export function Health() {
  const [{ isLoading, status }, setState] = useState<{
    status: string;
    isLoading: boolean;
  }>({
    status: "",
    isLoading: true,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetcher = async () => {
      try {
        setState({ status: "", isLoading: true });
        const res = await client.api.health.$get();
        const data = await res.json();
        setState({ status: data.status, isLoading: false });
      } catch (error) {
        setState({ status: "ERROR", isLoading: false });
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
        interval = setTimeout(fetcher, 1000);
      }
    };
    interval = setTimeout(fetcher, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div>
      {isLoading ? <h1>Loading...</h1> : <h1>Health Status: {status}</h1>}
    </div>
  );
}
