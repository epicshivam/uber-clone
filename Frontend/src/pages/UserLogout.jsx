import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if(response.status === 200 ){
           localStorage.removeItem("token"); // your original usage
        navigate("/login");
        } 
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/login"); // fallback in case of error
      });
  }, [token, navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
