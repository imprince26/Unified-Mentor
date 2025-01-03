/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Lock, ArrowRight, EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api, { handleApiError } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputStates, setInputStates] = useState({
    email: {
      value: "",
      isFocused: false,
      hasContent: false,
    },
    password: {
      value: "",
      isFocused: false,
      hasContent: false,
    },
  });
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);

      toast.success("Welcome to Your Sports Journey!", {
        style: {
          background: "#0F2C2C",
          color: "#E0F2F1",
          border: "1px solid #1D4E4E",
        },
        iconTheme: {
          primary: "#2E7D32",
          secondary: "#E0F2F1",
        },
      });

      navigate("/");
    } catch (error) {
      const errorMessage = handleApiError(error);

      toast.error(errorMessage.message, {
        style: {
          background: "#2C3E50",
          color: "#ECF0F1",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setInputStates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        hasContent: value.length > 0,
      },
    }));
  };

  const handleInputFocus = (name, isFocused) => {
    setInputStates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isFocused,
      },
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-[#B0BEC5] transition-all duration-300 
                      ${inputStates.email.isFocused ? "text-[#4CAF50]" : ""}`}
                >
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Mail
                      className={`absolute left-3 top-1/2 -translate-y-1/2 
                          transition-all duration-300 
                          ${
                            inputStates.email.isFocused
                              ? "text-[#4CAF50] scale-110"
                              : "text-[#607D8B]"
                          }`}
                      size={20}
                    />
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      onFocus={() => handleInputFocus("email", true)}
                      onBlur={() => handleInputFocus("email", false)}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("email", e.target.value);
                      }}
                      className={`pl-10 pr-3 
                          bg-[#1D4E4E]/30 
                          border-[#2E7D32]/30
                          text-[#E0F2F1] 
                          placeholder-[#607D8B]
                          transition-all duration-300 ease-in-out
                          focus:outline-none
                          ${
                            inputStates.email.isFocused
                              ? "ring-2 ring-[#4CAF50]/50 border-[#4CAF50]/70"
                              : "hover:border-[ #2E7D32]"
                          }
                          ${
                            inputStates.email.hasContent
                              ? "border-[#66BB6A]"
                              : ""
                          }`}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[#FF5252] text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-[#B0BEC5] transition-all duration-300 
                      ${
                        inputStates.password.isFocused ? "text-[#4CAF50]" : ""
                      }`}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock
                      className={`absolute left-3 top-1/2 -translate-y-1/2 
                          transition-all duration-300 
                          ${
                            inputStates.password.isFocused
                              ? "text-[#4CAF50] scale-110"
                              : "text-[#607D8B]"
                          }`}
                      size={20}
                    />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onFocus={() => handleInputFocus("password", true)}
                      onBlur={() => handleInputFocus("password", false)}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("password", e.target.value);
                      }}
                      className={`pl-10 pr-10 
                          bg-[#1D4E4E]/30 
                          border-[#2E7D32]/30
                          text-[#E0F2F1] 
                          placeholder-[#607D8B]
                          transition-all duration-300 ease-in-out
                          focus:outline-none
                          ${
                            inputStates.password.isFocused
                              ? "ring-2 ring-[#4CAF50]/50 border-[#4CAF50]/70"
                              : "hover:border-[#2E7D32]"
                          }
                          ${
                            inputStates.password.hasContent
                              ? "border-[#66BB6A]"
                              : ""
                          }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={togglePasswordVisibility}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-[#607D8B] hover:text-[#4CAF50]"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={20} />
                      ) : (
                        <EyeIcon size={20} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-[#FF5252] text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#4CAF50] hover:bg-[#388E3C] 
                text-[#E0F2F1] font-semibold tracking-wide
                transition-all duration-300 group
                flex items-center justify-center gap-2
                shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#B0BEC5]">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="text-[#4CAF50] hover:text-[#388E3C]"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
