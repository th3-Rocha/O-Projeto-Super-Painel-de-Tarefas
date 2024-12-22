import Image from "next/image";
import Header from "@/components/header/Header";
import Login from "@/components/login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";


export default function Home() {

  return (
    <div className="font-dm-sans">
      <Header />
      <div className="flex justify-center items-center w-full mt-20">
        <GoogleOAuthProvider clientId="937655115907-4qfc1hctmqd81rtsokr6bpsiv4bdvsgf.apps.googleusercontent.com">
          <Login />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
