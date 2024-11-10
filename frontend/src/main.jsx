import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* wrapping app with query client */}
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
  </StrictMode>,
)
