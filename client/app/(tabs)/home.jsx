import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WelcomePage from "../../components/WelcomePage";
import WellnessCheck from "../../components/WellnessCheck";

const home = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWellnessCheckComplete = () => {
    setCurrentStep(3);
  };

  return (
    <View style={styles.container}>
      {currentStep === 1 && <WelcomePage />}
      {currentStep === 2 && (
        <WellnessCheck onComplete={handleWellnessCheckComplete} />
      )}
      {currentStep === 3 && (
        <View style={styles.homeView}>
          <Text style={styles.homeText}>Home</Text>
        </View>
      )}
    </View>
  );
};
export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
