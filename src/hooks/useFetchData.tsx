import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  JobPortalContext,
  JobPortalContextType,
} from "../context/JobPortalProvider";

const API_BASE_URL = "https://job-portal-server-side-main.vercel.app/";

const useFetchData = (
  endpoint: string,
  startParamiter?: string,
  queryParamiter?: string
) => {
  const { count } = useContext(JobPortalContext) as JobPortalContextType;
  const fullUrl = queryParamiter
    ? `${API_BASE_URL}${endpoint}?${startParamiter}=${queryParamiter}`
    : `${API_BASE_URL}${endpoint}`;

  const {
    isPending,
    error,
    data = [],
  } = useQuery({
    queryKey: [endpoint, queryParamiter, count],
    queryFn: () =>
      fetch(fullUrl)
        .then((res) => res.json())
        .then((responseData) => {
          return responseData; // Return the data to be stored in the query cache
        }),
  });

  return [isPending, data, error];
};

export default useFetchData;
