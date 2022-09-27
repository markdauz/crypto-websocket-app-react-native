import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { images } from "../../constants/images";

type EntityListProps = {};

const EntityList = (props: EntityListProps) => {
  const mapped = Object.entries(images).map(([key, value]) => [key, value]);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from(mapped, ([k, v]) => (
        // <View style={styles.wrapper} key={v}>
        //   <Image source={{ uri: v }} style={styles.image} />
        //   <Text style={styles.label}>{k}</Text>
        // </View>

        <View
          key={v}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 30,
            padding: 15,
          }}
        >
          <Image
            source={{ uri: v }}
            style={{ height: 80, width: 80, marginBottom: 15 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
            {k}
          </Text>
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
