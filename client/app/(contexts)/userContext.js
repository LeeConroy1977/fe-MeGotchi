import { createContext } from "react";

const userContext = createContext({
  user: {},
  setUser: (user) => {}
});

export default userContext;