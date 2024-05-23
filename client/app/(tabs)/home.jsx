import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import WelcomePage from "../../components/WelcomePage";
import WellnessCheck from "../../components/WellnessCheck";
import userContext from "../(contexts)/userContext";

const home = () => {
  const { user, setUser } = useContext(userContext);

  function handleUserGreeting (e) {

  }

  return (
    <View>
      <WelcomePage />
      <Text style={styles.pageMessage}>Welcome: {user.displayName}</Text>
      {/* <WellnessCheck /> */}
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
