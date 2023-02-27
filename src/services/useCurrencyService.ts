import { useApi } from "@/api/useApi";
import { CurrencyModel } from "@/models/CurrencyModel";

const api = useApi();

async function getCurrencies(): Promise<CurrencyModel> {
  const response = await api.get<CurrencyModel>(
    "latest?apikey=P9JZ5HLuUt0eiXMnRmaHrBkJsP0iEnTAPbqjAUaU"
  );
  return response.data;
}

export function useCurrencyService() {
  return {
    getCurrencies,
  };
}
