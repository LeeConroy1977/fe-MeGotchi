import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import ConfettiCannon from "react-native-confetti-cannon";

import {
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native-web";
import DailyTasks from "../../components/dailyTasks";

const dailyTasks = [
  {
    id: 1,
    title: "Take a nice walk",
    body: "Take a nice walk somewhere and breathe in the air!",
    coins: 10,
    icon: "task_walking_icon",
    message: "Congratulations on taking a walk. It's good to stay healthy!",
  },
  {
    id: 2,
    title: "Make a lovely meal",
    body: "Lorem Ipsum is simply dummy text of the printing.",
    coins: 10,
    icon: "food_icon",
    message: "I hope your meal was tasty and nutritious!",
  },
  {
    id: 3,
    title: "Take a hot shower",
    body: "Lorem Ipsum is simply dummy text of the printing.",
    coins: 10,
    icon: "food_icon",
    message: "Congratulations on taking a walk!",
  },
  {
    id: 4,
    title: "Drink some water",
    body: "Lorem Ipsum is simply dummy text of the printing.",
    coins: 10,
    icon: "food_icon",
    message: "Congratulations on taking a walk!",
  },
  {
    id: 5,
    title: "Take a walk",
    body: "Lorem Ipsum is simply dummy text of the printing.",
    coins: 10,
    icon: "food_icon",
    message: "Congratulations on taking a walk!",
  },
  {
    id: 6,
    title: "Take a walk",
    body: "Lorem Ipsum is simply dummy text of the printing.",
    color: "#FFD0EF",
    icon: "food_icon",
    message: "Congratulations on taking a walk!",
  },
];

const tasks = () => {
  const [isAddTask, setIsAddTask] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalForm, setGoalForm] = useState({
    title: "",
    body: "",
    color: "#6665DD",
    icon: "custom_task_icon",
    message: "Good work. You completed another goal!",
    coins: 10,
  });
  const [allDailyTasks, setAllDailyTasks] = useState(dailyTasks);
  const [completedModalVisible, setCompletedModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  function handleAddTask() {
    setIsAddTask(true);
    setModalVisible(true);
  }

  function handleSelectedTask(task) {
    setSelectedTask(task);
  }

  function handleDeletedTask(id) {
    const filteredTask = allDailyTasks.filter((task) => task.id !== id);
    setAllDailyTasks([...filteredTask]);
  }

  function handleGoalsubmit(e) {
    e.preventDefault();
    if (goalForm.title.length < 4) {
      return;
    }
    if (goalForm.title.length > 3) {
      setAllDailyTasks((allDailyTasks) => [goalForm, ...allDailyTasks]);
      setModalVisible(!modalVisible);
      setIsAddTask(!isAddTask);

      setGoalForm({
        title: "",
        body: "",
        color: "#6665DD",
        icon: "custom_task_icon",
        message: "Good work. You completed another goal!",
        coins: 10,
      });
    }
  }

  return (
    <>
      <SafeAreaView
        style={
          isAddTask || completedModalVisible ? styles.modalOpen : styles.tasks
        }
      >
        <Modal
          style={styles.modal}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeIcon}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setIsAddTask(!isAddTask);
                  setGoalForm({
                    title: "",
                    body: "",
                  });
                }}
              >
                <AntDesign name="closecircleo" size={28} color="black" />
              </Pressable>
              <View style={styles.logo}>
                <Image
                  style={styles.logoImage}
                  source={require("../../assets/images/megotchi_home_Avatar.svg")}
                />
              </View>
              <Text style={styles.modalText}>Add a goal...</Text>
              <View style={styles.addGoalForm}>
                <View style={styles.inputBox}>
                  <View style={styles.inputTextBox}>
                    <Text style={styles.label}>Title</Text>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your title..."
                    name="title"
                    value={goalForm.title}
                    maxLength={25}
                    multiline={true}
                    onChangeText={(e) => {
                      setGoalForm({ ...goalForm, title: e });
                    }}
                  />
                </View>
                <View style={styles.inputBoxBody}>
                  <Text style={styles.label}>Message</Text>
                  <TextInput
                    style={styles.textInputBody}
                    placeholder="Enter your message..."
                    name="body"
                    value={goalForm.body}
                    maxLength={60}
                    multiline={true}
                    onChangeText={(e) => {
                      setGoalForm({ ...goalForm, body: e });
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={(e) => {
                  handleGoalsubmit(e);
                }}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={completedModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setCompletedModalVisible(!completedModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {completedModalVisible && (
                <ConfettiCannon
                  count={400}
                  origin={{ x: -10, y: 200 }}
                  explosionSpeed={400}
                  fallSpeed={3000}
                  fadeOut={true}
                  autoStartDelay={200}
                  colors={[
                    "#00D2FF",
                    "#EC058E",
                    "#E56399",
                    "#AD00FF",
                    "#264653",
                    "white",
                  ]}
                />
              )}

              <Pressable
                style={styles.closeIcon}
                onPress={() => {
                  setCompletedModalVisible(!completedModalVisible);
                  setIsAddTask(false);
                  handleDeletedTask(selectedTask.id);
                }}
              >
                <Text style={styles.skipBtn}>Skip</Text>
              </Pressable>
              <View style={styles.logo}>
                <Image
                  style={styles.logoImage}
                  source={require("../../assets/images/megotchi_home_Avatar.svg")}
                />
              </View>
              <View style={styles.messageBox}>
                <Text style={styles.messageText}>
                  <Text style={styles.emoji}>😎 </Text>
                  {selectedTask.message}
                </Text>
              </View>
              <View style={styles.rewardBox}>
                <Text style={styles.rewardText}>You are awarded</Text>
                <Text style={styles.rewardCoins}>10 Coins</Text>
              </View>
            </View>
          </View>
        </Modal>
        {!isAddTask && !completedModalVisible && (
          <View style={styles.tasksTabs}>
            <ImageBackground
              resizeMode="cover"
              source={require("../../assets/images/tasks_landscape.svg")}
              style={styles.backgroundImg}
            >
              <Image
                style={styles.backgrounMeGotchi}
                source={require("../../assets/images/megotchi_home_Avatar.svg")}
              />
              <Image
                style={styles.backgrounMeGotchiOne}
                source={require("../../assets/images/little_meGotchi_1.svg")}
              />
              <Image
                style={styles.backgrounMeGotchiTwo}
                source={require("../../assets/images/little_meGotchi_2.svg")}
              />
              <Image
                style={styles.backgrounMeGotchiThree}
                source={require("../../assets/images/little_meGotchi_3.svg")}
              />
            </ImageBackground>
          </View>
        )}

        {!isAddTask && !completedModalVisible && (
          <>
            <ScrollView>
              <View style={styles.tasksView}>
                <DailyTasks
                  dailyTasks={allDailyTasks}
                  setCompletedModalVisible={setCompletedModalVisible}
                  handleSelectedTask={handleSelectedTask}
                />
              </View>
            </ScrollView>

            <View style={styles.addTaskContainer}>
              <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
                <AntDesign
                  name="pluscircleo"
                  size={34}
                  color="white"
                  style={styles.plusIcon}
                />
                {}
              </TouchableOpacity>
              <Text style={styles.btnText}>Add a Goal...</Text>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default tasks;

const styles = StyleSheet.create({
  modalOpen: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  tasks: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#706F6F",
  },
  tasksOpacity: {
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(to left bottom, #5241af, #7145bc, #9047c8, #af48d2, #ce48da)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3,
  },
  tasksTabs: {
    width: "100%",
    height: "33%",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#706F6F",
    position: "relative",
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
  },
  dailyTasks: {
    width: "80%",
    height: "80%",
    boxShadow: "2px 2px 1px 1px black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
  },

  avatarImage: {
    height: "58px",
    width: "58px",
    marginTop: "0.9rem",
    boxShadow: "2px 2px 1px 1px black",
  },
  avatarImageMeGotchi: {
    height: "40px",
    width: "40px",
    boxShadow: "2px 2px 1px 1px black",
  },

  tabText: {
    fontWeight: "500",
    color: "black",
    opacity: "0.9",
    fontFamily: "MarkoOne-regular",
  },

  tasksView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#706F6F",
    marginTop: "1rem",
  },

  modalView: {
    position: "relative",
    margin: 20,
    marginTop: "3rem",
    backgroundColor: "#00D2FF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "84%",
    height: "520px",
    margin: "auto",
    boxShadow: "1px 1px 10px 0px #00D2FF",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeIcon: {
    marginLeft: "auto",
  },
  skipBtn: {
    color: "#F8FCDA",
    fontWeight: "bold",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: "1.1rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
  },

  logo: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#F8FCDA",
    border: "5px solid black",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "110px",
    height: "110px",
    boxShadow: "10px 10px 5px 0px #000",
  },

  backgrounMeGotchi: {
    width: "160px",
    height: "160px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-25px",
    left: "70px",
  },
  backgrounMeGotchiOne: {
    width: "90px",
    height: "90px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "5px",
    left: "30px",
  },
  backgrounMeGotchiTwo: {
    width: "120px",
    height: "120px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "0px",
    left: "220px",
  },
  backgrounMeGotchiThree: {
    width: "80px",
    height: "80px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-10px",
    left: "210px",
    zIndex: "3",
  },
  messageBox: {
    width: "100%",
    height: "40%",
    marginTop: "1rem",
    textAlign: "center",
    padding: "1rem",
    borderRadius: "12px",
  },
  messageText: {
    fontSize: "1.2rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    textAlign: "center",
    color: "#264653",
    mixBlendMode: "difference",
    wordSpacing: "0.1rem",
    lineHeight: "1.8rem",
  },
  emoji: {
    fontSize: "1.4rem",
  },
  rewardBox: {
    width: "70%",
    height: "14%",
    marginTop: "2rem",
    display: "flex",
    flexDirection: "coloumn",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rewardText: {
    fontSize: "1.3rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    textAlign: "center",
    color: "#264653",
  },
  rewardCoins: {
    fontSize: "1.4rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    textAlign: "center",
    color: "#F8FCDA",
  },
  addGoalForm: {
    width: "90%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    marginTop: "0.4rem",
  },
  inputBox: {
    width: "100%",
    height: "90px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "8px",
    marginTop: "0.3rem",
  },
  inputBoxBody: {
    width: "100%",
    height: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "8px",
    marginTop: "0.3rem",
  },
  inputTextBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  textInput: {
    color: "black",
    fontSize: "0.75rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    outlineStyle: "none",
    border: "2px solid #264653",
    boxShadow: "1px 1px 1px 0px #264653",
    width: "100%",
    height: "75%",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "white",
    paddingLeft: "0.8rem",
    paddingTop: "0.8rem",
  },

  textInputBody: {
    color: "black",
    fontSize: "0.75rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    outlineStyle: "none",
    backgroundColor: "white",
    width: "100%",
    height: "80%",
    border: "2px solid #264653",
    boxShadow: "1px 1px 1px 0px #264653",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingLeft: "0.8rem",
    paddingTop: "0.8rem",
  },
  label: {
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    fontSize: "0.7rem",
    marginBottom: "0.3rem",
    marginTop: "0.5rem",
    marginLeft: "0.2rem",
  },
  submitBtn: {
    width: "40%",
    height: "34px",
    backgroundColor: "#706F6F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    boxShadow: "1px 1px 1px 1px #264653",
  },
  submitBtnText: {
    fontFamily: "MarkoOne-regular",
    color: "white",
    fontSize: "0.6",
  },
  addTaskContainer: {
    height: "9%",
    width: "320px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "1rem",
    marginTop: "1rem",
    borderRadius: "12px",
    backgroundColor: "#00D2FF",
  },
  addBtn: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginLeft: "0.8rem",
  },
  btnText: {
    marginLeft: "1rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    color: "#264653",
  },
  plusIcon: {
    fontWeight: "bold",
    backgroundColor: "#00D2FF",
    borderRadius: "50%",
  },
});
