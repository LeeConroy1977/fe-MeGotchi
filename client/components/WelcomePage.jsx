import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import megotchiPic from "../assets/images/megotchi_home_Avatar.svg";

const WelcomePage = () => {
  const username = "Johnny";
  const givenName = "littleGuy76";

  return (
    <View style={styles.welcomePage}>
      <Text style={styles.welcomeText}>Welcome back, {username}</Text>
      <View style={styles.logo}>
        <Image style={styles.image} source={megotchiPic} />
      </View>
      <Text style={styles.avatarNameText}>My name is {givenName}</Text>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  welcomePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    backgroundColor: "#FF6363",
  },
  welcomeText: {
    marginTop: "7rem",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontFamily: "MarkoOne-Regular",
  },
  logo: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    backgroundColor: "#959595",
    border: "6px solid black",
    marginTop: "1rem",
    marginBottom: "1.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "140px",
    height: "140px",
    boxShadow: "10px 10px 5px 0px #000",
    zIndex: "2",
  },
  avatarNameText: {
    fontSize: 18,
    color: "white",
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
  },
});
