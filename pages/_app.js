import AdminContext from "./../context/AdminContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminContext>
        <Component {...pageProps} />
      </AdminContext>
    </QueryClientProvider>
  );
}

export default MyApp;
