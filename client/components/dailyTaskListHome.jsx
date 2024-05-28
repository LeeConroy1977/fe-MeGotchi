import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskHome from "./taskHome";

const DailyTaskListHome = ({ tasks, handleDeletedTask }) => {
  return (
    <>
      {tasks.map((task, i) => {
        return (
          <TaskHome
            task={task}
            key={task.id}
            index={i}
            handleDeletedTask={handleDeletedTask}
          />
        );
      })}
    </>
  );
};

export default DailyTaskListHome;

const styles = StyleSheet.create({});
