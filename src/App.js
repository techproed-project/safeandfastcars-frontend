import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { getUser } from "./api/user-service";
import LoadingPage from "./pages/common/loading-page";
import CustomRoutes from "./router/custom-routes";
import { loginSuccess } from "./store/slices/auth-slice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      if (token) {
        const resp = await getUser();
        dispatch(loginSuccess(resp.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return loading ? <LoadingPage /> : <CustomRoutes />;
};

export default App;
