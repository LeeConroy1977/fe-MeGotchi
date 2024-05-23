import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import userContext from "../(contexts)/userContext";

const home = () => {
  const { user, setUser } = useContext(userContext);

  return (
    <View>
      <Text style={styles.pageMessage}>Welcome: {user.displayName}</Text>
    </View>
  );

};

export default home;

const styles = StyleSheet.create({});
