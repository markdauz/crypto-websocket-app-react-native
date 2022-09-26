import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Context from "../store/coinBase-context";

type SearchBarProps = {};

const SearchBar = (props: SearchBarProps) => {
  const { currencies, handleEntityChange } = useContext(Context);
  const [value, setValue] = useState<string>("");

  const entityTermHandler = (searchTerm) => {
    /**
     * COINBASE API
     */
    handleEntityChange(
      currencies.filter(
        (currency: any) =>
          currency.base_currency.toLowerCase() === searchTerm.toLowerCase()
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRYPTOCURRENCY</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="search"
          color="rgb(146, 153, 170)"
          style={styles.icon}
        />
        <TextInput
          value={value}
          onChangeText={(searchTerm) => setValue(searchTerm)}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
          placeholder="Search from database..."
          placeholderTextColor={"rgb(146, 153, 170)"}
          onSubmitEditing={() => {
            entityTermHandler(value);
            setValue("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(22, 24, 29)",
    borderRadius: 10,
    height: "auto",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0091EA",
    marginBottom: 20,
    textTransform: "lowercase",
  },
  inputContainer: {
    backgroundColor: "rgb(41, 47, 56)",
    height: 50,
    borderRadius: 5,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#DBDEE6",
  },
  icon: {
    fontSize: 24,
    alignSelf: "center",
    marginHorizontal: 10,
  },
});
export default SearchBar;
