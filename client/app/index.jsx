import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../reuseable-components/CustomButton";
import { useState } from "react";
import { router } from "expo-router";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/sign-in");
    }, 250);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoHeader}>MeGotchi</Text>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../assets/images/megotchi_home_Avatar.svg")}
        />
      </View>
      <View style={styles.sloganBox}>
        <Text style={styles.appSlogan}>Your new self-help friend</Text>
      </View>
      <CustomButton
        title={isLoading ? <ActivityIndicator color="#FFF" /> : "Enter"}
        titleStyleName="homeTitle"
        styleName="btnHome"
        handlePress={handlePress}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: " 100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginTop: "5rem",
  },

  logo: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    backgroundColor: "#FF6363",
    border: "6px solid black",
    marginTop: "3rem",
    marginBottom: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "140px",
    height: "140px",
    boxShadow: "10px 10px 5px 0px #000",
    zIndex: "2",
  },

  sloganBox: {
    width: "70%",
    height: "10%",
    marginTop: "1.8rem",
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
  },

  appSlogan: {
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    fontSize: "1.1rem",
    textAlign: "center",
  },
});
