import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DailyTask from "./dailyTask";
import { ScrollView } from "react-native-web";

const DailyTasks = ({ dailyTasks }) => {
  const [currOpen, setCurrOpen] = useState(null);
  return (
    <ScrollView>
      <View style={styles.dailyTaskList}>
        <View style={styles.tasksContainer}>
          {dailyTasks.map((task) => {
            return (
              <DailyTask
                task={task}
                key={task.id}
                id={task.id}
                oncurrOpen={setCurrOpen}
                currOpen={currOpen}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default DailyTasks;

const styles = StyleSheet.create({
  dailyTaskList: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  tasksContainer: {
    marginTop: "1rem",
    width: "90%",
    gap: "1.2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
