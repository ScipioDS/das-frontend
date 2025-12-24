export interface Cryptocurrency {
  id: string;
  ticker: string;
  name: string;
  last_updated: Date;
  price: number;
}

export interface CryptocurrencyHelper {
  ticker: string;
  name: string;
  price: number;
}
