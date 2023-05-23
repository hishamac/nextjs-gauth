"use client"
import Axios from "@/Axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Credentials } from "../../credentials";
import Cookies from 'js-cookie'

export default function Navbar() {
    const [user, setUser]: any = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isExtraLoading, setIsExtraLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const token: any = Cookies.get('token')

    const onResponse = async (res: CredentialResponse) => {
        // send `credential` to backend
        if (res) {
            setIsExtraLoading(true)
            console.log(res);
            const decodedCredentials: Credentials = jwtDecode(res.credential as string)
            console.log(decodedCredentials);
            const name = decodedCredentials.family_name + ' ' + decodedCredentials.given_name
            Axios.post('/auth/login',
                { name, email: decodedCredentials.email, image: decodedCredentials.picture }
            )
                .then(res => {
                    console.log(res.data)
                    window.location.reload()
                })
                .catch(err => {
                    setIsExtraLoading(false)
                    console.log(err);
                })
        } else {
            console.log('No Response Found');
        }
    }

    const initializeGsi = () => {
        window.google?.accounts.id.initialize({
            client_id: '371149805598-hs1n36gfrrr1aar53gc55cfj83tnlg9f.apps.googleusercontent.com'|| '846787305859-57seckh6vtm3vcuqliar8uuvmjrc7nbg.apps.googleusercontent.com',
            callback: onResponse
        });
        window.google?.accounts.id.prompt(notification => {
        });
    }

    const logout = () => {
        // const timer = setTimeout(() => {
        //     setIsLogoutLoading(true)
        //     Cookies.remove('token')
        //     window.location.reload()
        //     setUser(null)
        // }, 2000);
        setIsExtraLoading(true)
        Cookies.remove('token')
        window.location.reload()
        setUser(null)
    }

    useEffect(() => {
        if (token) {
            (async () => {
                await Axios.get('auth/getLoginUser')
                    .then(response => {
                        setUser(response.data)
                        setIsLoading(false)
                    })
                    .catch(error => {
                        setIsLoading(false)
                        setIsError(true)
                        console.log(error)
                    })
            })()
        } else {
            setIsLoading(false)
            initializeGsi()
        }
    }, []);
    return (
        //     <div className="w-full h-12">
        // <h1 className="from-neutral-50">Hello nav</h1>
        //     </div>
        isExtraLoading ? (<h1>x Loading...</h1>) : isLoading ? (<h1>Loading...</h1>)
            : isError ? (<h1>Error</h1>) : (user ? (<div className="w-full h-[12                                                        0px] bg-green-200">
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
                <img className="w-10 h-10" src={user.image} alt="profile" />
                <button onClick={logout}>Logout</button>
            </div>) : (<div className="relative w-full lg:max-w-sm">
                <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option>ReactJS Dropdown</option>
                    <option>Laravel 9 with React</option>
                    <option>React with Tailwind CSS</option>
                    <option>React With Headless UI</option>
                </select>
            </div>))
    );
}