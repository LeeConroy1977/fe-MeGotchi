import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>Home</Text>
    </View>
  );
};
export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
