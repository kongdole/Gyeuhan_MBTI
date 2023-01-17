import React, {createContext, useState} from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {


    const users = {

        coin : " ",
        buyCoin: " ",
        
    }

    return (
        <UserContext.Provider value={users}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserStore;