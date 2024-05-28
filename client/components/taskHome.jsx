import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const TaskHome = ({ task, handleDeletedTask }) => {
  const { title, body, iconURL, message} = task;
  return (
    <View style={styles.taskCard}>
      <View style={styles.iconContainer}>
        {task && (
          <Image
            source={require(`../assets/images/task_icon.svg`)}
            style={styles.taskIcon}
          />
        )}
      </View>
      <Text style={styles.taskTitle}>{title}</Text>
      <Pressable style={styles.taskBtn} onPress={() => handleDeletedTask(task)}>
        <FontAwesome name="check" size={16} color="green" />
      </Pressable>
    </View>
  );
};

export default TaskHome;

const styles = StyleSheet.create({
  taskCard: {
    height: "42px",
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
    marginLeft: "0.4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  taskIcon: {
    width: "25px",
    height: "25px",
  },

  taskTitle: {
    fontSize: "0.75rem",
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
    color: "#264653",
  },
  taskBtn: {
    width: "32px",
    height: "26px",
    backgroundColor: "gray",
    marginRight: "1rem",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    boxShadow: "1px 1px 1px 0px #A8A8A8",
  },
});
