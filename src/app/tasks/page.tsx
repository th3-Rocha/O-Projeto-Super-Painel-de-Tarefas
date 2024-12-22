"use client";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TasksForm from "@/components/tasksForm/TasksForm";
export default function Home() {
  const [user_name, setUser_name] = useState("");
  const [user_pic, setUser_pic] = useState("");
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const router = useRouter();
  let credential: string | null = null;
  useEffect(() => {
    try {
      credential = sessionStorage.getItem("google_access_token");
      //console.log("Credential:", credential);
    } catch (error) {
      router.push("/");
      return;
    }
    if (credential == null) {
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
            console.log("Error:", data.error);
            router.push("/");
          }
          console.log("UserInfo:", data);
          setUser_name(data.name);
          setUser_pic(data.picture);
        })
        .catch((err) => console.error("Error Not find:", err));
    }
  }, [router]);

  useEffect(() => {
    if (isProfileClicked) {
      console.log("LogOut");
      // se usar o Script da Google Identity Services google.accounts.id.revoke(...
      fetch("https://oauth2.googleapis.com/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `token=${credential}`,
      });
      sessionStorage.setItem("google_access_token", "");
      router.push("/");
    }
  }, [isProfileClicked, router]);

  return (
    <div className="flex flex-col items-center gap-12 ">
      <Header
        name={user_name}
        picUrl={user_pic}
        onProfileClick={() => setIsProfileClicked(true)}
      />
      <div className="w-full ">
        <TasksForm />
      </div>
    </div>
  );
}
