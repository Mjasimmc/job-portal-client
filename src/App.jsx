import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRoutes from "./routes/userRoutes"
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AdminRoutes from "./routes/adminRoutes";
import { useContext, useEffect } from "react";
import { userAuthenticate } from "./service/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin, setUserLogout } from "./store/slices/userSlice";
import { UserMainContext } from "./store/contexts/userContext";
import Error500 from "./pages/errorPages/error500";
import { socket } from "./socketIo";

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { serverError } = useContext(UserMainContext);

  const userAuth = async () => {
    try {
      const user = await userAuthenticate();
      socket.connect({ secure: true });
      socket.emit('createRoom', user._id);
      dispatch(setUserLogin(user));
    } catch (error) {
      console.error("Authentication error:", error);
      dispatch(setUserLogout());
    }
  };

  useEffect(() => {
    if (user.isLogin) {
      userAuth();
    }
  }, [user.isLogin]);

  useEffect(() => {
    const handleDisconnect = () => {
      console.log("Socket disconnected");
        // Reconnect the socket when disconnected.
        // socket.connect({ secure: true });
      // Optionally, you can emit events or perform other actions on reconnection.
      socket.emit('reconnectEvent', { secure: true });
    };

    socket.on('disconnect', handleDisconnect);

    return () => {
      // Clean up the event listener when the component unmounts.
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  return (<>
    <BrowserRouter>
        {serverError && <Error500 />}
        {!serverError && (
          <>
            
              <UserRoutes />
              <AdminRoutes />
          
          </>
        )}
      </BrowserRouter>
      {/* <ToastContainer /> */}

  </>
  )
}

export default App
