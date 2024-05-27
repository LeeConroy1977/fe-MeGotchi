import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import megotchiPic from "../../assets/images/megotchi_home_Avatar.svg";
import { router } from "expo-router";
import WelcomePage from "../../components/WelcomePage";

const WellnessCheck = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const options = [
    { id: 1, text: "Great", emoji: "😃" },
    { id: 2, text: "Okay", emoji: "😐" },
    { id: 3, text: "Been Better", emoji: "😟" },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  const handleNextPress = () => {
    if (selectedOption !== null) {
      setIsLoading(true);
      // Simulate lag
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/home");
      }, 250);
    }
  };

  return (
    <View style={styles.container}>
      {showWelcomePage ? (
        <WelcomePage />
      ) : (
        <>
          <Text style={styles.title}>MeGotchi</Text>
          <Image source={megotchiPic} style={styles.image} />
          <Text style={styles.question}>How are you feeling today?</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  {
                    borderBlockColor: selectedOption === option.id && "green",
                  },
                ]}
                onPress={() => handleOptionSelect(option.id)}
              >
                <Text style={styles.emoji}>{option.emoji}</Text>
                <Text style={styles.optionText}>{option.text}</Text>
                {selectedOption === option.id && (
                  <FontAwesome
                    name="check"
                    size={24}
                    color="green"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: selectedOption !== null ? "#FF6363" : "gray" },
            ]}
            onPress={handleNextPress}
            disabled={selectedOption === null || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.nextButtonText}>Next</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default WellnessCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "MarkoOne-Regular",
  },
  image: {
    width: 200,
    height: 200,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "MarkoOne-Regular",
  },
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "4px solid black",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    flex: 1,
    fontFamily: "MarkoOne-Regular",
  },
  checkIcon: {
    marginLeft: 10,
  },
  nextButton: {
    padding: 15,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
  },
});
