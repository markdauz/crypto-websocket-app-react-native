import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { images } from "../../constants/images";

type EntityListProps = {};

const EntityList = (props: EntityListProps) => {
  const mapped = Object.entries(images).map(([key, value]) => [key, value]);

  return (
    <View style={styles.container}>
      {Array.from(mapped, ([k, v]) => (
        <View key={v} style={styles.wrapper}>
          <Image source={{ uri: v }} style={styles.image} />
          <Text style={styles.label}>{k}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    padding: 15,
  },
  image: { height: 80, width: 80, marginBottom: 15 },
  label: { fontSize: 20, fontWeight: "500", color: "#fff" },
});

export default EntityList;
