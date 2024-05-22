import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native-web";
import DailyTasks from "../../components/dailyTasks";
// import { SafeAreaView } from "react-native-safe-area-context";

const dailyTasks = [
  {
    id: 1,
    title: "Take a nice walk",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coins: 10,
    isCompleted: false,
    color: "#7684FF",
  },
  {
    id: 2,
    title: "Make a lovely meal",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coins: 10,
    isCompleted: false,
    color: "#C8CCEE",
  },
  {
    id: 3,
    title: "Take a hot shower",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coins: 10,
    isCompleted: false,
    color: "#98A2FF",
  },
  {
    id: 4,
    title: "Drink some water",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coins: 10,
    isCompleted: false,
    color: "#7684FF",
  },
  {
    id: 5,
    title: "Take a walk",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coins: 10,
    isCompleted: false,
    color: "#EFEFEF",
  },
  {
    id: 6,
    title: "Take a walk",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coins: 10,
    isCompleted: false,
    color: "#FFD0EF",
  },
];

const tasks = () => {
  const [tabSelected, setTabSelected] = useState("defaultTasks");
  console.log(tabSelected);
  return (
    <SafeAreaView style={styles.tasks}>
      <View style={styles.tasksTabs}>
        <TouchableOpacity
          style={styles.dailyTasks}
          onPress={() => setTabSelected("daily")}
        >
          <Image
            style={styles.avatarImageMeGotchi}
            source={require("../../assets/images/megotchi_home_Avatar.svg")}
          />

          <Text style={styles.tabText}>Daily Tasks</Text>
          <Text style={styles.textDots}>. . .</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customTasks}
          onPress={() => setTabSelected("custom")}
        >
          <Image
            style={styles.avatarImage}
            source={require("../../assets/images/SNAIL_4.svg")}
          />
          <Text style={styles.tabText}>My Tasks</Text>
          <Text style={styles.textDots}>. . .</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addTasks}
          onPress={() => setTabSelected("add")}
        >
          <Image
            style={styles.avatarImage}
            source={require("../../assets/images/japanese_bird_1.svg")}
          />
          <Text style={styles.tabText}>Add Tasks</Text>
          <Text style={styles.textDots}>. . .</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleBox}>
        <Text style={styles.title}>
          {tabSelected === "daily" || tabSelected === "defaultTasks"
            ? "Daily Tasks "
            : tabSelected === "custom"
            ? "My Tasks"
            : "Add tasks"}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.tasksView}>
          {tabSelected === "daily" || tabSelected === "defaultTasks" ? (
            <DailyTasks dailyTasks={dailyTasks} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default tasks;

const styles = StyleSheet.create({
  tasks: {
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(to left bottom, #5241af, #7145bc, #9047c8, #af48d2, #ce48da)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tasksTabs: {
    width: "100%",
    height: "25%",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.8rem",
    gap: "1rem",
  },
  dailyTasks: {
    width: "26%",
    height: "80%",
    boxShadow: "2px 2px 1px 1px black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(to left bottom, #f26896, #f65f8d, #fa5683, #fd4c79, #ff416e);",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
  },
  addTasks: {
    width: "24%",
    height: "80%",
    boxShadow: "2px 2px 1px 1px black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(to left bottom, #77bfd9, #2bc6d7, #00cbc2, #00cd9c, #08cc67)",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
  },
  customTasks: {
    width: "24%",
    height: "80%",
    boxShadow: "2px 2px 1px 1px black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(to left bottom, #7684ff, #7f8cff, #8793ff, #909bff, #98a2ff)",

    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
  },

  avatarImage: {
    height: "58px",
    width: "58px",
    marginTop: "0.9rem",
    boxShadow: "2px 2px 1px 1px black",
  },
  avatarImageMeGotchi: {
    height: "60px",
    width: "60px",
    marginTop: "0.9rem",
    boxShadow: "2px 2px 1px 1px black",
  },

  tabText: {
    fontWeight: "500",
    color: "white",
    opacity: "0.9",
    fontFamily: "MarkoOne-regular",
    // fontSize: "0.5",
  },

  textDots: {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "MarkoOne-regular",
  },

  titleBox: {
    borderBottomColor: "2px solid white",
    width: "80%",
    height: "8%",
    borderBottomWidth: "3px",
    borderBlockColor: "white",
    marginBottom: "1rem",
  },
  title: {
    marginTop: "1rem",
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "white",
    opacity: "0.8",
    fontFamily: "MarkoOne-regular",
    marginRight: "auto",
    // marginLeft: "0.2rem",
    paddingBottom: "0.8rem",
  },
  tasksView: {
    width: "100%",
    height: "93%",
  },
});
