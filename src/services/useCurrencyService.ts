import { useApi } from "@/api/useApi";
import { CurrencyModel } from "@/models/CurrencyModel";

const api = useApi();

async function getCurrencies(): Promise<CurrencyModel> {
  const response = await api.get<CurrencyModel>(
    "latest?apikey=ps5LFDj9PKyTRqrpcnDgX4EYjMAeQKTPXr6Idr5w"
  );
  return response.data;
}

export function useCurrencyService() {
  return {
    getCurrencies,
  };
}
