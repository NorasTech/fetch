# @norastech/fetch

[![npm version](https://badge.fury.io/js/%40norastech%2Ffetch.svg)](https://badge.fury.io/js/%40norastech%2Ffetch)

A lightweight and dependency-free `fetch` API abstraction layer, designed to be simpler 🤖, smaller 🎹, and faster 👽 than libraries like Axios. Perfect for making HTTP requests with minimal overhead.

## Features

- Zero dependencies
- TypeScript support
- Supports HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- Configurable base URL and headers
- Option to pass dynamic headers via functions

## Installation

```bash
npm install @norastech/fetch
```

## Usage

### Basic Example

You can use `buildFetcher` to easily create a reusable fetch client for making HTTP requests.

```ts
import buildFetcher from '@norastech/fetch'

// Initialize the fetcher with base URL and headers
const fetcher = buildFetcher({
  baseUrl: 'https://api.example.com',
  headers: {
    Authorization: 'Bearer my-token',
  },
})

// Make a GET request
fetcher
  .get('/users')
  .then((response) => console.log(response))
  .catch((error) => console.error('Error:', error))

// Make a POST request with body and params
fetcher
  .post('/users', {
    body: JSON.stringify({ name: 'John Doe' }),
    params: { status: 'active' },
  })
  .then((response) => console.log(response))
  .catch((error) => console.error('Error:', error))
```

### Dynamic Headers

You can pass headers as a function if you need dynamic headers (e.g., updated tokens):

```ts
const fetcher = buildFetcher({
  baseUrl: 'https://api.example.com',
  headers: () => ({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  }),
})
```

### API

#### `buildFetcher({ baseUrl, headers })`

Creates a fetch client with a configurable base URL and headers.

- `baseUrl`: The base URL for all requests (optional).
- `headers`: Static headers or a function that returns headers (optional).

#### Available Methods:

- `fetcher.get(path: string, options?: RequestInit & TRequestParams)`: Sends a GET request.
- `fetcher.post(path: string, options?: RequestInit & TRequestParams)`: Sends a POST request.
- `fetcher.put(path: string, options?: RequestInit & TRequestParams)`: Sends a PUT request.
- `fetcher.delete(path: string, options?: RequestInit & TRequestParams)`: Sends a DELETE request.

#### Request Options:

- `params`: An object representing query parameters to be appended to the URL.
- `headers`: Additional headers to be merged with the default headers.

### Example with Query Parameters

You can append query parameters using the `params` option:

```ts
fetcher.get('/users', {
  params: { role: 'admin' },
})
```

## TypeScript

The library is fully typed with TypeScript, and you can define the expected response type for your API calls:

```ts
interface User {
  id: string
  name: string
}

fetcher.get<User[]>('/users').then((users) => {
  users.forEach((user) => console.log(user.name))
})
```

## Contributing

Contributions are welcome! If you encounter bugs, feel free to [open an issue](https://github.com/NorasTech/fetch/issues) or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
