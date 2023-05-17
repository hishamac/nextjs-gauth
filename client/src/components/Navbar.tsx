// https://dev.to/mremanuel/add-the-new-google-sign-in-to-your-react-app-p6m
"use client"
import Axios from "@/Axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Credentials } from "../../credentials";
import Cookies from 'js-cookie'

export default function Navbar() {
    const token = Cookies.get('token')
    useEffect(() => {
        if(token){
            //normal
        }else{
        initializeGsi()
        }
    });
    const onResponse = async (res: CredentialResponse) => {
        // send `credential` to backend
        if (res) {
            console.log(res);
            const decodedCredentials: Credentials = jwtDecode(res.credential as string)
            console.log(decodedCredentials);
            const name = decodedCredentials.family_name + ' ' + decodedCredentials.given_name
            Axios.post('/auth/login',
                { name, email: decodedCredentials.email, image: decodedCredentials.picture }
            )
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log('No Response Found');
        }
    }

    const initializeGsi = () => {
        window.google?.accounts.id.initialize({
            client_id: '846787305859-57seckh6vtm3vcuqliar8uuvmjrc7nbg.apps.googleusercontent.com',
            callback: onResponse
        });
        window.google?.accounts.id.prompt(notification => {
        });
    }
    return(
        <div className="w-full h-12">
    <h1 className="font-mono">Hello nav</h1>
        </div>
      );;
}