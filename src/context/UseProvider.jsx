import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  return (
    //Los Children son componentes que estaran en el interior del Provider.
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
