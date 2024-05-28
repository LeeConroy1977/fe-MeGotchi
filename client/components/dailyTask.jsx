import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-web";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
const DailyTask = ({
  task,
  id,
  oncurrOpen,
  currOpen,
  setCompletedModalVisible,
  handleSelectedTask,
}) => {
  const { title, body, iconUrl, message } = task;

  const isSelected = id === currOpen;

  function handleIsSelected(id) {
    oncurrOpen(isSelected ? null : id);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleIsSelected(id)}
      style={
        (styles.taskContainer,
        {
          boxShadow: "2px 2px 1px 0px black",
          borderRadius: "16px",
          width: "300px",
          minHeight: "46px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "white",
        })
      }
    >
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer}>
          {task && (
            <Image
              source={require(`../assets/images/task_icon.svg`)}
              style={styles.taskIcon}
            />
          )}
        </View>
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
            <TouchableOpacity
              style={styles.completedBox}
              onPress={() => {
                setCompletedModalVisible(true);
                handleSelectedTask(task);
              }}
            >
              {/* <Text style={styles.completedText}></Text> */}
              <FontAwesome name="check" size={14} color="black" />
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
  taskContainer: {
    backgroundColor: "white",
  },

  titleContainer: {
    height: "46px",
    width: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "16px",
  },
  iconContainer: {
    width: "15%",
    height: "100%",
    marginLeft: "0.6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  taskIcon: {
    width: "25px",
    height: "25px",
  },
  title: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    height: "50px",
    marginRight: "auto",
    marginLeft: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "MarkoOne-regular",
    textAlign: "center",
    color: "#264653",
  },
  titleIcon: {
    marginRight: "1.4rem",
  },
  accordion: {
    width: "100%",
    height: "170px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bodyContainer: {
    width: "90%",
    height: "100px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.4rem",
    borderRadius: "20px",
    border: "4px solid #264653",
    marginTop: "0.8rem",
  },
  body: {
    height: "60px",
    width: "240px",
    display: "flex",
    flexWrap: "wrap",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    fontSize: "0.75rem",
    padding: "1.2rem",
    textAlign: "center",
    lineHeight: "1.2rem",
    color: "#264653",
  },
  textDots: {
    fontWeight: "bold",
    color: "#264653",
    fontSize: "1.5rem",
    fontFamily: "MarkoOne-regular",
    paddingBottom: "0.5rem",
  },
  iconBox: {
    height: "60px",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "0.2rem",
  },
  durationText: {
    fontWeight: "bold",
    color: "#264653",
    fontSize: "0.7rem",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.7rem",
  },
  completedBox: {
    height: "26px",
    width: "55px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    padding: "0.2rem",
    marginRight: "0.4rem",
    backgroundColor: "#00D2FF",
    boxShadow: "1px 1px 1px 0px #264653",
  },
  completedText: {
    fontWeight: "500",
    color: "#264653",
    fontSize: "0.55rem",
    fontFamily: "MarkoOne-regular",
  },
});
