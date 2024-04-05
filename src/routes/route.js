import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import useAuthApi from "util/api/aAuth"
import { setAxiosToken } from "util/api/base/aBase"
import { UserContext } from "util/providers/UserProvider"

const Authmiddleware = props => {
  const [ready, setReady] = useState(false)

  const token = localStorage.getItem("authUser")

  const api = useAuthApi()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (token && !user) {
      setAxiosToken(JSON.parse(token))

      api
        .checkToken()
        .then(res => {
          if (res) {
            setUser(res)
            setReady(true)
          }
        })
        .catch(() => {
          setReady(true)
          console.log("Error occurred while checking token")
        })
    } else {
      setReady(true)
    }
  }, [token, user, setUser, api])

  if (ready) {
    return (
      <>
        {!!user ? (
          <React.Fragment>{props.children}</React.Fragment>
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
      </>
    )
  }
}

export default Authmiddleware
