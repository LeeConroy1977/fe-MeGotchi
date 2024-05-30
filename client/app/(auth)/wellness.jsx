import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import megotchiPic from "../../assets/images/megotchi_home_Avatar.svg";
import { router } from "expo-router";
import WelcomePage from "../../components/WelcomePage";
import dailyTasks from "../../assets/Data/dailyTasks";
import userContext from "../(contexts)/userContext";
import tasksContext from "../(contexts)/tasksContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../../reuseable-components/CustomButton";

const WellnessCheck = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { taskInfo, setTaskInfo } = useContext(tasksContext);
  const { user, setUser } = useContext(userContext);

  const options = [
    { id: 1, text: "I'm feeling great", emoji: "😃" },
    { id: 2, text: "I'm okay", emoji: "😐" },
    { id: 3, text: "Not too good", emoji: "😟" },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  const handleNextPress = () => {
    if (selectedOption !== null) {
      setIsLoading(true);
      const sentList = {
        isDelete: false,
        taskList: [],
      };

      if (selectedOption === 1) sentList.taskList = dailyTasks.setHappy;
      else if (selectedOption === 2) sentList.taskList = dailyTasks.setNeutral;
      else if (selectedOption === 3) sentList.taskList = dailyTasks.setSad;

      fetch(`https://megotchi-api.onrender.com/users/${user._id}/tasks`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentList),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            alert(`Sign-up error: ${data.error}`);
          }
          setUser(data);
          setTaskInfo({ tasksCompleted: 0, tasksTotal: data.taskList.length });
          router.push("/home");
        })
        .catch((error) => {
          return { message: error };
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      {showWelcomePage ? (
        <WelcomePage setShowWelcomePage={setShowWelcomePage} />
      ) : (
        <>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.backgroundImage}
              source={require("../../assets/images/wellness_background.svg")}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.logoHeader}>MeGotchi</Text>
                <Text style={styles.tradeMark}>&trade;</Text>
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

              <Image
                style={styles.backgrounMeGotchiOneShop}
                source={require("../../assets/images/shop_meGotchi_1.svg")}
              />

              <Image
                style={styles.backgrounMeGotchiTwoShop}
                source={require("../../assets/images/shop_meGotchi_2.svg")}
              />

              <Image
                style={styles.backgrounMeGotchiThreeShop}
                source={require("../../assets/images/shop_meGotchi_3.svg")}
              />

              <Image
                style={styles.backgrounMeGotchiFourShop}
                source={require("../../assets/images/shop_meGotchi_4.svg")}
              />

              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>
                  How are you feeling today {user.displayName}?
                </Text>
              </View>
              <View style={styles.responseList}>
                {options.map((option) => {
                  return (
                    <Pressable
                      style={
                        selectedOption === option.id
                          ? styles.optionContainerSelected
                          : styles.optionContainer
                      }
                      onPress={() => handleOptionSelect(option.id)}
                      key={option.id}
                    >
                      <View style={styles.emoji}>{option.emoji}</View>
                      <Text style={styles.optionText}>{option.text}</Text>
                      {selectedOption === option.id && (
                        <View style={styles.checkIcon}>
                          <FontAwesome name="check" size={16} color="green" />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
              {/* <Pressable style={styles.linkContainer}>
                <Text style={styles.linkText}>Contintue to quest</Text>
                <AntDesign name="caretright" size={18} color="#264653" />
              </Pressable> */}
              <CustomButton
                styleName="btnWellness"
                title={
                  isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    "Continue"
                  )
                }
                titleStyleName="wellnessTitle"
                handlePress={handleNextPress}
                // route={"/quest"}
              />
            </ImageBackground>
          </View>
        </>
      )}
    </View>
  );
};

export default WellnessCheck;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  imageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.5rem",
    width: "100%",
  },

  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.5rem",
  },

  tradeMark: {
    marginLeft: "0.2rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },

  // megotchis

  backgrounMeGotchi: {
    position: "absolute",
    top: "180px",
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
    top: "210px",
    left: "30px",
  },
  backgrounMeGotchiTwo: {
    width: "100px",
    height: "100px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "190px",
    left: "235px",
  },
  backgrounMeGotchiThree: {
    width: "80px",
    height: "80px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "210px",
    left: "180px",
    zIndex: "3",
  },
  backgrounMeGotchiOneShop: {
    width: "60px",
    height: "60px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "210px",
    left: "3px",
  },
  backgrounMeGotchiTwoShop: {
    width: "70px",
    height: "70px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "220px",
    left: "305px",
  },
  backgrounMeGotchiThreeShop: {
    width: "35px",
    height: "35px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "260px",
    left: "240px",
    zIndex: "3",
  },
  backgrounMeGotchiFourShop: {
    width: "36px",
    height: "36px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    top: "258px",
    left: "90px",
    zIndex: "3",
  },

  questionContainer: {
    width: "80%",
    height: "20px",
    top: "16.5rem",
  },
  questionText: {
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "MarkoOne-Regular",
    // fontWeight: "bold",
    marginLeft: "0.2rem",
  },

  responseList: {
    width: "80%",
    height: "30%",

    marginTop: "18rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "1.2rem",
  },

  optionContainerSelected: {
    width: "100%",
    height: "48px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "22px",
    boxShadow: "2px 2px 1px 0px #383838",
  },

  optionContainer: {
    width: "100%",
    height: "48px",
    backgroundColor: "#C8C8C8",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: "22px",
    boxShadow: "2px 2px 1px 0px #383838",
  },

  emoji: {
    fontSize: "1.4rem",
    marginLeft: "0.8rem",
  },

  optionText: {
    color: "#264653",
    fontSize: "0.8rem",
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    marginLeft: "1rem",
  },
  checkIcon: {
    marginLeft: "auto",
    marginRight: "1rem",
    width: "26px",
    height: "26px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "2px solid #264653",
  },

  linkContainer: {
    // width: "40%",
    // height: "30px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: "1rem",
    backgroundColor: "white",
    padding: "0.4rem",
  },
  linkText: {
    color: "#264653",
    fontSize: "0.8rem",
    fontFamily: "MarkoOne-Regular",
    // fontWeight: "bold",
    marginRight: "0.5rem",
  },

  // question: {
  //   fontSize: 16,
  //   marginBottom: 20,
  //   fontFamily: "MarkoOne-Regular",
  // },
  // optionsContainer: {
  //   width: "100%",
  // },
  // optionButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   border: "4px solid black",
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 10,
  // },
  // emoji: {
  //   fontSize: 24,
  //   marginRight: 10,
  // },
  // optionText: {
  //   fontSize: 18,
  //   flex: 1,
  //   fontFamily: "MarkoOne-Regular",
  // },
  // checkIcon: {
  //   marginLeft: 10,
  // },
  // nextButton: {
  //   padding: 15,
  //   borderRadius: 10,
  // },
  // nextButtonText: {
  //   color: "white",
  //   fontSize: 18,
  //   fontFamily: "MarkoOne-Regular",
  // },
});
