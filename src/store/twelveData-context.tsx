import { useState, useEffect, useRef, createContext, ReactNode } from "react";
import { data } from "../constants/data";

const Context = createContext<any>({});

const url = "https://api.twelvedata.com";
const API_KEY = "08bc5fa1e19f4e07ba06bbcca2269def";
const wsURL = `wss://ws.twelvedata.com/v1/quotes/price?apikey=${API_KEY}`;

export function ContextProvider({ children }: { children: ReactNode }) {
  const [entities, setEntities] = useState<any>();
  const [entity, setEntity] = useState("");
  const [price, setPrice] = useState("0.00");
  const [pairArr, setPairArray] = useState([]);
  const ws = useRef(null);

  // Portfolio Screen
  const fetchEntities = async () => {
    await fetch(
      `${url}/time_series?symbol=AAPL,BTC/USD,ETH/BTC&interval=1min&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setEntities(data));
  };
  useEffect(() => {
    // fetchEntities();
  }, [entities]);

  useEffect(() => {
    ws.current = new WebSocket(wsURL);
    let msg = {
      action: "subscribe",
      params: {
        symbols: entity,
      },
    };

    let jsonMsg = JSON.stringify(msg);
    ws.current.onopen = () => ws.current.send(jsonMsg);

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.event !== "price") {
        return;
      } else {
        setPairArray((prev) => [...prev, data]);
      }
      if (data.symbol === entity) setPrice(data.price);
    };
  }, [entity]);

  const handleEntityChange = (entity: any) => {
    setEntity(entity[0]?.entity);
  };

  const handleDelete = (id) => {
    setPairArray(() => pairArr.filter((item) => item.symbol !== id));
    let unsubMsg = {
      action: "unsubscribe",
      params: { symbols: id },
    };
    let unsub = JSON.stringify(unsubMsg);
    ws.current.send(unsub);
  };

  const mapEntities = (entities) => {
    const mapped =
      entities && Object.entries(entities).map(([key, value]) => [key, value]);
    const newDataMapped =
      mapped &&
      Array.from(mapped, ([k, v]: any) => ({
        entity: k,
        values: v.values,
      }));
    const finalMappedData =
      newDataMapped &&
      Array.from(
        new Set(newDataMapped && newDataMapped.map((s) => s.entity))
      ).map((lab) => {
        return {
          entity: lab,
          open:
            newDataMapped &&
            newDataMapped
              ?.filter((s) => s?.entity === lab)
              ?.map((price) => price?.values?.map((el) => el?.open)),
          close:
            newDataMapped &&
            newDataMapped
              .filter((s) => s?.entity === lab)
              .map((price) =>
                price?.values?.map((el) => parseFloat(el?.close).toFixed(2))
              ),
          high:
            newDataMapped &&
            newDataMapped
              .filter((s) => s?.entity === lab)
              .map((price) => price?.values?.map((el) => el?.high)),
          low:
            newDataMapped &&
            newDataMapped
              .filter((s) => s?.entity === lab)
              .map((price) => price?.values?.map((el) => el?.low)),
          datetime:
            newDataMapped &&
            newDataMapped
              .filter((s) => s?.entity === lab)
              .map((price) => price?.values?.map((el) => el?.datetime)),
        };
      });
    return finalMappedData;
  };

  const result = Array.from(new Set(pairArr.map((s) => s.symbol))).map(
    (lab) => {
      return {
        symbol: lab,
        ask: pairArr.filter((s) => s.symbol === lab).map((el) => el.ask),
        bid: pairArr.filter((s) => s.symbol === lab).map((el) => el.bid),
        dayVolume: pairArr
          .filter((s) => s.symbol === lab)
          .map((el) => el.day_volume),
        price: pairArr.filter((s) => s.symbol === lab).map((el) => el.price),
        timestamp: pairArr
          .filter((s) => s.symbol === lab)
          .map((el) => el.timestamp),
      };
    }
  );

  const context = {
    result,
    selectedEntities: pairArr,
    entity,
    entities: mapEntities(data),
    handleEntityChange,
    handleDelete,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default Context;
