import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Context from "../../store/coinBase-context";
import { images } from "../../constants/images";
import Chart from "../Chart";

type EntityProps = {
  productId?: string;
  price?: string[] | number[];
  time?: Date[] | string[];
  open?: string[] | number[];
};

const Entity = (props: EntityProps) => {
  const { handleDelete } = useContext(Context);
  const { productId, price, time, open } = props;

  const percentChange =
    ((Number(price.slice(-1)[0]) - Number(open.slice(-1)[0])) /
      Number(open.slice(-1)[0])) *
    100;

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={() => handleDelete(productId)}
    >
      <View style={[styles.wrapper, { marginBottom: 8 }]}>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={{ uri: images[productId.split("-")[0]] }}
          />
          <Text
            style={[
              styles.text,
              { color: "rgb(243, 244, 246)", marginLeft: 8 },
            ]}
          >
            {productId.split("-").join("/")}
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            {
              color: "rgb(243, 244, 246)",
            },
          ]}
        >
          {`${price.slice(-1)[0]} USD`}
        </Text>
      </View>
      <View style={[styles.wrapper, { marginBottom: 8 }]}>
        <View style={styles.wrapper}>
          <Text
            style={[
              styles.subText,
              { color: percentChange < 0 ? "#f00" : "rgb(0, 156, 63)" },
            ]}
          >{`${percentChange.toFixed(2)}%`}</Text>
          <MaterialIcons
            name={percentChange < 0 ? "arrow-drop-down" : "arrow-drop-up"}
            color={percentChange < 0 ? "#f00" : "rgb(0, 156, 63)"}
            size={24}
          />
        </View>
        <Text style={[styles.subText, { opacity: 0.5 }]}>
          {new Date(time.slice(-1)[0]).toLocaleDateString()}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          padding: 20,
        }}
      >
        {price.length <= 1 ? (
          <ActivityIndicator size="small" color="rgb(0, 145, 234)" />
        ) : (
          <Chart prices={price} height={150} width={275} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "rgb(22, 24, 29)",
    marginBottom: 20,
    padding: 20,
  },
  image: {
    height: 35,
    width: 35,
  },
  pressed: { opacity: 0.5 },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { fontSize: 18, fontWeight: "700", color: "rgb(243, 244, 246)" },
  subText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgb(243, 244, 246)",
  },
});

export default Entity;
