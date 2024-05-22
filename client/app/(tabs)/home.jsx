import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WelcomePage from "../../components/WelcomePage";
import WellnessCheck from "../../components/WellnessCheck";

const home = () => {
  return (
    <View>
      <WelcomePage />
      {/* <WellnessCheck /> */}
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
