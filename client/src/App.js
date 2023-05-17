import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar";
import { useContext, useEffect, useState } from "react";
import { check } from "./http/userApi";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
function App() {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    check().then(data => {
      if(data){
        user.setUser(user)
        user.setIsAuth(true)
      }
    }).finally(() => setLoading(false))
  }, [])

  if(loading){
    return (
      <Spinner style={{}} animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    )
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
