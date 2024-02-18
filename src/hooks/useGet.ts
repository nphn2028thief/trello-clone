import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

const useGet = <T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T, QueryKey, never>,
  enabled?: boolean,
  refetchOnMount?: boolean
) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey,
    queryFn,
    enabled,
    retry: 0,
    refetchOnMount: refetchOnMount || false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isFetching, isError };
};

export default useGet;
