import { useQueryClient } from '@tanstack/react-query';

function ClearCacheButton() {
  const queryClient = useQueryClient();

  function handleClearCache() {
    queryClient.removeQueries({ queryKey: ['dataRequest'] });
  }

  return <button onClick={handleClearCache}>Clear QueryCache</button>;
}

export default ClearCacheButton;
