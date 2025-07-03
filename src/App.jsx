import { RouterProvider } from 'react-router'
import Routes from './Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />

       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}
