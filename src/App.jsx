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
import Error404 from "./pages/errorPages/error404";
import Error500 from "./pages/errorPages/error500";
import { socket } from "./socketIo";

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const {
    pageNotFound,
    serverError,
  } = useContext(UserMainContext)
  const userAuth = async () => {
    try {
      const user = await userAuthenticate()
      socket.connect()
      socket.emit('createRoom', user._id)
      dispatch(setUserLogin(user))
    } catch (error) {
      dispatch(setUserLogout())

    }
  }
  useEffect(() => {
    userAuth()
    socket.on('disconnect', () => {
      location.reload()
  })
  }, [socket])
  return (<>
    <BrowserRouter>
      {/* {pageNotFound && <Error404 />} */}
      {serverError && <Error500 />}
      {!pageNotFound && !serverError && <>
        <UserRoutes />
        <AdminRoutes />
      </>}
    </BrowserRouter>

  </>
  )
}

export default App
