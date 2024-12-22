"use client";
import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const credential = sessionStorage.getItem("google_access_token");

  useEffect(() => {
    if (credential == null) {
      console.log("Access token not found.");
      router.push("/");
    } else {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${credential}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            sessionStorage.setItem("google_access_token", ""); // Limpa o token "sujo"
          } else {
            console.log("UserLoged:");
            router.push("/tasks");
          }
        })
        .catch((err) => console.error("Error Not find:", err));
    }
  }, [router]);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      router.push("/tasks");
      const { access_token } = response;
      sessionStorage.setItem("google_access_token", access_token);
    },
    onError: () => {
      //console.log("Erro no login");
    },
  });
  return (
    <div>
      <div className="bg-foreground rounded-xl w-80 h-auto flex flex-col items-center gap-4 p-10">
        <img src="/Pic.svg" alt="Login SVG picture" className="h-fill" />
        <h2 className="font-bold text-2xl text-background">Bem-Vindo!</h2>
        <div
          className="bg-white rounded-full flex p-2 gap-4 items-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-md"
          onClick={() => login()}
        >
          <img src="/googleG.svg" alt="Google Icon" className="h-5" />
          <h2 className="font-bold text-sm text-black font-inter">
            Continue com o Google
          </h2>
        </div>
      </div>
    </div>
  );
}
