import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShopItemsCard from "./shopItemsCard";
import Profiles from "../db/Images";

const ShopItemsList = ({ shopItems, handleSelectedItem, handleIsSelected }) => {
  return (
    <View style={styles.shopItemsList}>
      {shopItems.map((item, i) => {
        return (
          <ShopItemsCard
            key={i}
            item={item}
            handleSelectedItem={handleSelectedItem}
            index={i}
            handleIsSelected={handleIsSelected}
          />
        );
      })}
    </View>
  );
};

export default ShopItemsList;

const styles = StyleSheet.create({
  shopItemsList: {
    width: "100%",
    height: "100%",
    // backgroundColor: "gray",
    // backgroundColor: "#706F6F",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "space-around",
    flexWrap: "wrap",
    padding: "0.8rem",
    // paddingTop: "1.2rem",
  },
});
