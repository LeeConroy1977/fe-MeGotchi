import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-web";
import AntDesign from "@expo/vector-icons/AntDesign";

const DailyTask = ({ task, id, oncurrOpen, currOpen }) => {
  // const [isSelected, setIsSelected] = useState(false);
  const { title, body, color, coins, isCompleted } = task;

  const isSelected = id === currOpen;

  function handleIsSelected(id) {
    // setIsSelected((isSelected) => !isSelected);
    oncurrOpen(isSelected ? null : id);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleIsSelected(id)}
      style={
        (styles.taskContainer,
        {
          backgroundColor: color,
          boxShadow: "4px 4px 2px 0px black",
          borderRadius: "8px",
          width: "300px",
          minHeight: "48px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        })
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {isSelected ? (
          <AntDesign
            name="caretup"
            size={16}
            color="#2C3E50"
            style={styles.titleIcon}
          />
        ) : (
          <AntDesign
            name="caretdown"
            size={16}
            color="#2C3E50"
            style={styles.titleIcon}
          />
        )}
      </View>
      {isSelected && (
        <View style={styles.accordion}>
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>{body}</Text>
            <Text style={styles.textDots}>. . .</Text>
          </View>
          <View style={styles.iconBox}>
            <View style={styles.durationBox}>
              <Text style={styles.durationText}>Duration: 15mins</Text>
            </View>
            <TouchableOpacity style={styles.completedBox}>
              <Text style={styles.completedText}>Done</Text>
              <View style={styles.completedIndicator}></View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DailyTask;

const styles = StyleSheet.create({
  taskContainer: {},

  titleContainer: {
    height: "48px",
    width: "280px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    height: "50px",
    marginRight: "auto",
    marginLeft: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "MarkoOne-regular",
    textAlign: "center",
  },

  titleIcon: {
    marginRight: "1.4rem",
  },

  bodyContainer: {
    width: "100%",
    height: "180px",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.4rem",
    borderRadius: "20px",
    border: "4px solid white",
  },
  body: {
    height: "130px",
    width: "240px",
    display: "flex",
    flexWrap: "wrap",
    fontWeight: "bold",
    // marginTop: "1rem",
    fontFamily: "MarkoOne-regular",
    fontSize: "0.75rem",
    padding: "0.8rem",
    textAlign: "center",
    lineHeight: "1.2rem",
  },
  textDots: {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "MarkoOne-regular",
  },
  iconBox: {
    height: "60px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "0.2rem",
    // backgroundColor: "white",
  },

  // durationBox: {
  //   height: "30px",
  //   width: "120px",
  //   border: "2px solid white",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   borderRadius: "8px",
  //   padding: "0.2rem",
  //   // backgroundColor: "white",
  // },
  durationText: {
    fontWeight: "bold",
    color: "black",
    fontSize: "0.7rem",
    fontFamily: "MarkoOne-regular",
    // marginRight: "1rem",
    marginLeft: "0.7rem",
  },

  completedBox: {
    height: "30px",
    width: "80px",
    // border: "2px solid white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    padding: "0.2rem",
    marginRight: "0.2rem",
    backgroundColor: "#5dbea3",
    boxShadow: "2px 2px 1px 0px black",
  },
  completedText: {
    fontWeight: "500",
    color: "white",
    fontSize: "0.55rem",
    fontFamily: "MarkoOne-regular",
    // marginRight: "1rem",
    // marginLeft: "0.4rem",
  },
  // completedIndicator: {
  //   width: "14px",
  //   height: "16px",
  //   borderRadius: "50%",
  //   backgroundColor: "green",
  //   border: " 2px solid black",
  //   marginRight: "0.4rem",
  // },
});
