export type PairType = {
  best_ask: string;
  best_bid: string;
  high_24h: string;
  last_size: string;
  low_24h: string;
  open_24h: string;
  price: string;
  product_id: string;
  sequence: number;
  side: string;
  time: string | Date;
  trade_id: number;
  type: string;
  volume_24h: string;
  volume_30d: string;
};

export type CurrencyType = {
  auction_mode: boolean;
  base_currency: string;
  base_increment: string;
  cancel_only: boolean;
  display_name: string;
  fx_stablecoin: boolean;
  id: string;
  limit_only: boolean;
  margin_enabled: boolean;
  max_slippage_percentage: string;
  min_market_funds: string;
  post_only: boolean;
  quote_currency: string;
  quote_increment: string;
  status: string;
  status_message: string;
  trading_disabled: boolean;
};

export type ContextType = {
  error: string;
  currencies: CurrencyType[];
  result: {
    product_id: string;
    prices: string[];
    time: (string | Date)[];
    open: string[];
  }[];
  handleEntityChange: (value: CurrencyType[]) => void;
  handleDelete: (value: string) => void;
};
