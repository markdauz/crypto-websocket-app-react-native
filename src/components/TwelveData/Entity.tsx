import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Context from "../../store/twelveData-context";
import { images } from "../../constants/images";
import Chart from "../Chart";

type StackParamList = {
  Details: any;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

type EntityProps = {
  name: string;
  price: string[];
};

const Entity = (props: EntityProps) => {
  const { handleDelete } = useContext(Context);
  const { name, price } = props;

  // const percentChange =
  //   ((Number(price.slice(-1)[0]) - Number(open.slice(-1)[0])) /
  //     Number(open.slice(-1)[0])) *
  //   100;

  const navigation = useNavigation<NavigationProps>();
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={() => handleDelete(name)}
    >
      <View style={[styles.wrapper, { marginBottom: 8 }]}>
        <View style={styles.wrapper}>
          <Text style={[styles.text, { color: "#000", marginLeft: 8 }]}>
            {name}
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            {
              color: "rgb(36, 105, 240)",
            },
          ]}
        >{`${price.slice(-1)[0]} USD`}</Text>
      </View>
      <View style={[styles.wrapper, { marginBottom: 8 }]}>
        <View style={styles.wrapper}></View>
        <Text style={[styles.subText, { opacity: 0.5 }]}></Text>
      </View>
      {/* <View>
        {price.length <= 1 ? (
          <ActivityIndicator size="small" color="rgb(36, 105, 240)" />
        ) : (
          <Chart prices={price} />
        )}
      </View> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
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
  text: { fontSize: 18, fontWeight: "700" },
  subText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});

export default Entity;
