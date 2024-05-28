import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import userContext from "./(contexts)/userContext";
import tasksContext from "./(contexts)/tasksContext";
// import shopItemsContext from "./(contexts)/userContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "MarkoOne-Regular": require("../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const [user, setUser] = useState(false);
  const [taskInfo, setTaskInfo] = useState(false);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <userContext.Provider value={{ user, setUser }}>
        <tasksContext.Provider value={{ taskInfo, setTaskInfo }}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack>
        </tasksContext.Provider>
    </userContext.Provider>
  );
};

export default RootLayout;
