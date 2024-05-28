import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { ActivityIndicator, SafeAreaView, TextInput } from "react-native-web";
import CustomButton from "../../reuseable-components/CustomButton";
import MeGotchi from "../../reuseable-components/MeGotchi";
import { useLocalSearchParams } from "expo-router";
import userContext from "../(contexts)/userContext";
import { router } from "expo-router";

const meGotchiArr = [
  {
    id: 1,
    colour: "#DFE6FF",
  },
  {
    id: 2,
    colour: "#C99FFF",
  },
  {
    id: 3,
    colour: "#FFABF7",
  },
  {
    id: 4,
    colour: "#90A9FF",
  },
  {
    id: 5,
    colour: "#FAFFBC",
  },
  {
    id: 6,
    colour: "#BBFFFF",
  },
];

const Character = () => {
  const [selected, setSelected] = useState(null);
  const { displayName, email, password } = useLocalSearchParams();
  const { setUser } = useContext(userContext);
  const [name, setName] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelected = (id) => {
    setSelected(id);
  };

  function handleValidation(e) {
    if (e === "" || (e === "" && isBlur)) {
      return setIsValidated(false);
    }
    if (e !== "") {
      return setIsValidated(true);
    }
  }

  console.log(name);
  console.log(selected);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setIsValidated(false);
      setIsBlur(true);
    }
    if (selected === null || selected === false) {
      setSelected(false);
    } else if (
      (selected !== null && isValidated) ||
      (selected !== false && isValidated)
    ) {
      setIsLoading(true);
      const userSubmit = {
        displayName: displayName,
        email: email,
        password: password,
        megotchi: {
          color: selected.colour,
          name,
        },
      };

      fetch("https://megotchi-api.onrender.com/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSubmit),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            alert(`Sign-up error: ${data.error}`);
          } else {
            setUser(data);
            router.push("/wellness");
          }
        })
        .catch((error) => {
          alert("Error creating user");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setName("");
  };

  return (
    <SafeAreaView style={styles.character}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoHeader}>MeGotchi</Text>
        <Text style={styles.tradeMark}>&trade;</Text>
      </View>
      <View style={styles.pageMsgBox}>
        <Text style={styles.pageMessage}>Adopt a MeGotchi...</Text>
        {selected === null ? null : selected === false ? (
          <Text style={styles.pageMessageInvalid}>Choose a MeGotchi...</Text>
        ) : (
          <View style={styles.validMsgBox}>
            <Text style={styles.pageMessageValid}>Amazing</Text>
            <Text style={styles.heart}>{"❤"}</Text>
          </View>
        )}
      </View>
      <View style={styles.avatarsContainer}>
        {meGotchiArr.map((meGotchi, index) => {
          return (
            <MeGotchi
              avatarBox="selectAvatarBox"
              avatarImage="selectAvatarImage"
              key={meGotchi.id}
              handlePress={() => handleSelected(meGotchi)}
              isSelected={selected === meGotchi}
              index={index}
            />
          );
        })}
      </View>
      <View style={styles.inputBox}>
        <View style={styles.textBox}>
          <Text style={styles.inputQuestion}>What's my name?</Text>
          {!isValidated && isBlur ? (
            <Text style={styles.inputinValidMsg}>Should not be empty</Text>
          ) : isValidated ? (
            <View style={styles.validMsgBox}>
              <Text style={styles.inputValidMsg}>Awesome</Text>
              <Text style={styles.heart}>{"❤"}</Text>
            </View>
          ) : null}
        </View>

        <TextInput
          style={
            !isValidated && isBlur
              ? styles.textInputInvalid
              : isValidated
              ? styles.textInputValid
              : styles.textInput
          }
          value={name}
          placeholder={"Enter a name..."}
          onBlur={() => setIsBlur((isBlur) => !isBlur)}
          onChangeText={(e) => {
            setName(e);
            handleValidation(e);
          }}
        />
      </View>
      <CustomButton
        title={isLoading ? <ActivityIndicator color="#FFF" /> : "Submit"}
        titleStyleName="homeTitle"
        styleName="btnSignIn"
        handlePress={handleSubmit}
      />
    </SafeAreaView>
  );
};
export default Character;

const styles = StyleSheet.create({
  character: {
    display: "flex",
    width: "100%",
    height: " 100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2.1rem",
    width: "50%",
  },

  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.2rem",
  },

  tradeMark: {
    marginLeft: "0.2rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  pageMsgBox: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
  },
  pageMessage: {
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    fontSize: "0.85rem",
    marginLeft: "0.3rem",
  },
  pageMessageValid: {
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    fontSize: "0.75rem",
    marginRight: "0.2rem",
  },

  pageMessageInvalid: {
    fontWeight: "bold",
    color: "red",
    fontFamily: "MarkoOne-regular",
    fontSize: "0.75rem",
    marginRight: "0.2.5rem",
  },
  avatarsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "0.8rem",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: "33%",
  },

  inputBox: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "10%",

    marginTop: "3.5rem",
    marginBottom: "1rem",
  },

  textBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "15%",
  },
  inputQuestion: {
    color: "#264653",
    fontWeight: "bold",
    fontSize: "0.85rem",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.3rem",
  },
  inputValidMsg: {
    color: "#264653",
    fontWeight: "bold",
    fontSize: "0.75rem",
    fontFamily: "MarkoOne-regular",
    marginRight: "0.2rem",
  },
  validMsgBox: {
    width: "40%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "0.2rem",
  },

  inputinValidMsg: {
    color: "red",
    fontWeight: "bold",
    fontSize: "0.75rem",
    fontFamily: "MarkoOne-regular",
    marginRight: "0.3rem",
  },
  heart: {
    fontSize: "0.7rem",
    marginLeft: "0.3rem",
    color: "#FF6363",
    marginRight: "0.3rem",
  },
  textInput: {
    color: "white",
    fontSize: "0.6rem",
    fontFamily: "MarkoOne-regular",
    outlineStyle: "none",
    marginTop: "0.8rem",
    border: "3px solid black",
    width: "100%",
    height: "80%",
    borderRadius: "12px",
    paddingLeft: "0.8rem",
    fontWeight: "bold",
    fontSize: "0.7rem",
    fontFamily: "MarkoOne-regular",
    backgroundColor: "#959595",
  },
  textInputInvalid: {
    color: "white",
    fontSize: "0.6rem",
    fontFamily: "MarkoOne-regular",
    outlineStyle: "none",
    marginTop: "0.8rem",
    border: "3px solid red",
    width: "100%",
    height: "80%",
    borderRadius: "12px",
    paddingLeft: "0.8rem",
    fontWeight: "bold",
    fontSize: "0.7rem",
    fontFamily: "MarkoOne-regular",
    backgroundColor: "#959595",
  },
  textInputValid: {
    color: "white",
    fontSize: "0.6rem",
    fontFamily: "MarkoOne-regular",
    outlineStyle: "none",
    marginTop: "0.8rem",
    border: "3px solid green",
    width: "100%",
    height: "80%",
    borderRadius: "12px",
    paddingLeft: "0.8rem",
    fontWeight: "bold",
    fontSize: "0.7rem",
    fontFamily: "MarkoOne-regular",
    backgroundColor: "#959595",
  },
  inputBoxValidated: {
    width: "80%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "4px solid #339933",
    borderRadius: "8px",
    backgroundColor: "#a6a6a6",
    paddingLeft: "0.8rem",
    marginTop: "0.3rem",
  },
  inputBoxInvalidated: {
    width: "80%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "4px solid #FF6363",
    borderRadius: "8px",
    backgroundColor: "#a6a6a6",
    paddingLeft: "0.8rem",
    marginTop: "0.3rem",
  },
  label: {
    fontSize: "0.6rem",
    fontWeight: "bold",
    color: "black",
    marginTop: "0.5rem",
    marginRight: "auto",
    marginLeft: "2rem",
    fontFamily: "MarkoOne-regular",
  },

  validationMsgTrue: {
    fontSize: "0.6rem",
    fontWeight: "bold",
    color: "#264653",
    marginTop: "0.5rem",
    fontFamily: "MarkoOne-regular",
    marginRight: "2rem",
  },
  validationMsgFalse: {
    fontSize: "0.6rem",
    fontWeight: "bold",
    color: "red",
    marginTop: "0.5rem",
    fontFamily: "MarkoOne-regular",
    marginRight: "2rem",
  },
});
