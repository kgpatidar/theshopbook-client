import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

const refechQuery = (queryKey) => queryClient.refetchQueries([queryKey]);

export { queryClient, refechQuery };
