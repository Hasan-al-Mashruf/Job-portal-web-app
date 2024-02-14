import { useQuery } from "@tanstack/react-query";

const useFetchParamiterData = (endpoint: string, paramiter: string) => {
  paramiter;
  const {
    isPending: isPendingUserData,
    error,
    data: userData = {},
  } = useQuery({
    queryKey: [endpoint, paramiter],
    queryFn: () =>
      fetch(
        `https://job-portal-server-side-main.vercel.app/${endpoint}?email=${paramiter}`
      )
        .then((res) => res.json())
        .then((responseData) => {
          responseData;
          return responseData;
        }),
  });

  return [isPendingUserData, userData, error];
};

export default useFetchParamiterData;
