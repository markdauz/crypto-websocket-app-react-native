import { useState, useEffect, useRef, createContext, ReactNode } from "react";

const Context = createContext<any>({});

const URL = "https://api.pro.coinbase.com";
const wsURL = "wss://ws-feed.pro.coinbase.com";

export function ContextProvider({ children }: { children: ReactNode }) {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState("");
  const [, setPrice] = useState("0.00");
  const [pairArr, setPairArray] = useState([]);

  const webSocket = useRef(null);
  let first = useRef(false);

  useEffect(() => {
    webSocket.current = new WebSocket(wsURL);

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

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      setCurrencies(filtered);

      first.current = true;
    };

    apiCall();
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
      console.log(data);
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

  const handleDelete = (id) => {
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
    currencies,
    result,
    handleEntityChange,
    handleDelete,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Context;
