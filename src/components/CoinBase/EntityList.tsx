import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { images } from "../../constants/images";

type EntityListProps = {};

const EntityList = (props: EntityListProps) => {
  const mapped = Object.entries(images).map(([key, value]) => [key, value]);

  return (
    <View>
      {Array.from(mapped, ([k, v]) => (
        <View style={styles.wrapper} key={v}>
          <Image source={{ uri: v }} style={styles.image} />
          <Text style={styles.label}>{k}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "rgb(22, 24, 29)",
    borderBottomWidth: 0.5,
  },
  image: {
    height: 40,
    width: 40,
  },
  label: { fontSize: 18, fontWeight: "700", color: "#fff" },
});

export default EntityList;
