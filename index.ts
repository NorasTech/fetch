export type TRequestParams = {
  params?: Record<string, string>;
};

export type TRequestMethods = "get" | "post" | "put" | "delete";

export default function buildFetcher({
  baseUrl,
  headers,
}: {
  baseUrl?: string;
  headers?: Record<string, string> | (() => Record<string, string>);
}) {
  return new Proxy(
    {} as {
      [key in TRequestMethods]: <T = any>(
        path: string,
        options?: RequestInit & TRequestParams
      ) => Promise<T>;
    },
    {
      get:
        (_, method) =>
        async (path: string, options: RequestInit & TRequestParams = {}) => {
          const url = new URL(`${baseUrl}${path}`);
          if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
              url.searchParams.append(key, value);
            });
          }

          const response = await fetch(url, {
            headers: {
              ...(typeof headers === "function" ? headers() : headers),
              ...options.headers,
            },
            ...options,
            method: method as string,
          });
          return response.json();
        },
    }
  );
}
