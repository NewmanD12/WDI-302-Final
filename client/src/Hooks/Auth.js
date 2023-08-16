import { useState, useEffect, createContext, useContext, useMemo } from "react";
const AuthContext = createContext();
const urlEndpoint = process.env.REACT_APP_USER_ENDPOINT


/* 
@Source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#basic-routing-with-routes
*/
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userName, setUserName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [userID, setUserID] = useState('')
    const [shippingInfo, setShippingInfo] = useState({})

    useEffect(() => {

        //get session data if session is still active from the browser
        const userData = getLSUserData();
        
        // console.log('userData' + userData)
        // console.log(userData)

        if (userData && userData.token) {
            setUserToken(userData.token);
        }
        if (userData && userData.userName) {
            setUserName(userData.userName);
        }
        if (userData && userData.isAdmin){
            setIsAdmin(true)
        }
        if(userData && userData.userID){
            setUserID(userData.userID)
        }
        if(userData && userData.shippingInfo){
            setShippingInfo(userData.shippingInfo)
        }
    }, [isAuthLoading]);

    // call this function when you want to register the user
    const register = async (firstName, lastName, userName, password) => {
        setIsAuthLoading(true);
        const registerResult = await registerUser(firstName, lastName, userName, password);
        if(registerResult.success){
          const loginResult = await loginUser(userName, password)
          if(loginResult.success){
            setLSUserData(loginResult.token, loginResult.userFirstName, loginResult.userLastName, loginResult.userName)
          }
        }
        setIsAuthLoading(false);
        return registerResult;
    };

    const registerUser = async (firstName, lastName, userName, password) => {
        const url = `${urlEndpoint}/create-user`;
        const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                firstName,
                lastName,
                userName,
                password,
                }),
            });
        const responseJSON = await response.json();
        return responseJSON;
    };

    // call this function when you want to authenticate the user
    const login = async (userName, password) => {
        setIsAuthLoading(true);
        const loginResult = await loginUser(userName, password);
        if (loginResult.success) {
            setLSUserData(loginResult.token, loginResult.userName, loginResult.isAdmin, loginResult.userID);
        }

        setIsAuthLoading(false);
        return loginResult
    };

    const loginUser = async (userName, password) => {
        const url = `${urlEndpoint}/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            userName,
            password,
            }),
        });
        const responseJSON = await response.json();
        return responseJSON;
    };

    // call this function to sign out logged in user
    const logout = async () => {
        setIsAuthLoading(true);
        await removeLSUserData(); // This has to be awaited for the useEffect to work
        setUserToken(null);
        setUserName("");
        setIsAuthLoading(false);
    };

    /*  
        https://reactjs.org/docs/hooks-reference.html#usememo
        Memoization is essentially caching. The variable value will only be recalculated if the 
        variables in the watched array change.
    */

    const addShippingInfo = async (shippingInfo, currentAuth) => {
        
        const { userToken, userName, isAdmin, userID } = currentAuth
        setIsAuthLoading(true)
        setLSUserData(userToken, userName, isAdmin, userID, shippingInfo)
        setIsAuthLoading(false)
        return true
    }
        
    const value = useMemo(
            () => ({
                userToken,
                userName,
                isAdmin,
                userID,
                shippingInfo,
                login,
                logout,
                register,
                addShippingInfo
            }),
            [userToken]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const setLSUserData = (token, userName, isAdmin, userID, shippingInfo = {}) => {

  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({token, userName, isAdmin, userID, shippingInfo})
  );
};

const removeLSUserData = () => {
  //remove session from browser 
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getLSUserData = () => {
  //get session from browser
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};
