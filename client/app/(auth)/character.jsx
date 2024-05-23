import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-web";
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
  const {displayName, email, password} = useLocalSearchParams();
  const { setUser } = useContext(userContext);

  const handleSelected = (id) => {
    setSelected(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(selected !== null){

      const userSubmit = {
        "displayName": displayName,
        "email": email,
        "password": password,
        "megotchi": {
          "color": selected.colour
        }
      };
  
      fetch('https://megotchi-api.onrender.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userSubmit),
      })
      .then(response => response.json())
      .then(json => {
        //set user context
        
        setUser(json)
        //route to /home
        router.push("/wellness");
      })
      .catch(error => {
        return { "message": error};
      });

    }
  }

  return (
    <SafeAreaView style={styles.character}>
      <Text style={styles.logoHeader}>MeGotchi</Text>
      <Text style={styles.pageMessage}>Adopt a MeGotchi...</Text>
      <View style={styles.avatarsContainer}>
        {meGotchiArr.map((meGotchi) => {
          return (
            <MeGotchi
              avatarBox="selectAvatarBox"
              avatarImage="selectAvatarImage"
              key={meGotchi.id}
              handlePress={() => handleSelected(meGotchi)}
              isSelected={selected === meGotchi}
            />
          );
        })}
      </View>
      <CustomButton
        title="Submit"
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
  logoHeader: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    marginTop: "2.3rem",
  },
  pageMessage: {
    fontWeight: "bold",
    marginTop: "2rem",
    marginRight: "auto",
    marginLeft: "2rem",
  },
  avatarsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "0.8rem",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: "54%",
  },
});
