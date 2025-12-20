import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import ConfirmToast from "./components/core/ConfirmToast"
import { AxiosError } from "axios"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          if ([401, 403, 404].includes(status ?? 0)) {
            return false
          }
        }

        return failureCount < 3
      }
    },
  },
})


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmToast />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App