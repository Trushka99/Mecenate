import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedScreen from "./screens/FeedScreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FeedScreen />
    </QueryClientProvider>
  );
}
