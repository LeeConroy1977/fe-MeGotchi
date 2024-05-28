import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native-web";
import Profiles from "../db/Images";

const ShopItemsCard = ({
  item,
  handleSelectedItem,
  index,
  handleIsSelected,
}) => {
  const { name, price, available, purchased, id } = item;

  return (
    <Pressable
      onPress={() => {
        handleSelectedItem(index), handleIsSelected(true);
      }}
      style={
        purchased
          ? styles.shopItemsCardPurchased
          : available
          ? styles.shopItemsCard
          : styles.shopItemsCardUnavailable
      }
    >
      {!available && !purchased && (
        <View style={styles.lockBox}>
          <Image
            style={styles.lock}
            source={require("../assets/images/shop_item_lock.svg")}
          />
        </View>
      )}
      {purchased ? (
        <View style={styles.purchasedMsgBox}>
          <Text style={styles.purchasedMsg}>Purchased</Text>
        </View>
      ) : !available ? (
        <View style={styles.unlockMsgBox}>
          <Text style={styles.unlockMsg}>Unlock</Text>
        </View>
      ) : null}

      <View style={styles.itemImageBox}>
        <Image style={styles.itemImage} source={Profiles[index].image_url} />
      </View>

      <Text
        style={
          purchased
            ? styles.itemNamePurchased
            : available
            ? styles.itemName
            : styles.itemNameUnavailable
        }
      >
        {name}
      </Text>
      <View style={styles.priceBox}>
        {purchased ? (
          <Text></Text>
        ) : (
          <>
            <Text style={styles.itemPrice}>Price: </Text>
            <Text style={available ? styles.priceAvailable : styles.price}>
              {price} Coins
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default ShopItemsCard;

const styles = StyleSheet.create({
  shopItemsCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    height: "44%",
    backgroundColor: "white",
    marginBottom: "1rem",
    boxShadow: "2px 2px 2px 0px black",
    marginTop: "0.4rem",
  },
  shopItemsCardPurchased: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    height: "44%",
    marginBottom: "1rem",
    boxShadow: "2px 2px 2px 0px black",
    marginTop: "0.4rem",
    backgroundColor: "#D3D3D3",
    opacity: "0.5",
  },
  shopItemsCardUnavailable: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    height: "44%",
    backgroundColor: "#F6E8EA",
    marginBottom: "1rem",
    opacity: "1",
    boxShadow: "2px 2px 2px 0px black",
    marginTop: "0.4rem",
  },

  purchasedMsgBox: {
    position: "absolute",
    backgroundColor: "#5FDD9D",
    width: "65%",
    height: "14%",
    top: "20%",
    marginTop: "4.85em",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "8px",
    boxShadow: "1px 1px 1px 0px #264653",
  },

  purchasedMsg: {
    color: "white",
    fontSize: "0.65rem",
    fontWeight: "bold",
    color: "#264653",
  },

  purchasedMsgBox: {
    position: "absolute",
    backgroundColor: "#264653",
    width: "65%",
    height: "14%",
    top: "20%",
    marginTop: "4.85em",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "1px 1px 1px 0px #264653",
  },

  purchasedMsg: {
    color: "white",
    fontSize: "0.65rem",
    fontWeight: "bold",
    backgroundColor: "#264653",
  },
  unlockMsgBox: {
    position: "absolute",
    backgroundColor: "#264653",

    width: "65%",
    height: "14%",
    top: "20%",
    marginTop: "4.85em",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "1px 1px 1px 0px #264653",
  },
  unlockMsg: {
    color: "white",
    fontSize: "0.65rem",
    fontWeight: "bold",
    color: "white",
  },

  lockBox: {
    position: "absolute",
    height: "30%",
    width: "30%",
    top: "1px",
    left: "0px",
    zIndex: 5,
    opacity: 1,
  },

  lock: {
    width: "50px",
    height: "50px",
    opacity: "1",
  },

  itemImageBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  itemImage: {
    width: "60px",
    height: "60px",
  },

  itemName: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "23px",
    borderTopWidth: "0px",
    fontSize: "0.65rem",
    fontWeight: "bold",
    backgroundColor: "#00D2FF",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    boxShadow: "1px 1px 2px 0px black",
  },
  itemNamePurchased: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "23px",
    borderTopWidth: "0px",
    fontSize: "0.65rem",
    fontWeight: "bold",
    backgroundColor: "#264653",
    color: "white",
    borderRadius: "12px 12px 0px 0px",
    fontFamily: "MarkoOne-regular",
    boxShadow: "1px 1px 2px 0px black",
  },
  itemNameUnavailable: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "23px",
    fontSize: "0.65rem",
    fontWeight: "bold",
    backgroundColor: "#00D2FF",
    color: "black",
    borderRadius: "12px 12px 0px 0px",
    boxShadow: "1px 1px 2px 0px black",
    fontFamily: "MarkoOne-regular",
  },
  priceBox: {
    position: "absolute",
    bottom: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    height: "30px",
  },
  itemPrice: {
    fontSize: "0.65rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
  },
  price: {
    fontSize: "0.65rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
  },
  priceAvailable: {
    fontSize: "0.65rem",
    fontWeight: "bold",
    fontFamily: "MarkoOne-regular",
    color: "#0EAD69",
  },
});
