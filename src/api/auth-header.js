import secureLocalStorage from "react-secure-storage"


const authHeader = () => { 
    const token = secureLocalStorage.getItem("token");

    let header = {};
    if(token){
        header = { Authorization: `Bearer ${token}` }
    }

    return header;
 }

 export default authHeader;