import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import CustomButton from "../../reuseable-components/CustomButton";
import { Link, router } from "expo-router";
import userContext from "../(contexts)/userContext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(userContext);

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validSubmit, setvalidSubmit] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("Password is invalid");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleValidEmail(text) {
    const regex1 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regex1.test(text) || text === "") {
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
  }

  function handleValidPassword(text) {
    const containsUppercase = /^(?=.*[A-Z]).*$/;
    if (!containsUppercase.test(text)) {
      setCheckPassword(false);
      return setPasswordMessage("Must have an uppercase character");
    }
    const containsLowercase = /^(?=.*[a-z]).*$/;
    if (!containsLowercase.test(text)) {
      setCheckPassword(false);
      return setPasswordMessage("Must have a lowercase character");
    }

    const containsNumber = /^(?=.*[0-9]).*$/;
    if (!containsNumber.test(text)) {
      setCheckPassword(false);
      return setPasswordMessage("Must have at least one digit");
    }

    const containsSpecialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!containsSpecialCharacter.test(text)) {
      setCheckPassword(false);
      return setPasswordMessage("Must have at least one special character");
    }

    const validLength = /^.{8,20}$/;
    if (!validLength.test(text) || text === "") {
      setCheckPassword(false);
      return setPasswordMessage("Must be between 8-20 charcters");
    }
    setCheckPassword(true);
  }

  function checkValidSubmit(){
    if (checkPassword && checkEmail) {
      setvalidSubmit(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (checkPassword && checkEmail) {
        setIsLoading(true);
      const userSubmit = {
        email: form.email,
        password: form.password,
      };

      fetch("https://megotchi-api.onrender.com/users/signin", {
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
          console.error(data.error);
          alert(`Sign-in error: ${data.error}`);
        } else {
          setUser(data);
          router.push(data.taskList.length > 0 ? "/home" : "/wellness-main");
        }
      })
      .catch((error) => {
          console.error(error);
          alert(`Error: ${error}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert("Please enter valid email and password.");
    }
  }

  return (
    <SafeAreaView style={styles.signIn}>
      <Text style={styles.logoHeader}>MeGotchi</Text>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/images/megotchi_home_Avatar.svg")}
        />
      </View>
      <View style={styles.formField}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>Email</Text>
          <Text
            style={
              checkEmail
                ? styles.validationMsgTrue
                : (!checkEmail && form.email !== "") || validSubmit
                ? styles.validationMsgFalse
                : ""
            }
          >
            {checkEmail
              ? "Awesome"
              : (form.email !== "" && !emailFocus) || validSubmit
              ? `Email is invalid`
              : null}
            <Text style={styles.heart}>{checkEmail ? "❤" : null}</Text>
          </Text>
        </View>
        <View
          style={
            checkEmail
              ? styles.inputBoxValidated
              : (!checkEmail && form.email !== "" && !emailFocus) || validSubmit
              ? styles.inputBoxInvalidated
              : styles.inputBox
          }
        >
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email..."
            name="email"
            value={form.email}
            onChangeText={(e) => {
              setForm({ ...form, email: e });
              handleValidEmail(e);
            }}
            onFocus={() => {
              setEmailFocus(true);
              setvalidSubmit(false);
            }}
            onBlur={() => {
              setEmailFocus(false);
              checkValidSubmit();
            }}
          />
        </View>
      </View>
      <View style={styles.formField}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>Password</Text>
          <Text
            style={
              checkPassword
                ? styles.validationMsgTrue
                : (!checkPassword && form.password !== "") || validSubmit
                ? styles.validationMsgFalse
                : ""
            }
          >
            {checkPassword
              ? "Amazing"
              : (form.password !== "" && !passwordFocus) || validSubmit
              ? passwordMessage
              : null}
            <Text style={styles.heart}>{checkPassword ? "❤" : null}</Text>
          </Text>
        </View>
        <View
          style={
            checkPassword
              ? styles.inputBoxValidated
              : (!checkPassword && form.password !== "" && !passwordFocus) ||
                validSubmit
              ? styles.inputBoxInvalidated
              : styles.inputBox
          }
        >
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password..."
            name="password"
            value={form.password}
            onChangeText={(e) => {
              setForm({ ...form, password: e });
              handleValidPassword(e);
            }}
            onFocus={() => {
              setPasswordFocus(true);
              setvalidSubmit(false);
            }}
            onBlur={() => {
              setPasswordFocus(false);
              checkValidSubmit();
            }}
            secureTextEntry={!showPassword}
          />
          {
            <TouchableOpacity
              style={styles.eyeBox}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                style={styles.eyeOpen}
                source={
                  !showPassword
                    ? require("../../assets/icons/clarity_eye-hide-line.svg")
                    : require("../../assets/icons/eye_open_icon.svg")
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
          }
        </View>
      </View>
      <CustomButton
        styleName="btnSignIn"
        title={
          isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            "Submit"
          )
        }
        titleStyleName="homeTitle"
        handlePress={handleSubmit}
      />
      <View style={styles.messageBox}>
        <Text style={styles.signInMessage}>Don't have an account?</Text>
        <Link href="/sign-up" style={styles.signUpLink}>
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signIn: {
    display: "flex",
    width: "100%",
    height: " 100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginTop: "5rem",
  },
  logo: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    backgroundColor: "#FF6363",
    border: "6px solid black",
    marginTop: "3rem",
    marginBottom: "1.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "140px",
    height: "140px",
    boxShadow: "10px 10px 5px 0px #000",
    zIndex: "2",
  },
  formField: {
    width: "100%",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  labelBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
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
    color: "black",
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

  heart: {
    fontSize: "0.7rem",
    marginLeft: "0.3rem",
    color: "#FF6363",
  },

  inputBox: {
    width: "80%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "4px solid black",
    borderRadius: "8px",
    backgroundColor: "#959595",
    paddingLeft: "0.8rem",
    marginTop: "0.3rem",
    boxShadow: "1px 1px 1px 0px #959595",
  },
  textInput: {
    color: "white",
    fontSize: "0.6rem",
    fontFamily: "MarkoOne-regular",
    outlineStyle: "none",
  },

  eyeBox: {
    width: "40px",
    height: "30px",

    marginLeft: "auto",
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  eyeOpen: {
    width: "80%",
    height: "60%",
    color: "white",
    fontWeight: "bold",
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
  messageBox: {
    display: "flex",
    flexDirection: "row",
    width: "80%",

    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1.4rem",
  },
  signInMessage: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
  },

  signUpLink: {
    color: "#FF6363",
    fontWeight: "bold",
    fontSize: "0.8rem",
    fontFamily: "MarkoOne-regular",
  },
});
