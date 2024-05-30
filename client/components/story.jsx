import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native-web";
import CustomButton from "../reuseable-components/CustomButton";

const Story = ({ setIsStoryOpen }) => {
  return (
    <View style={styles.quest}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/images/quest_background.svg")}
        resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.logoHeader}>MeGotchi</Text>
          <Text style={styles.tradeMark}>&trade;</Text>
        </View>
        <View style={styles.questTitleBox}>
          <Text style={styles.questTitle}>Daily Quest</Text>
        </View>
        <View style={styles.questBox}>
          <Text style={styles.questText}>
            Yamauba the MeGotchi catcher has caught some of our friends.
            Complete your daily tasks and buy back our beloved MeGotchis...
          </Text>
          <CustomButton
            styleName="btnQuest"
            title={"Continue"}
            titleStyleName="wellnessTitle"
            handlePress={() => setIsStoryOpen(false)}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  quest: {
    width: "100%",
    height: "630px",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.5rem",
    width: "100%",
  },

  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.5rem",
  },

  tradeMark: {
    marginLeft: "0.2rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },

  questTitleBox: {
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "18.5rem",
  },
  questTitle: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
  },

  questBox: {
    width: "80%",
    height: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginTop: "1.4rem",
    // backgroundColor: "white",
  },
  questText: {
    color: "white",
    fontSize: "1rem",
    fontFamily: "MarkoOne-Regular",
    // fontWeight: "bold",
    marginLeft: "0.2rem",
    textAlign: "center",
  },
});
