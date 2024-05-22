import { StyleSheet, Text, View } from "react-native";
import React from "react";

const WelcomePage = () => {
  return (
    <View style={styles.welcomePage}>
      <Text>WelcomePage</Text>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  welcomePage: {
    width: "100%",
    height: "100%",
  },
});
