import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CaptainLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
            headers :{
                Authorization : `Bearer ${token}`
            }
        }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate("/captain-login")
        }
        }).catch((error) => {
            console.error("Logout failed:", error);
            navigate("/captain-login"); // fallback in case of error
      });
    }, [token, navigate])

  return (
    <div>
      Logging off....
    </div>
  )
}

export default CaptainLogout
