import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import megotchiPic from "../assets/images/megotchi_home_Avatar.svg";
import userContext from "../app/(contexts)/userContext";
import { router } from "expo-router";
import CustomButton from "../reuseable-components/CustomButton";

const WelcomePage = ({ setShowWelcomePage }) => {
  const { user } = useContext(userContext);

  useEffect(() => {
    fetch(`https://megotchi-api.onrender.com/users/${user._id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      })
      .catch((error) => {
        return { message: error };
      });
  });

  return (
    <View style={styles.welcomePage}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoHeader}>MeGotchi</Text>
        <Text style={styles.tradeMark}>&trade;</Text>
      </View>

      <View style={styles.logo}>
        <Image style={styles.image} source={megotchiPic} />
      </View>
      <View style={styles.welcomeMsgBox}>
        <Text style={styles.welcomeNameText}>Hello {user.displayName}</Text>
        <Text style={styles.megotchiWelcome}>
          Welcome to the MeGotchi Tribe
        </Text>
        <Text style={styles.welcomeText}>
          My name is {user.megotchi.name}, chief of the MeGotchis and we're so
          glad you have joined us...
        </Text>
      </View>
      {/* <Pressable
        style={styles.nextBtnBox}
        onPress={() => setShowWelcomePage(false)}
      >
        <Text style={styles.nextBtnText}>Next</Text>
      </Pressable> */}
      <CustomButton
        styleName="btnWelcome"
        title={"Continue"}
        titleStyleName="welcomeTitle"
        handlePress={() => setShowWelcomePage(false)}
      />
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  welcomePage: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FF6363",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5rem",
    width: "50%",
  },

  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.2rem",
  },

  tradeMark: {
    marginLeft: "0.2rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
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
    marginTop: "3rem",
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

  welcomeMsgBox: {
    width: "80%",
    height: "35%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginTop: "1rem",
  },

  welcomeNameText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    fontFamily: "MarkoOne-Regular",
    textAlign: "center",
    marginTop: "0.5rem",
  },

  megotchiWelcome: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    fontFamily: "MarkoOne-Regular",
    marginTop: "1.4rem",
    textAlign: "center",
  },

  welcomeText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    fontFamily: "MarkoOne-Regular",
    marginTop: "1.4rem",
    textAlign: "center",
  },
  avatarNameText: {
    fontSize: 18,
    color: "white",
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
  },
});
