import { RouterProvider } from 'react-router'
import Routes from './Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PreFetchData from './componants/PreFetchData.jsx';

export default function App() {
  const queryClient = new QueryClient();
  const token=localStorage.getItem('token')
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />
         {token && <PreFetchData />}

       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}
