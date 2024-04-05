import React, { useContext, useState } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Input,
  Label,
  Form,
} from "reactstrap"

import { Link, useNavigate } from "react-router-dom"

import profileImg from "../../../assets/images/profile-img.png"
import logoImg from "../../../assets/images/logo.svg"
import useAuthApi from "util/api/aAuth"
import { setAxiosToken } from "util/api/base/aBase"
import { UserContext } from "util/providers/UserProvider"

const Register = props => {
  document.title = "Register | Skote - React Admin & Dashboard Template"

  const [email, setEmail] = useState()
  const [pass, setPass] = useState()
  const [repeatPass, setRepeatPass] = useState()
  const [remember, setRemember] = useState()
  const [error, setError] = useState()

  const api = useAuthApi()
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleRegister = () => {
    api.signUp({ email, password: pass }).then(res => {
      if (res) {
        setAxiosToken(res.token)
        setUser(res)

        localStorage.setItem("authUser", JSON.stringify(`${res.token}`))

        navigate("/")
      }
    })
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Skote account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        handleRegister()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          value={pass}
                          onChange={e => setPass(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          type="password"
                          placeholder="Repeat Password"
                          value={repeatPass}
                          onChange={e => setRepeatPass(e.target.value)}
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>© 2024 Start Travel. Crafted with by {":)"}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
