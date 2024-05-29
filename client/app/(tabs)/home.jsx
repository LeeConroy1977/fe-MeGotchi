import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import userContext from "../(contexts)/userContext";
import tasksContext from "../(contexts)/tasksContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DailyTaskListHome from "../../components/dailyTaskListHome";
import { Modal, ScrollView } from "react-native-web";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Progress from "react-native-progress";
import { ShopItemsContext } from "../(contexts)/shopItemsContext";

const dailyTasks = [
  {
    id: 1,
    title: "Take a nice walk",
    body: "Take a nice walk somewhere and breathe in the air!",
    coins: 10,
    icon: "task_walking_icon",
    message:
      "Congratulations on taking a walk. It's good to stay healthy and to get some exercise!",
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

const home = () => {
  const { user, setUser } = useContext(userContext);
  const { taskInfo, setTaskInfo } = useContext(tasksContext);
  const { shopItems, setShopItems } = useContext(ShopItemsContext);
  const [items, setItems] = useState(shopItems);
  const [showMessage, setShowMessage] = useState(false);
  const [showTaskMessage, setShowTaskMessage] = useState(false);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    setProgress((1 * taskInfo.tasksCompleted) / taskInfo.tasksTotal);
    setShowMessage(true);
  }, [user, taskInfo]);

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
            setShowTaskMessage(true);
            let timer1 = setTimeout(() => setShowTaskMessage(false), 3000);
            setUser(data);
            return () => {
              clearTimeout(timer1);
            };
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ScrollView>
      <View style={styles.home}>
        {/* <View style={styles.coinsContainer}>
          <Coins />
        </View> */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/images/home_background.svg")}
            resizeMode="cover"
            style={styles.backgroudImage}
          >
            <View style={styles.coinsContainer}>
              <Image
                source={require("../../assets/images/japanese_coins_1.svg")}
                style={styles.coinsImg}
              />
              <Text style={styles.coinText}>{user.balance}</Text>
            </View>
            {showMessage && (
              <View style={styles.homeMsgBox}>
                <FontAwesome6 name="circle-info" size={16} color="black" />
                <View style={styles.homeMsgTextBox}>
                  <Text style={styles.homeMsg}>
                    Complete your goals to rescue the MeGotchis...
                  </Text>
                </View>
              </View>
            )}
            {showTaskMessage && (
              <View style={styles.completedTaskMsgBox}>
                <FontAwesome6 name="circle-info" size={16} color="black" />
                <View style={styles.homeMsgTextBox}>
                  <Text style={styles.homeMsg}>
                    That's great {user.displayName}! Congratulations on
                    completing your goal...
                  </Text>
                </View>
              </View>
            )}

            {/* <View style={styles.meGotchiBox}>
              <Text style={styles.meGotchiName}>Henry</Text> */}
            <Image
              style={styles.backgrounMeGotchi}
              source={require("../../assets/images/megotchi_home_Avatar.svg")}
            />
            {/* </View> */}
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
            {shopItems[0].purchased && (
              <Image
                style={styles.backgrounMeGotchiOneShop}
                source={require("../../assets/images/shop_meGotchi_1.svg")}
              />
            )}
            {shopItems[1].purchased && (
              <Image
                style={styles.backgrounMeGotchiTwoShop}
                source={require("../../assets/images/shop_meGotchi_2.svg")}
              />
            )}
            {shopItems[2].purchased && (
              <Image
                style={styles.backgrounMeGotchiThreeShop}
                source={require("../../assets/images/shop_meGotchi_3.svg")}
              />
            )}
            {shopItems[3].purchased && (
              <Image
                style={styles.backgrounMeGotchiFourShop}
                source={require("../../assets/images/shop_meGotchi_4.svg")}
              />
            )}
          </ImageBackground>
        </View>
        <View style={styles.homeMain}>
          {showTaskMessage && (
            <ConfettiCannon
              count={400}
              origin={{ x: -10, y: 200 }}
              explosionSpeed={400}
              fallSpeed={2000}
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
          <View style={styles.infoContainer}>
            <Text style={styles.progressText}>
              Completed tasks {taskInfo.tasksCompleted}/{taskInfo.tasksTotal}
            </Text>
            <Progress.Bar
              progress={progress}
              width={294}
              height={12}
              borderColor="black"
              color="#00D2FF"
              borderWidth={2}
              borderRadius={8}
            />
          </View>
          <View style={styles.tasksContainer}>
            <View style={styles.tasksRemaingBox}>
              <FontAwesome6 name="circle-info" size={16} color="white" />
              <Text style={styles.tasksRemainingText}>
                You have {user.taskList.length} tasks remaining
              </Text>
            </View>
            <View style={styles.tasksListContainer}>
              <DailyTaskListHome
                tasks={user.taskList}
                handleDeletedTask={handleDeletedTask}
              />
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default home;

const styles = StyleSheet.create({
  modalView: {
    position: "relative",
    margin: 20,
    marginTop: "21.5rem",
    // backgroundColor: "#00D2FF",
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
    width: "100%",
    height: "5.6rem",
    margin: "auto",
    // boxShadow: "1px 1px 2px 0px #00D2FF",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTextBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  modalMsg: {
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    textAlign: "center",
  },
  home: {
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  imageContainer: {
    position: "relative",
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
  backgroudImage: {
    width: "100%",
    height: "100%",
  },

  completedTaskMsgBox: {
    width: "80%",
    height: "60px",
    backgroundColor: "white",
    marginLeft: "1rem",
    marginTop: "0.8rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "8rem",
    paddingLeft: "0.7rem",
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
  },

  homeMsgBox: {
    width: "64%",
    height: "40px",
    backgroundColor: "white",
    marginLeft: "1rem",
    marginTop: "0.8rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "8rem",
    paddingLeft: "0.7rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },

  homeMsgTextBox: {
    width: "80%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0.5rem",
  },

  homeMsg: {
    fontSize: "0.65rem",
    marginLeft: "0.5rem",

    fontFamily: "MarkoOne-regular",
    fontWeight: "bold",
    color: "#264653",
  },
  //Megotchis

  backgrounMeGotchi: {
    position: "absolute",
    top: "205px",
    left: "90px",
    width: "130px",
    height: "130px",
    boxShadow: "10px 10px 5px 0px #000",
  },
  backgrounMeGotchiOne: {
    width: "90px",
    height: "90px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "230px",
    left: "30px",
  },
  backgrounMeGotchiTwo: {
    width: "100px",
    height: "100px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "210px",
    left: "235px",
  },
  backgrounMeGotchiThree: {
    width: "80px",
    height: "80px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "230px",
    left: "180px",
    zIndex: "3",
  },
  backgrounMeGotchiOneShop: {
    width: "60px",
    height: "60px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "230px",
    left: "3px",
  },
  backgrounMeGotchiTwoShop: {
    width: "70px",
    height: "70px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "240px",
    left: "305px",
  },
  backgrounMeGotchiThreeShop: {
    width: "35px",
    height: "35px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "280px",
    left: "240px",
    zIndex: "3",
  },
  backgrounMeGotchiFourShop: {
    width: "36px",
    height: "36px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "278px",
    left: "90px",
    zIndex: "3",
  },

  homeMain: {
    width: "100%",
    minHeight: "50%",
    backgroundColor: "#706F6F",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  infoContainer: {
    width: "90%",
    height: "4rem",
    marginTop: "1.3rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: "12px",
  },
  progressText: {
    marginLeft: "0.65rem",
    fontFamily: "MarkoOne-regular",
    marginBottom: "0.3rem",
    color: "#264653",
    color: "white",
    fontSize: "0.7rem",
    marginRight: "auto",
    marginLeft: "1.5rem",
  },

  tasksContainer: {
    width: "90%",
    minHeight: "50%",
    backgroundColor: "#706F6F",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "0.5rem",
    marginBottom: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: "12px",
  },
  tasksRemaingBox: {
    width: "300px",
    height: "24px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingLeft: "0.5rem",
    marginTop: "0.8rem",
    marginBottom: "0.8rem",
  },
  tasksRemainingText: {
    marginLeft: "0.65rem",
    fontFamily: "MarkoOne-regular",

    color: "#264653",
    color: "white",
    fontSize: "0.75rem",
  },
  tasksListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "1rem",
    marginBottom: "1.5rem",
  },

  addTaskContainer: {
    height: "46px",
    width: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "1rem",

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
});
