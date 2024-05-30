import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { Tabs, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const TabsLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/icons8-home-50.png")}
              style={styles.icon}
            />
          ),
          tabBarIconStyle: {
            height: "40px",
            width: "40px",
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="daily-quest"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/icons8-book-50.png")}
              style={styles.icon}
            />
          ),
          tabBarIconStyle: {
            height: "40px",
            width: "40px",
          },
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/icons8-task-50.png")}
              style={styles.icon}
            />
          ),
          tabBarIconStyle: {
            height: "40px",
            width: "40px",
          },
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/icons8-shop-50.png")}
              style={styles.icon}
            />
          ),
          tabBarIconStyle: {
            height: "40px",
            width: "40px",
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  icon: {
    height: "25px",
    width: "25px",
  },
});
