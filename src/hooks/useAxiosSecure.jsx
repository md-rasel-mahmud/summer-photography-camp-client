import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({ baseURL: import.meta.env.VITE_api_link });

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    if (user) {
      axiosSecure.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      });

      axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            (error.response && error.response.status === 401) ||
            error.response.status === 403
          ) {
            Swal.fire({
              title: "Session expired.",
              icon: "warning",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
            await logout();
            navigate("/login");
          }
          return Promise.reject(error);
        }
      );
    }
  }, [user,logout, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
