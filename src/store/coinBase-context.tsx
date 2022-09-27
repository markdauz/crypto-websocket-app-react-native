import {
  useState,
  useEffect,
  useRef,
  createContext,
  useCallback,
  ReactNode,
} from "react";

const Context = createContext<any>({});

const URL = "https://api.pro.coinbase.com";
const wsURL = "wss://ws-feed.pro.coinbase.com";

export function ContextProvider({ children }: { children: ReactNode }) {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [pair, setPair] = useState<string>("");
  const [, setPrice] = useState<string>("0.00");
  const [pairArr, setPairArray] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const webSocket = useRef(null);
  let first = useRef(false);

  const filterData = (data) => {
    return data.sort((a, b) => {
      if (a.base_currency < b.base_currency) {
        return -1;
      }
      if (a.base_currency > b.base_currency) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    webSocket.current = new WebSocket(wsURL);
    webSocket.current.onopen = () => console.log("Websocket opened");
    webSocket.current.onclose = () => console.log("Websocket closed");

    return () => {
      webSocket.current.close();
    };
  }, []);

  useEffect(() => {
    let pairs = [];

    const apiCall = async () => {
      await fetch(URL + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => {
        if (
          pair.quote_currency === "USD" ||
          pair.base_currency === "BTC" ||
          pair.base_currency === "ETH" ||
          pair.base_currency === "XRP" ||
          pair.base_currency === "BCH" ||
          pair.base_currency === "LTC" ||
          pair.base_currency === "DASH" ||
          pair.base_currency === "ADA" ||
          pair.base_currency === "XLM" ||
          pair.base_currency === "EOS"
        ) {
          return pair;
        }
      });

      filtered = filterData(filtered);

      setCurrencies(filtered);

      first.current = true;
    };
    apiCall();
    return () => {
      setCurrencies([]);
    };
  }, []);

  useEffect(() => {
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    let jsonMsg = JSON.stringify(msg);
    webSocket.current.send(jsonMsg);

    webSocket.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.message === "Failed to subscribe") {
        setError("Please try again later!");
      }

      if (data.type !== "ticker") {
        return;
      } else {
        setPairArray((prev) => [...prev, data]);
      }

      if (data.product_id === pair) {
        setPrice(data.price);
      }
    };
  }, [pair]);

  const handleEntityChange = (entity: any) => {
    setPair(entity[0]?.id);
  };

  const handleDelete = (id: string) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [id],
      channels: ["ticker"],
    };
    let unsub = JSON.stringify(unsubMsg);
    webSocket.current.send(unsub);
    setPairArray(() => pairArr.filter((item) => item.product_id !== id));
  };

  const result = Array.from(new Set(pairArr.map((s) => s.product_id))).map(
    (lab) => {
      return {
        product_id: lab,
        prices: pairArr
          .filter((s) => s.product_id === lab)
          .map((price) => price.price),
        time: pairArr
          .filter((s) => s.product_id === lab)
          .map((time) => time.time),
        open: pairArr
          .filter((s) => s.product_id === lab)
          .map((open) => open.open_24h),
      };
    }
  );

  const context = {
    error,
    currencies,
    result,
    handleEntityChange,
    handleDelete,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Context;
