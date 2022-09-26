import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Chart from "../Chart";

type EntityListProps = {
  name: string;
  close: string[];
};

const EntityList = (props: EntityListProps) => {
  const { name, close } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{name}</Text>
      <Chart prices={close[0]} />
      <Text style={[styles.label, { color: "rgb(36, 105, 240)" }]}>
        {close[0]?.slice(-1)[0]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 0.5,
  },
  image: {
    height: 40,
    width: 40,
  },
  label: { fontSize: 18, fontWeight: "700" },
});

export default EntityList;
