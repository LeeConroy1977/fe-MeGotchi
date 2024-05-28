import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Coins = () => {
  return (
    <View style={styles.coinsContainer}>
      <Image
        source={require("../assets/images/japanese_coins_1.svg")}
        style={styles.coinsImg}
      />
      <Text>10</Text>
    </View>
  );
};

export default Coins;

const styles = StyleSheet.create({
  coinsContainer: {
    width: "200px",
    height: "20px",
    backgroundColor: "white",

    position: "absolute",
  },
  coinsImg: {
    width: "20px",
    height: "20px",
  },
});
