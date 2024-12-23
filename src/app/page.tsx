import Header from "@/components/header/Header";
import Login from "@/components/login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";


export default function Home() {

  return (
    <div className="font-dm-sans">
      <Header />
      <div className="flex justify-center items-center w-full mt-20">
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
          <Login />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
