import React from "react";
import { useSelector } from "react-redux";
import { AppSelector } from "../redux/configureStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { autoLogin } from "../redux/user";


const CanActive = () => {
  const token = useSelector((selector: AppSelector) => {
    return selector.token.data;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  React.useEffect(() => {
    if(!token) return navigate('/login');

    const checkToken = async () => {
      try {
        const req = await fetch("http://localhost:8080/api/auth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(token),
        });

        const { token_valid } = await req.json();

        if (token_valid) {
          dispatch(autoLogin());
          navigate('/');
        } else {
          navigate('/login/');
        }
      
      } catch (e) {
        navigate('/login');
      }
    };

    checkToken();


  }, [token, navigate, dispatch]);


  return null;
};

export default CanActive;
