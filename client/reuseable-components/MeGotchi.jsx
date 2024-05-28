import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MeGotchis from "../db/MeGotchis";

const MeGotchi = ({
  avatarBox,
  avatarImage,
  handlePress,
  isSelected,
  index,
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles[avatarBox], isSelected && styles.selected]}>
        <Image
          style={styles[avatarImage]}
          source={MeGotchis[index].image_url}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MeGotchi;

const styles = StyleSheet.create({
  selectAvatarBox: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "5px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectAvatarImage: {
    width: "55px",
    height: "55px",
    boxShadow: "10px 10px 5px 0px #000",
    zIndex: "2",
  },
  selected: {
    backgroundColor: "#FF6363",
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: "5px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
