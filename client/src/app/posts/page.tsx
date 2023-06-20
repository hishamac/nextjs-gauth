"use client"
import Axios from "@/Axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData]: any = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isExtraLoading, setIsExtraLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGql = () => {
    Axios.post('graphql', {
      query: `query{
        cats{
          _id
          breed
          owner
        }
      }`
    })
      .then(response => {
        console.log(response.data)
        setData(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        setIsError(true)
        console.log(error)
      })
  }

  useEffect(() => {
    fetchGql()
  }, [])

  return (
    <>
posts
    </>
  )
}