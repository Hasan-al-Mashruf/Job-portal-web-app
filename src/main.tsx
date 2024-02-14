import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import JobPortalProvider from "./context/JobPortalProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <JobPortalProvider>
        <App />
      </JobPortalProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
