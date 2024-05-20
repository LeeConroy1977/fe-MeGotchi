import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  route,
  styleName,
  titleStyleName,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      href={route}
      style={styles[styleName]}
    >
      <Text style={styles[titleStyleName]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnHome: {
    width: "240px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "5rem",
    backgroundColor: "#FF6363",
    borderRadius: "8px",
    color: "white",
    boxShadow: "2px 2px 2px 0px #000",
    letterSpacing: "0.03rem",
  },
  btnSignIn: {
    width: "240px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "2.4rem",
    backgroundColor: "#FF6363",
    borderRadius: "8px",
    color: "white",
    boxShadow: "2px 2px 2px 0px #000",
    letterSpacing: "0.03rem",
  },
  homeTitle: {
    fontFamily: "MarkoOne-regular",
    color: "white",
    fontSize: "0.85rem",
  },
});
