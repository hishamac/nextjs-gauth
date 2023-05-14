import Axios from "@/Axios";

export default function Page() {
  // const onResponse = async ({ credential }) => {
  //   // send `credential` to backend
  //   const decodedToken = jwtDecode(credential)
  //   Axios.post('/auth/login',credential.)
  // }
  const initializeGsi = () => {
    window.google?.accounts.id.initialize({
      client_id: '691779687682-ia60o5pkjnroqpgi2nc5sj85dtnbdeuh.apps.googleusercontent.com',
      callback: onResponse
    });
    window.google?.accounts.id.prompt(notification => {
    });
  }
  return <h1>Hello, Home page!</h1>;
}