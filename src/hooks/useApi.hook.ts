import { useCallback, useEffect, useState } from "react";

const useApi = (callback: () => Promise<any>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState();
  const [error, setError] = useState();

  const callbackMemorized = useCallback(() => {
    setIsLoading(true);
    setValue(undefined);
    setError(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [callback]);

  useEffect(() => {
    callbackMemorized();
  }, [callbackMemorized]);
};

export default useApi;
