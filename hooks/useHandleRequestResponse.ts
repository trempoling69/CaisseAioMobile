import { useEffect } from 'react';
type Props<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  successCb?: () => void;
  errorCb?: () => void;
};
export const useHandleMutationResponse = <T>({
  isLoading,
  isSuccess,
  isError,
  successCb,
  errorCb,
}: Props<T>) => {
  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        if (successCb) {
          successCb();
        }
      }
      if (isError) {
        if (errorCb) {
          errorCb();
        }
      }
    }
  }, [isLoading, isError]);
};
