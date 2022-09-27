import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import SearchBar from "../components/SearchBar";
import Context from "../store/coinBase-context";

// CoinBase API
import Entity from "../components/CoinBase/Entity";
import EntityList from "../components/CoinBase/EntityList";

type PortfolioProps = {};

const Portfolio = (props: PortfolioProps) => {
  const { result, error } = useContext(Context);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.wrapper, { marginTop: 30, marginBottom: 20 }]}>
          <SearchBar />
        </View>
        {/* COINBASE API*/}
        {result.length === 0 ? (
          <View style={styles.wrapper}>
            <EntityList />
          </View>
        ) : (
          <View style={styles.wrapper}>
            {result.map((entity: any) => (
              <Entity
                key={entity.product_id}
                productId={entity.product_id}
                price={entity.prices}
                time={entity.time}
                open={entity.open}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(41, 47, 56)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: { flex: 1, width: "100%" },
  wrapper: { paddingHorizontal: 20 },
});

export default Portfolio;
