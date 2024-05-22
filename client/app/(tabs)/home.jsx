import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WelcomePage from "../../components/WelcomePage";
import WellnessCheck from "../../components/WellnessCheck";

const home = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <View>{showWelcomePage ? <WelcomePage /> : <WellnessCheck />}</View>;
};

export default home;

const styles = StyleSheet.create({});
