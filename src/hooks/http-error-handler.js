import { useState, useEffect } from "react";

const HttpErrorHandlerHook = (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const respInterceptor = httpClient.interceptors.response.use(
    (resp) => resp,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(respInterceptor);
    };
  }, [
    reqInterceptor,
    respInterceptor,
    httpClient.interceptors.request,
    httpClient.interceptors.response,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

export default HttpErrorHandlerHook;
