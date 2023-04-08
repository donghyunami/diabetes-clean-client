import ReactDOM from "react-dom/client";
import AppLayout from "components/App";
import { Global, ThemeProvider } from "@emotion/react";
import { reset } from "styles/reset";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "libs/palette";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

root.render(
  <>
    <Global styles={reset} />

    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <AppLayout />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </>
);
