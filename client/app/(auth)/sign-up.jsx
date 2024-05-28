import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../reuseable-components/CustomButton";
import { Link, router } from "expo-router";

const SignUp = () => {
  const [reTypedPassword, setRetypedPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [retypePasswordFocus, setRetypePasswordFocus] = useState(false);
  const [showRetypedPassword, setShowRetypedPassword] = useState(false);

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [checkDisplayName, setcheckDisplayName] = useState(false);
  const [displayNameFocus, setDisplayNameFocus] = useState(false);

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("Password is invalid");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (form.password === reTypedPassword && checkPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [reTypedPassword, form.password]);

  function handleValidDisplayName(text) {
    const validLength = /^.{3,}$/;
    if (!validLength.test(text)) {
      setcheckDisplayName(false);
    } else {
      setcheckDisplayName(true);
    }
  }

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

 function checkValidSubmit() {
    if (
      checkEmail &&
      checkPassword &&
      checkDisplayName &&
      passwordMatch
    ) {
      setIsLoading(true);
      setValidSubmit(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validSubmit) {

      router.push({
        pathname: "/character",
        params: {
          displayName: form.displayName,
          email: form.email,
          password: form.password,
        },
      });
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.signUp}>
      <Text style={styles.logoHeader}>MeGotchi</Text>
      <View style={styles.logoBox}>
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            source={require("../../assets/images/megotchi_home_Avatar.svg")}
          />
        </View>
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            source={require("../../assets/images/megotchi_home_Avatar.svg")}
          />
        </View>
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            source={require("../../assets/images/megotchi_home_Avatar.svg")}
          />
        </View>
      </View>
      <View style={styles.accountMessageBox}>
        <Text style={styles.accountMessage}>Create an account...</Text>
      </View>
      <View style={styles.formField}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>Username</Text>
          <Text
            style={
              checkDisplayName
                ? styles.validationMsgTrue
                : (!checkDisplayName && form.displayName !== "") || validSubmit
                ? styles.validationMsgFalse
                : ""
            }
          >
            {checkDisplayName
              ? "Awesome"
              : (form.displayName !== "" && !displayNameFocus) || validSubmit
              ? `Username is invalid`
              : null}
            <Text style={styles.heart}>{checkDisplayName ? "❤" : null}</Text>
          </Text>
        </View>
        <View
          style={
            checkDisplayName
              ? styles.inputBoxValidated
              : (!checkDisplayName &&
                  form.displayName !== "" &&
                  !displayNameFocus) ||
                validSubmit
              ? styles.inputBoxInvalidated
              : styles.inputBox
          }
        >
          <TextInput
            style={styles.textInput}
            placeholder="Enter username..."
            name="displayName"
            value={form.displayName}
            onChangeText={(e) => {
              setForm({ ...form, displayName: e });
              handleValidDisplayName(e);
            }}
            onFocus={() => {
              setDisplayNameFocus(true);
              setValidSubmit(false);
            }}
            onBlur={() => {
              setDisplayNameFocus(false);
              checkValidSubmit();
            }}
          />
        </View>
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
            placeholder="Enter email..."
            name="email"
            value={form.email}
            onChangeText={(e) => {
              setForm({ ...form, email: e });
              handleValidEmail(e);
            }}
            onFocus={() => {
              setEmailFocus(true);
              setValidSubmit(false);
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
            placeholder="Enter password..."
            name="password"
            value={form.password}
            onChangeText={(e) => {
              setForm({ ...form, password: e });
              handleValidPassword(e);
            }}
            onFocus={() => {
              setPasswordFocus(true);
              setValidSubmit(false);
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
      <View style={styles.formField}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>Retype password</Text>
          <Text
            style={
              passwordMatch
                ? styles.validationMsgTrue
                : (!passwordMatch && reTypedPassword !== "") || validSubmit
                ? styles.validationMsgFalse
                : ""
            }
          >
            {passwordMatch
              ? "Ace"
              : (reTypedPassword !== "" && !retypePasswordFocus) || validSubmit
              ? "password does not match"
              : null}
            <Text style={styles.heart}>{passwordMatch ? "❤" : null}</Text>
          </Text>
        </View>
        <View
          style={
            passwordMatch
              ? styles.inputBoxValidated
              : (!passwordMatch &&
                  reTypedPassword !== "" &&
                  !retypePasswordFocus) ||
                validSubmit
              ? styles.inputBoxInvalidated
              : styles.inputBox
          }
        >
          <TextInput
            style={styles.textInput}
            placeholder="Retype password..."
            name="retypePassword"
            value={reTypedPassword}
            onChangeText={(e) => {
              setRetypedPassword(e);
            }}
            onFocus={() => {
              setRetypePasswordFocus(true);
              setValidSubmit(false);
            }}
            onBlur={() => {
              setRetypePasswordFocus(false);
              checkValidSubmit();
            }}
            secureTextEntry={!showRetypedPassword}
          />
          {
            <TouchableOpacity
              style={styles.eyeBox}
              onPress={() => setShowRetypedPassword(!showRetypedPassword)}
            >
              <Image
                style={styles.eyeOpen}
                source={
                  !showRetypedPassword
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
        title={
          isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            "Submit"
          )
        }
        titleStyleName="homeTitle"
        styleName="btnSignIn"
        handlePress={handleSubmit}
      />
      <View style={styles.messageBox}>
        <Text style={styles.signUpMessage}>Already have an account?</Text>
        <Link href="/sign-in" style={styles.signUpLink}>
          Sign In
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUp: {
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
    marginTop: "2.3rem",
  },

  logoBox: {
    width: "80%",
    height: "12%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.92rem",
    // backgroundColor: "gray",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "#FF6363",
    border: "4px solid black",
    marginTop: "1.5rem",
    marginBottom: "1.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "60px",
    height: "60px",
    boxShadow: "10px 10px 5px 0px #000",
    zIndex: "2",
  },
  accountMessageBox: {
    width: "80%",
    display: "flex",
    marginTop: "1.4rem",
    marginBottom: "0.4rem",
  },

  accountMessage: {
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
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
  signUpMessage: {
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
});
