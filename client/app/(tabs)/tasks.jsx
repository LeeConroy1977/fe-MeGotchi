import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import ConfettiCannon from "react-native-confetti-cannon";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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
import userContext from "../(contexts)/userContext";
import tasksContext from "../(contexts)/tasksContext";

const tasks = () => {
  const { user, setUser } = useContext(userContext);
  const { taskInfo, setTaskInfo } = useContext(tasksContext);
  const [isAddTask, setIsAddTask] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalForm, setGoalForm] = useState({
    title: "",
    body: "",
    iconUrl: "../assets/images/task_walking_icon.svg",
    message: "Good work. You completed another goal!",
  });
  const [completedModalVisible, setCompletedModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, []);

  useEffect(() => {}, [setUser, setTaskInfo]);

  function handleAddTask() {
    setIsAddTask(true);
    setModalVisible(true);
  }

  function handleSelectedTask(task) {
    setSelectedTask(task);
  }

  function handleDeletedTask(task) {
    const sentItem = {
      isDelete: true,
      taskList: [task],
    };

    fetch(`https://megotchi-api.onrender.com/users/${user._id}/tasks`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentItem),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        const moneyIncrement = { balance: 10 };
        fetch(`https://megotchi-api.onrender.com/users/${user._id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(moneyIncrement),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            }
            setTaskInfo(() => {
              const taskInfoCopy = { ...taskInfo };
              taskInfoCopy.tasksCompleted += 1;
              return taskInfoCopy;
            });
            setUser(data);
            setIsLoading(false);
          })
          .catch((error) => {
            alert(`Error completing goal`);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        alert(`Error completing goal`);
        setIsLoading(false);
      });
  }

  function handleGoalsubmit() {
    if (goalForm.title.length < 4) {
      return;
    }
    if (goalForm.title.length > 3) {
      const sentItem = {
        isDelete: false,
        taskList: [goalForm],
      };

      fetch(`https://megotchi-api.onrender.com/users/${user._id}/tasks`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentItem),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            alert(`Goal setting error: ${data.error}`);
          }
          setModalVisible(false);
          setIsAddTask(false);
          setGoalForm({
            title: "",
            body: "",
            iconUrl: "custom_task_icon",
            message: "Good work. You completed another goal!",
          });
          setTaskInfo(() => {
            const taskInfoCopy = { ...taskInfo };
            taskInfoCopy.tasksTotal += 1;
            console.log(taskInfoCopy);
            return taskInfoCopy;
          });
          setUser(data);
        })
        .catch((error) => {
          alert(`Error setting goal`);
        });
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
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
              <View style={styles.imageContainerTask}>
                <ImageBackground
                  source={require("../../assets/images/tasks_added_landscape.svg")}
                  resizeMode="cover"
                  style={styles.taskCompletedBackgroundTask}
                >
                  <Pressable
                    style={styles.closeIconTask}
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

                  <Image
                    style={styles.backgrounMeGotchiTask}
                    source={require("../../assets/images/megotchi_home_Avatar.svg")}
                  />
                  <Image
                    style={styles.backgrounMeGotchiOneTask}
                    source={require("../../assets/images/little_meGotchi_1.svg")}
                  />
                  <Image
                    style={styles.backgrounMeGotchiTwoTask}
                    source={require("../../assets/images/little_meGotchi_2.svg")}
                  />
                  <Image
                    style={styles.backgrounMeGotchiThreeTask}
                    source={require("../../assets/images/little_meGotchi_3.svg")}
                  />
                </ImageBackground>
              </View>

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
        {/* // */}
        {/* // */}
        {/* // */}
        {/* // */}
        {/* // */}
        {/* // */}
        {/* // */}
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
              <View style={styles.imageContainerTask}>
                <ImageBackground
                  source={require("../../assets/images/tasks_completed_landscape.svg")}
                  resizeMode="cover"
                  style={styles.taskCompletedBackgroundTask}
                >
                  <Image
                    style={styles.backgrounMeGotchiCelebration}
                    source={require("../../assets/images/celebration_meGotchi.svg")}
                  />

                  <Image
                    style={styles.backgrounMeGotchiOneCelebration}
                    source={require("../../assets/images/celebration_meGotchi_1.svg")}
                  />
                  <Image
                    style={styles.backgrounMeGotchiTwoCelebration}
                    source={require("../../assets/images/celebration_meGotchi_2.svg")}
                  />
                  <Image
                    style={styles.backgrounMeGotchiThreeCelebration}
                    source={require("../../assets/images/celebration_meGotchi_3.svg")}
                  />
                </ImageBackground>
              </View>
              <View style={styles.messageBox}>
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
                <Text style={styles.messageText}>{selectedTask.message}</Text>
              </View>
              <Pressable
                style={styles.closeIcon}
                onPress={() => {
                  setCompletedModalVisible(!completedModalVisible);
                  setIsAddTask(false);
                  handleDeletedTask(selectedTask);
                }}
              >
                <Text style={styles.skipBtn}>Skip...</Text>
              </Pressable>
              {/* <View style={styles.rewardBox}>
                <Text style={styles.rewardText}>You are awarded</Text>
                <Text style={styles.rewardCoins}>10 Coins</Text>
              </View> */}
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
              <View style={styles.coinsContainer}>
                <Image
                  source={require("../../assets/images/japanese_coins_1.svg")}
                  style={styles.coinsImg}
                />
                <Text style={styles.coinText}>{user.balance}</Text>
              </View>
              <View style={styles.tasksRamaingBox}>
                <FontAwesome6 name="circle-info" size={16} color="black" />
                <Text style={styles.tasksRamainingText}>
                  You have {user.taskList.length} tasks remaining
                </Text>
              </View>
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
                  dailyTasks={user.taskList}
                  setCompletedModalVisible={setCompletedModalVisible}
                  handleSelectedTask={handleSelectedTask}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.addTaskContainer}
              onPress={handleAddTask}
            >
              <AntDesign
                name="pluscircleo"
                size={26}
                color="white"
                style={styles.plusIcon}
              />

              <Text style={styles.btnText}>Add a Goal...</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default tasks;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  coinsImg: {
    width: "20px",
    height: "20px",
    marginLeft: "0.5rem",
  },
  coinText: {
    fontSize: "0.85rem",
    marginLeft: "0.4rem",
    marginTop: "0.1rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    color: "#264653",
  },
  coinsContainer: {
    width: "70px",
    height: "24px",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "auto",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: "1rem",
    marginTop: "1rem",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
  },

  tasksRamaingBox: {
    width: "55%",
    height: "24px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "1rem",
    marginLeft: "1rem",
    paddingLeft: "0.5rem",
  },
  tasksRamainingText: {
    marginLeft: "0.65rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    color: "#264653",
    fontSize: "0.65rem",
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
    marginTop: "0.8rem",
  },

  modalView: {
    position: "relative",
    margin: 20,
    marginTop: "3rem",
    backgroundColor: "#706F6F",
    // borderRadius: 20,
    // padding: 20,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 5,
    //   height: 3,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
    width: "84%",
    height: "520px",
    margin: "auto",
    // boxShadow: "1px 1px 10px 0px #00D2FF",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeIcon: {
    marginLeft: "auto",
    marginTop: "2.5rem",
  },
  skipBtn: {
    color: "white",
    fontSize: "0.8rem",
    marginRight: "1.4rem",
    marginBottom: "1rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
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

  backgrounMeGotchi: {
    width: "140px",
    height: "140px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-25px",
    left: "75px",
  },
  backgrounMeGotchiOne: {
    width: "90px",
    height: "90px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-5px",
    left: "30px",
  },
  backgrounMeGotchiTwo: {
    width: "110px",
    height: "110px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-10px",
    left: "220px",
  },
  backgrounMeGotchiThree: {
    width: "80px",
    height: "80px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-10px",
    left: "180px",
    zIndex: "3",
  },
  messageBox: {
    width: "80%",
    height: "40%",
    marginTop: "1rem",
    textAlign: "center",
    padding: "1rem",
    borderRadius: "12px",
  },
  messageText: {
    fontSize: "1.2rem",
    fontFamily: "MarkoOne-regular",
    // fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
    // marginTop: "2rem",
    display: "flex",
    flexDirection: "coloumn",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rewardText: {
    fontSize: "1.2rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  rewardCoins: {
    fontSize: "1.2rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    textAlign: "center",
    color: "#F8FCDA",
  },
  addGoalForm: {
    width: "90%",
    height: "40%",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  inputBox: {
    width: "100%",
    height: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "8px",
    marginTop: "0.3rem",
  },
  inputBoxBody: {
    width: "100%",
    height: "110px",
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
    height: "65%",
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
    height: "70%",
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
    backgroundColor: "#5adbb5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    boxShadow: "1px 1px 1px 1px #264653",
    marginTop: "1.5rem",
  },
  submitBtnText: {
    fontFamily: "MarkoOne-regular",
    color: "white",
    fontSize: "0.6",
  },
  addTaskContainer: {
    height: "46px",
    width: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "1rem",
    marginTop: "0.8rem",
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
  },
  btnText: {
    marginLeft: "1rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    color: "#264653",
    fontSize: "0.8rem",
  },
  plusIcon: {
    fontWeight: "bold",
    backgroundColor: "#00D2FF",
    borderRadius: "50%",
    marginLeft: "0.8rem",
  },

  imageContainerTask: {
    width: "100%",
    height: "40%",
  },

  taskCompletedBackgroundTask: {
    width: "100%",
    height: "100%",
  },
  backgrounMeGotchiCelebration: {
    width: "110px",
    height: "110px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "5px",
    left: "70px",
    zIndex: "6",
  },
  backgrounMeGotchiOneCelebration: {
    width: "78px",
    height: "78px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "20px",
    left: "10px",
    zIndex: "5",
  },
  backgrounMeGotchiTwoCelebration: {
    width: "75px",
    height: "75px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "18px",
    left: "210px",
  },
  backgrounMeGotchiThreeCelebration: {
    width: "55px",
    height: "55px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "15px",
    left: "160px",
    zIndex: "3",
  },

  backgrounMeGotchiTask: {
    width: "115px",
    height: "115px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-20px",
    left: "75px",
  },
  backgrounMeGotchiOneTask: {
    width: "90px",
    height: "90px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-5px",
    left: "20px",
  },
  backgrounMeGotchiTwoTask: {
    width: "105px",
    height: "105px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-5px",
    left: "210px",
  },
  backgrounMeGotchiThreeTask: {
    width: "65px",
    height: "65px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-10px",
    left: "175px",
    zIndex: "3",
  },
  closeIconTask: {
    marginLeft: "auto",
    marginRight: "1rem",
    marginTop: "1rem",
  },
});
