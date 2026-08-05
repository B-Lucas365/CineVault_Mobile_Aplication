import { QueryClientProvider } from "@tanstack/react-query";
import { RootNavigator } from "./navigation/RootNavigator";
import {queryClient} from "@/lib/queryClient"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}

export default App;
