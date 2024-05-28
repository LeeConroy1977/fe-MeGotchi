import React from "react";

const shopItems = [
  {
    id: 1,
    name: "Shima",
    description:
      "Shima is a happy and playful Megotchi. She loves to make you smile",
    purchasedMsg: `You have freed Shima and returned her back to the Megotchi tribe`,
    celebrationMsg: `We Can't thank you enough for returning our friend Shima to us. She is the heart and soul of our village. We wish you luck in completing your goals...`,
    price: 20,
    available: true,
    purchased: false,
  },
  {
    id: 2,
    name: "Noya",
    description:
      "Noya is a brave warrior. He protects our village with courage and valour",
    purchasedMsg: `You have rescude Noya and returned him back to the Megotchi tribe`,
    celebrationMsg: `How can we ever thank you for rescuing Noya from the wicked MeGotchi catcher Yamauba. Please try and complete some more goals so all our friends can be free...`,
    price: 20,
    available: true,
    purchased: false,
  },
  {
    id: 3,
    name: "Mashimo",
    description:
      "Mashimo is a quite and thoughtful Megotchi. He is old and wise",
    purchasedMsg: `You have saved Mashimo and returned him back to the Megotchi tribe`,
    celebrationMsg: `You will be forever in our hearts for setting free the wise Mashimo. Now our tribe will be guided with great wisdom once again. Good luck with completing the rest of your goals...`,
    price: 30,
    available: true,
    purchased: false,
  },
  {
    id: 4,
    name: "Okuma",
    description:
      "Okuma is a playful and mischievous MeGotchi. She is always getting into trouble",
    purchasedMsg: `You have set free Okuma and returned her back to the MeGotchi tribe`,
    celebrationMsg: `The tribe Will always love you for this kind act. The village was so quiet and well behaved without Okuma around. You are doing great. Keep reaching your goals... `,
    price: 40,
    available: true,
    purchased: false,
  },
];

const shopItemsContext = React.createContext({ shopItems });

export default shopItemsContext;
