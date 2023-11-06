import { useEffect, useState } from "react";
import { trpcClient } from "../../services/trpc-client";

import "./app.css";
import { tsRestClient } from "../../services/ts-rest-client";
import {
  createExampleQueryClientHook,
  getExampleQueryClientHook,
} from "../../hooks/ts-rest-query-client-hook";

export function App() {
  const [greetingRest, setGreetingRest] = useState<any>();
  const [greetingTrpc, setGreetingTrpc] = useState<any>(null);
  const [greetingTsRestClient, setGreetingTsRestClient] = useState<any>(null);

  // REST
  useEffect(() => {
    fetch("http://localhost:3000/api/rest")
      .then((res) => res.json())
      .then((data) => setGreetingRest(data?.hello));
  }, []);

  // tRPC
  useEffect(() => {
    (async () => {
      const response = await trpcClient.hello.query({ name: `tRPC` });
      setGreetingTrpc(response.greeting);
    })();
  }, []);

  // TS-REST Client
  useEffect(() => {
    (async () => {
      // Read
      const userResponse = await tsRestClient.getExample({
        params: { id: "2" },
      });
      if (userResponse.status !== 200) return undefined;
      setGreetingTsRestClient(userResponse.body.title);
    })();
  }, []);

  const createExampleClient = async () => {
    const response = await tsRestClient.createExample({
      body: {
        title: "title",
        description: "description",
        content: "content",
        published: true,
        tags: ["tag"],
      },
    });
    const body = response.body;
    console.log(body);
  };

  // TS-REST QueryClient (Moved this into a hook in a separate file to avoid clutter here)
  const { data } = getExampleQueryClientHook();

  const createExampleQueryClient = createExampleQueryClientHook();

  return (
    <div>
      <h1>Test</h1>

      <h2>{greetingRest}</h2>
      <h2>{greetingTrpc}</h2>
      <h2>{greetingTsRestClient} (client)</h2>
      <h2>{data?.body.title} (queryClient)</h2>

      <div>
        <button onClick={createExampleClient}>
          TS-REST createExampleClient
        </button>
      </div>
      <div>
        <button onClick={createExampleQueryClient}>
          TS-REST createExampleQueryClient
        </button>
      </div>
    </div>
  );
}
