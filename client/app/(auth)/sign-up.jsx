import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../reuseable-components/CustomButton";
import { Link, router } from "expo-router";

const SignUp = () => {
  const [reTypedPassword, setreTypedPassword] = useState("");

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [checkDisplayName, setcheckDisplayName] = useState(false);

  function handleValidDisplayName(text) {
    const validLength = /^.{3,}$/;
    if (!validLength.test(text)) {
      setcheckDisplayName(false);
    } else {
      setcheckDisplayName(true);
    }
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

      <CustomButton
        title="Submit"
        titleStyleName="homeTitle"
        styleName="btnSignIn"
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
});
