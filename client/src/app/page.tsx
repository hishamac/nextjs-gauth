// https://dev.to/mremanuel/add-the-new-google-sign-in-to-your-react-app-p6m
"use client"
import Axios from "@/Axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Credentials } from "../../credentials";
import axios from "axios";

export default function Page() {
  const onResponse = async (res: CredentialResponse) => {
    // send `credential` to backend
    if(res){
      console.log(res);
      const decodedCredentials:Credentials = jwtDecode(res.credential as string)
      console.log(decodedCredentials);
      const name = decodedCredentials.family_name+' '+decodedCredentials.given_name
      axios.post('http://localhost:5000/auth/login',{name,email:decodedCredentials.email,image:decodedCredentials.picture})
    }else{
      console.log('error');
    }
  }
  useEffect(() => {
    initializeGsi()
  });

  const initializeGsi = () => {
    window.google?.accounts.id.initialize({
      client_id: '846787305859-57seckh6vtm3vcuqliar8uuvmjrc7nbg.apps.googleusercontent.com',
      callback: onResponse
    });
    window.google?.accounts.id.prompt(notification => {
    });
  }
  return <h1>Hello, Home page!</h1>;
}