import { tsRestQueryClient } from "../services/ts-rest-client";

// TS-REST QueryClient hooks (In a separate file to avoid clutter)

// Read
export const getExampleQueryClientHook = () => {
  const exampleId = "1";
  const {
    data,
    // error,
    // isLoading
  } = tsRestQueryClient.getExample.useQuery(
    [`exampleId-${exampleId}`],
    {
      params: { id: exampleId },
    },
    {
      networkMode: "offlineFirst",
      enabled: exampleId !== undefined,
      // onSettled: () => { console.log("settled"); },
      staleTime: 1000 * 60 * 30,
    }
  );

  return { data };
};

// Create
export const createExampleQueryClientHook = () => {
  const { mutate } = tsRestQueryClient.createExample.useMutation({
    onSuccess: (res) => {
      console.log("res", res);
    },
  });

  const createExampleQueryClient = async () => {
    mutate({
      body: {
        title: "title",
        description: "description",
        content: "content",
        published: true,
        tags: ["tag"],
      },
    });
  };

  return createExampleQueryClient;
};
