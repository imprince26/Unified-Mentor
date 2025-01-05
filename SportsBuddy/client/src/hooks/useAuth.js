// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "react-hot-toast";

// export const useAuthActions = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, register, logout } = useAuth();

//   const handleLogin = async (credentials) => {
//     setIsLoading(true);
//     try {
//       const result = await login(credentials);
//       toast.success("Welcome to Your Sports Journey!", {
//         style: {
//           background: "#0F2C2C",
//           color: "#E0F2F1",
//         },
//       });
//       return result;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegister = async (userData) => {
//     setIsLoading(true);
//     try {
//       const result = await register(userData);
//       toast.success("Registration Successful!", {
//         style: {
//           background: "#0F2C2C",
//           color: "#E0F2F1",
//         },
//       });
//       return result;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success("Logged out successfully", {
//         style: {
//           background: "#0F2C2C",
//           color: "#E0F2F1",
//         },
//       });
//     } catch (error) {
//       toast.error("Logout failed", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//     }
//   };

//   return {
//     login: handleLogin,
//     register: handleRegister,
//     logout: handleLogout,
//     isLoading,
//   };
// };
