import { QueryClientProvider } from "@tanstack/react-query";
import { RootNavigator } from "./navigation/RootNavigator";
import {queryClient} from "@/lib/queryClient"
import { usePopularMovies } from "./features/home/hooks/usePopularMovies";
import { useEffect } from "react";

function TestComponent() {
  const { data, isLoading, error } = usePopularMovies();

  if (isLoading) console.log('Carregando filmes...');
  if (error) console.log('Erro:', error);
  if (data) console.log('Filmes recebidos:', data.results.length, data.results[0]?.title);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      <TestComponent />
    </QueryClientProvider>
  );
}

export default App;
