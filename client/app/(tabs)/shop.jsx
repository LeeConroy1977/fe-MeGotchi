import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ImageBackground, Modal, ScrollView } from "react-native-web";
import React, { useContext, useEffect, useState } from "react";
import ShopItemsList from "../../components/shopItemsList";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Profiles from "../../db/Images";
import ConfettiCannon from "react-native-confetti-cannon";
import { router } from "expo-router";
import { ShopItemsContext } from "../(contexts)/shopItemsContext";
import userContext from "../(contexts)/userContext";

const shop = () => {
  const { user, setUser } = useContext(userContext);
  const { shopItems, setShopItems } = useContext(ShopItemsContext);
  
  const [selectedItem, setSelectedItem] = useState(shopItems[0]);
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isPurchasedModalOpen, setisPurchasedModalOpen] = useState(false);
  const [isShopMessageModalOpen, setisShopMessageModalOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemsCompleted, setItemsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setSelectedItem(shopItems[itemIndex]);
    setSelectedImage(Profiles[itemIndex].image_url);
    handleItemsCompleted();
    setIsLoading(false);
    setShopItems(() =>
      shopItems.map((item) => {
        return user.balance >= item.price ? { ...item, available: true } : item;
      })
    );
  }, [itemIndex, user, itemsCompleted, isModalOpen, isPurchasedModalOpen]);

  function handleSelectedItem(index) {
    setItemIndex(index);
    setSelectedItem(shopItems[index]);
    setisModalOpen((isModalOpen) => !isModalOpen);
    setSelectedImage(Profiles[itemIndex].image_url);
  }
  
  function handleIsSelected() {
    setIsSelected(true);
  }

  function handlePurchaseItem(index) {
    const moneyIncrement = { balance :-shopItems[index].price };
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
      setShopItems((items) =>
        items.map((item) => {
          return item.id - 1 === index ? { ...item, purchased: true } : item;
        })
      );
      setUser(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function handleItemsCompleted() {
    let count = 0;
    shopItems.map((item) => {
      if (item.purchased === true) {
        count++;
      }
    });

    if (count === shopItems.length) {
      setisShopMessageModalOpen(true);
      return setItemsCompleted(true);
    }
  }
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View
      style={
        isPurchasedModalOpen
          ? styles.shopModalCelebration
          : isModalOpen
          ? styles.shopModalOpen
          : styles.shop
      }
    >
      {shopItems && (
        <>
          {itemsCompleted && !isModalOpen && !isPurchasedModalOpen && (
            <Modal
              style={styles.modal}
              animationType="fade"
              transparent={true}
              visible={isShopMessageModalOpen}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setisShopMessageModalOpen(!isShopMessageModalOpen);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.itemView}>
                    <View style={styles.itemContainerMessage}>
                      <View style={styles.closeIcon}>
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color="white"
                          onPress={() =>
                            setisShopMessageModalOpen(!isShopMessageModalOpen)
                          }
                        />
                      </View>
                      <View style={styles.shopMessageBox}>
                        <Text style={styles.shopMessage}>
                          You have completed your daily goals and bought back
                          the MeGotchis but I'll be out again soon to catch some
                          more...
                        </Text>
                      </View>
                      <Pressable
                        style={styles.returnBtnCelebration}
                        onPress={() => {
                          setisShopMessageModalOpen(!isShopMessageModalOpen);
                          router.replace("/home");
                        }}
                      >
                        <AntDesign
                          name="pluscircleo"
                          size={24}
                          color="white"
                          style={styles.plusIcon}
                        />
                        <Text style={styles.returnShopMessage}>
                          Return to Home
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          {!isPurchasedModalOpen && isSelected && (
            <Modal
              style={styles.modal}
              animationType="fade"
              transparent={true}
              visible={isModalOpen}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setisModalOpen(!isModalOpen);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.itemView}>
                    <View style={styles.itemContainer}>
                      <View style={styles.closeIcon}>
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color="black"
                          onPress={() =>
                            setisModalOpen((isModalOpen) => !isModalOpen)
                          }
                        />
                      </View>
                      <View
                        style={
                          selectedItem.purchased
                            ? styles.itemImageBoxPurchasedModal
                            : styles.itemImageBoxModal
                        }
                      >
                        <Image
                          style={styles.itemImageModal}
                          source={selectedImage}
                        />
                        <Text style={styles.itemNameModal}>
                          {selectedItem.name}
                        </Text>
                      </View>
                      <View style={styles.itemDescriptionModalBox}>
                        {selectedItem.purchased ? (
                          <Text
                            style={
                              selectedItem.purchased
                                ? styles.itemDescriptionPurchasedModal
                                : styles.itemDescriptionModal
                            }
                          >
                            {selectedItem.purchasedMsg}{" "}
                          </Text>
                        ) : !selectedItem.purchased &&
                          !selectedItem.available ? (
                          <>
                            <View style={styles.lockBox}>
                              <Image
                                style={styles.lock}
                                source={require("../../assets/images/shop_item_lock.svg")}
                              />
                            </View>
                          </>
                        ) : (
                          <>
                            <Text style={styles.itemDescriptionModal}>
                              {selectedItem.description}
                            </Text>
                          </>
                        )}
                      </View>
                      <View style={styles.purchaseBoxModal}>
                        <View style={styles.previousBtnBoxModal}>
                          {itemIndex > 0 && (
                            <Foundation
                              name="previous"
                              size={24}
                              color="#264653"
                              onPress={() =>
                                setItemIndex((itemIndex) => itemIndex - 1)
                              }
                            />
                          )}
                        </View>

                        {selectedItem.purchased ? (
                          <View style={styles.purchasedBtnTextBoxModal}>
                            <View style={styles.tickIconModal}>
                              <MaterialIcons
                                name="done-outline"
                                size={14}
                                color="green"
                              />
                            </View>
                            <Text style={styles.purchasedBtnTextModal}>
                              Purchased
                            </Text>
                          </View>
                        ) : (
                          <>
                            {!selectedItem.available &&
                            !selectedItem.purchased ? (
                              <View style={styles.unlockMsgBox}>
                                <Text style={styles.unlockMsg}>
                                  Unlock {selectedItem.name}
                                </Text>
                              </View>
                            ) : (
                              <Pressable
                                style={styles.purchaseBtnModal}
                                onPress={() => {
                                  handleItemsCompleted();
                                  setisPurchasedModalOpen(
                                    (isPurchasedModalOpen) =>
                                      !isPurchasedModalOpen
                                  );
                                  handlePurchaseItem(itemIndex);
                                }}
                              >
                                <Text style={styles.purchaseBtnTextModal}>
                                  Free {selectedItem.name}
                                </Text>
                              </Pressable>
                            )}
                          </>
                        )}

                        <View style={styles.nextBtnBoxModal}>
                          {itemIndex < shopItems.length - 1 && (
                            <Foundation
                              name="next"
                              size={24}
                              color="#264653"
                              onPress={() => {
                                setItemIndex((itemIndex) => itemIndex + 1);
                              }}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          {/* sd */}

          {/*  */}

          {/* sd */}

          {/*  */}

          {/* sd */}

          {/*  */}
          <Modal
            style={styles.modalCelebration}
            animationType="slide"
            transparent={true}
            visible={isPurchasedModalOpen}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setisPurchasedModalOpen(!isPurchasedModalOpen);
            }}
          >
            <View style={styles.centeredViewCelebration}>
              <View style={styles.modalViewCelebration}>
                <View style={styles.celebrationBackgroundBox}>
                  <ImageBackground
                    style={styles.celebrationBackgroundImage}
                    source={require("../../assets/images/village_background.svg")}
                    resizeMode="cover"
                  >
                    <Image
                      style={styles.backgrounMeGotchiCelebration}
                      source={require("../../assets/images/celebration_meGotchi.svg")}
                    />

                    <Image
                      style={styles.backgrounMeGotchiOneCelebration}
                      source={require("../../assets/images/celebration_meGotchi_1.svg")}
                    />
                    <Image
                      style={styles.backgrounMeGotchiTwoCelebration}
                      source={require("../../assets/images/celebration_meGotchi_2.svg")}
                    />
                    <Image
                      style={styles.backgrounMeGotchiThreeCelebration}
                      source={require("../../assets/images/celebration_meGotchi_3.svg")}
                    />
                    {shopItems[0].purchased && (
                      <Image
                        style={styles.shopMeGotchiOneCelebration}
                        source={require("../../assets/images/celebration_shop_meGotchi_1.svg")}
                      />
                    )}
                    {shopItems[1].purchased && (
                      <Image
                        style={styles.shopMeGotchiTwoCelebration}
                        source={require("../../assets/images/celebration_shop_meGotchi_2.svg")}
                      />
                    )}
                    {shopItems[2].purchased && (
                      <Image
                        style={styles.shopMeGotchiThreeCelebration}
                        source={require("../../assets/images/celebration_shop_meGotchi_3.svg")}
                      />
                    )}
                    {shopItems[3].purchased && (
                      <Image
                        style={styles.shopMeGotchiFourCelebration}
                        source={require("../../assets/images/celebration_shop_meGotchi_4.svg")}
                      />
                    )}
                  </ImageBackground>
                </View>
                <View style={styles.mainCelebrationContainer}>
                  {isPurchasedModalOpen && (
                    <ConfettiCannon
                      count={400}
                      origin={{ x: -10, y: 200 }}
                      explosionSpeed={400}
                      fallSpeed={3000}
                      fadeOut={true}
                      autoStartDelay={200}
                      zIndex={2}
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
                  <View style={styles.celebrationMsgBox}>
                    <Text style={styles.celebrationMsg}>
                      {shopItems[itemIndex].celebrationMsg}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.returnBtnCelebration}
                    onPress={() =>
                      setisPurchasedModalOpen(
                        (isPurchasedModalOpen) => !isPurchasedModalOpen
                      )
                    }
                  >
                    <AntDesign
                      name="pluscircleo"
                      size={24}
                      color="white"
                      style={styles.plusIcon}
                    />
                    <Text style={styles.returnBtnCelebrationText}>
                      Return to shop
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          {/* sd */}

          {/*  */}

          {/* sd */}

          {/*  */}

          {/* sd */}

          {/*  */}

          {/* shop Message */}

          {!isPurchasedModalOpen && (
            <>
              <View style={styles.imageBox}>
                <ImageBackground
                  source={require("../../assets/images/shop_background.svg")}
                  resizeMode="cover"
                  style={styles.backgroundImg}
                >
                  <View style={styles.coinsContainer}>
                    <Image
                      source={require("../../assets/images/japanese_coins_1.svg")}
                      style={styles.coinsImg}
                    />
                    <Text style={styles.coinText}>{user.balance}</Text>
                  </View>
                  <Image
                    style={styles.backgrounMeGotchi}
                    source={require("../../assets/images/evil_shopkeeper.svg")}
                  />
                  {shopItems[0].purchased === false && (
                    <Image
                      style={styles.backgrounMeGotchiOne}
                      source={require("../../assets/images/shop_meGotchi_1.svg")}
                    />
                  )}
                  {shopItems[1].purchased === false && (
                    <Image
                      style={styles.backgrounMeGotchiTwo}
                      source={require("../../assets/images/shop_meGotchi_2.svg")}
                    />
                  )}
                  {shopItems[2].purchased && (
                    <Image
                      style={styles.backgrounMeGotchiThree}
                      source={require("../../assets/images/shop_meGotchi_3.svg")}
                    />
                  )}
                  {shopItems[3].purchased === false && (
                    <Image
                      style={styles.backgrounMeGotchiFour}
                      source={require("../../assets/images/shop_meGotchi_4.svg")}
                    />
                  )}
                </ImageBackground>
              </View>

              <View style={styles.shopCounter}></View>
              <View style={styles.shopItemsContainer}>
                {shopItems && (
                  <ShopItemsList
                    shopItems={shopItems}
                    handleSelectedItem={handleSelectedItem}
                    handleIsSelected={handleIsSelected}
                  />
                )}
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default shop;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shop: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  shopModalCelebration: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  shopModalOpen: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  imageBox: {
    width: "100%",
    height: "40%",
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
  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  backgrounMeGotchi: {
    width: "130px",
    height: "130px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "0px",
    left: "125px",
    zIndex: "1",
  },
  backgrounMeGotchiOne: {
    width: "68px",
    height: "68px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "75px",
    left: "3px",
  },
  backgrounMeGotchiTwo: {
    width: "82px",
    height: "82px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "0px",
    left: "293px",
  },
  backgrounMeGotchiThree: {
    width: "50px",
    height: "50px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "0px",
    left: "255px",
    zIndex: "3",
  },
  backgrounMeGotchiFour: {
    width: "36px",
    height: "36px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "76px",
    left: "70px",
    zIndex: "3",
  },
  shopCounter: {
    width: "100%",
    height: "6%",
    backgroundColor: "#08415C",
    borderBottomWidth: "6px",
    borderBottomColor: "black",
  },
  shopItemsContainer: {
    width: "100%",
    height: "54%",
    backgroundColor: "#4D5057",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },

  //Modal

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    width: "100%",
    height: "54%",
  },
  modalView: {
    position: "relative",
    backgroundColor: "#00D2FF",
    alignItems: "center",
    elevation: 5,
    width: "100%",
    height: "48%",
    marginBottom: "16%",
  },

  itemView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4D5057",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  itemContainer: {
    width: "82%",
    height: "82%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#00D2FF",
    marginTop: "1.5rem",
    boxShadow: "1px 1px 1px 0px black",
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "12px",
  },

  itemImageBoxModal: {
    width: "55%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1.2rem",
    border: "4px solid #264653",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  itemImageBoxPurchasedModal: {
    width: "55%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1.2rem",
    border: "4px solid green",
    borderRadius: "8px",
    backgroundColor: "white",
    opacity: "0.8",
  },

  lockBox: {
    position: "absolute",
    height: "40%",
    width: "40%",
    top: "4px",
    left: "75px",
    zIndex: 5,
    opacity: 1,
  },

  lock: {
    width: "80px",
    height: "80px",
    opacity: "1",
  },
  unlockMsgBox: {
    // backgroundColor: "#264653",
    color: "#264653",
    width: "50%",
    height: "28px",
    border: "2px solid black",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // boxShadow: "1px 1px 1px 0px #264653",
  },
  unlockMsg: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
  },

  itemImageModal: {
    width: "62px",
    height: "62px",
    marginTop: "1rem",
  },
  itemNameModal: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    marginBottom: "0.8rem",
    marginTop: "0.5rem",
  },

  itemDescriptionModalBox: {
    width: "75%",
    height: "30%",
    textAlign: "center",
    marginTop: "0.3rem",
    marginBottom: "0.3rem",
    // backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  itemDescriptionModal: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    marginTop: "0.2rem",
    textAlign: "center",
  },
  itemDescriptionPurchasedModal: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    marginTop: "0.2rem",
    textAlign: "center",
  },
  purchaseBoxModal: {
    width: "80%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  previousBtnBoxModal: {
    width: "20%",
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  purchaseBtnModal: {
    width: "100px",
    height: "28px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#264653",
    backgroundColor: "green",
    boxShadow: "1px 1px 2px 0px black",
    // borderRadius: "8px",
    fontSize: "0.58rem",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    fontFamily: "MarkoOne-regular",
  },

  tickIconModal: {
    width: "22px",
    height: "22px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  purchaseBtnTextModal: {
    fontSize: "0.6rem",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    fontFamily: "MarkoOne-regular",
  },

  purchasedBtnTextBoxModal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "28px",
    border: "2px solid green",
    // backgroundColor: "white",
  },
  purchasedBtnTextModal: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "#264653",
    fontFamily: "MarkoOne-regular",
    width: "70%",
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "1rem",
  },

  nextBtnBoxModal: {
    width: "20%",
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // Modal celebration

  modalViewCelebration: {
    position: "relative",
    margin: 20,
    marginTop: "3rem",
    backgroundColor: "#00D2FF",
    alignItems: "center",
    elevation: 5,
    width: "84%",
    height: "520px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    boxShadow: "2px 2px 2px 1px black",
  },

  celebrationBackgroundBox: {
    width: "100%",
    height: "40%",
  },

  celebrationBackgroundImage: {
    width: "100%",
    height: "100%",
  },
  mainCelebrationContainer: {
    width: "100%",
    height: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#706F6F",
  },

  backgrounMeGotchiCelebration: {
    width: "120px",
    height: "120px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-10px",
    left: "70px",
    zIndex: "6",
  },
  backgrounMeGotchiOneCelebration: {
    width: "100px",
    height: "100px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "20px",
    left: "10px",
    zIndex: "5",
  },
  backgrounMeGotchiTwoCelebration: {
    width: "90px",
    height: "90px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "15px",
    left: "210px",
  },
  backgrounMeGotchiThreeCelebration: {
    width: "60px",
    height: "60px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "5px",
    left: "160px",
    zIndex: "3",
  },
  shopMeGotchiOneCelebration: {
    width: "80px",
    height: "80px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "40px",
    left: "145px",
    zIndex: "2",
  },
  shopMeGotchiTwoCelebration: {
    width: "75px",
    height: "75px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "0px",
    left: "-5px",
    zIndex: "5",
  },
  shopMeGotchiThreeCelebration: {
    width: "70px",
    height: "70px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "0px",
    left: "240px",
  },
  shopMeGotchiFourCelebration: {
    width: "55px",
    height: "55px",
    boxShadow: "10px 10px 5px 0px #000",
    position: "absolute",
    bottom: "-2px",
    left: "195px",
    zIndex: "3",
  },

  celebrationMsgBox: {
    width: "70%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2rem",
  },

  celebrationMsg: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    fontFamily: "MarkoOne-regular",
    marginTop: "0.5rem",
    textAlign: "center",
  },
  returnBtnCelebrationText: {
    fontSize: "0.8rem",
    color: "white",
    fontFamily: "MarkoOne-regular",
    textAlign: "center",
    paddingLeft: "0.5rem",
  },

  returnBtnCelebration: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },

  // message modal

  itemViewMessage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4D5057",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  itemContainerMessage: {
    width: "82%",
    height: "82%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00D2FF",
    backgroundColor: "#08415C",
    borderRadius: "12px",
    marginTop: "1.5rem",
    boxShadow: "2px 2px 2px 1px black",
  },
  shopMessageBox: {
    width: "70%",
    height: "67%",
    marginTop: "2rem",
  },

  shopMessage: {
    fontSize: "1rem",
    // fontWeight: "bold",
    color: "white",
    fontFamily: "MarkoOne-regular",
    marginBottom: "0.5rem",
    textAlign: "center",
    marginTop: "1rem",
  },

  returnShopMessage: {
    fontSize: "0.85rem",
    // fontWeight: "bold",
    color: "#264653",
    color: "white",
    fontFamily: "MarkoOne-regular",
    marginLeft: "0.5rem",
    textAlign: "center",
  },
});
