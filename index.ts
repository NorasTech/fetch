export type TDefinedRecords<TTypes = any> = Record<
  keyof TTypes,
  TTypes[keyof TTypes]
>

export type IRequestParams<TParamTypes = any, TBodyTypes = any> = {
  params?: TDefinedRecords<TParamTypes>
  body?: RequestInit['body'] | TDefinedRecords<TBodyTypes>
}

export type TRequestMethods = 'get' | 'post' | 'put' | 'delete'

export default function buildFetcher<THeaders>({
  baseUrl,
  headers,
}: {
  baseUrl?: string
  headers?:
    | Headers
    | TDefinedRecords<THeaders>
    | (() => TDefinedRecords<THeaders>)
}) {
  return new Proxy(
    {} as {
      [key in TRequestMethods]: <T = any>(
        path: string,
        options?: RequestInit & IRequestParams
      ) => Promise<T>
    },
    {
      get:
        (_, method) =>
        async (path: string, options: RequestInit & IRequestParams = {}) => {
          const url = new URL(`${baseUrl}${path}`)
          if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
              url.searchParams.append(key, value)
            })
          }

          if (
            method === 'post' &&
            options.body &&
            typeof options.body === 'object'
          ) {
            options.body = JSON.stringify(options.body)
          }

          const response = await fetch(url, {
            headers: {
              ...(typeof headers === 'function' ? headers() : headers),
              ...options.headers,
            },
            ...options,
            method: method as string,
          })
          return response.json()
        },
    }
  )
}
