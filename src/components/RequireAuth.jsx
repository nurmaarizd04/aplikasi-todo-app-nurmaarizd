import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}
