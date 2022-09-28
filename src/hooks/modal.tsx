import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import React from "react";

import { createUseModal } from "react-native-use-modal";

export const useAlertModal = createUseModal<
  void,
  { title: string; message: string }
>(({ confirm, param }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{param.title}</Text>
      <Text>{param.message}</Text>

      <View style={styles.buttonContainer}>
        <Text onPress={confirm} style={styles.buttonText}>
          Ok
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#0091EA",
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: { textTransform: "uppercase", color: "white", fontSize: 16 },
});
