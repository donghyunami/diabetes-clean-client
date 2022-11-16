import axios from "axios";
import React from "react";

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  FormWrap,
  InputGroup,
  InputName,
  InputWrap,
  FrmBtnContainer,
  Valid,
} from "../SignUp/styles";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLogInError, setIsLogInError] = useState(false);

  const { email, password } = inputs;

  const onFormChange = useCallback(
    (e: any) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value.trim(),
      });
    },
    [inputs]
  );

  const onSubmit = (e: any) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLogInError(false);
    const userInfo = {
      email,
      password,
    };

    if (password && email) {
      axios
        .post("/api/auth/login", userInfo)
        .then((res) => {
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log(error.response?.status);
          setErrorMsg(error.response?.data.msg);

          setIsLogInError(error.response?.status === 401);
        });
    }
    setInputs({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <h1 className="title">
        <span style={{ fontSize: "25px" }}>로그인</span>
      </h1>
      <FormWrap>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <InputName htmlFor="email">
              이메일<span className="icon">*</span>
            </InputName>
            <InputWrap
              style={{
                width: "296px",
              }}
            >
              <input
                type="email"
                id="email"
                name="email"
                required
                style={{
                  width: "100%",
                }}
                placeholder="이메일"
                onChange={onFormChange}
                value={email}
              />
            </InputWrap>
          </InputGroup>
          <InputGroup>
            <InputName htmlFor="pw">
              비밀번호<span className="icon">*</span>
            </InputName>
            <InputWrap
              style={{
                width: "296px",
              }}
            >
              <input
                type="password"
                id="password"
                name="password"
                required
                style={{
                  width: "100%",
                }}
                placeholder="비밀번호"
                onChange={onFormChange}
                value={password}
              />
            </InputWrap>
            {isLogInError && (
              <Valid
                className="error"
                style={{ width: "100%", marginTop: 10, textAlign: "center" }}
              >
                {errorMsg}
              </Valid>
            )}
          </InputGroup>
          <FrmBtnContainer>
            <button
              type="reset"
              style={{
                width: 143,
              }}
              onClick={(e) => {
                e.preventDefault();
                console.log("취소");
                setInputs({
                  ...inputs,
                  email: "",
                  password: "",
                });
                console.log(password);
                navigate(-1);
              }}
            >
              취소하기
            </button>
            <button
              type="submit"
              style={{
                width: 143,
              }}
            >
              로그인
            </button>
            <div className="auth-msg">
              <span>
                아직 회원이 아니신가요? &nbsp;
                <Link to="/signup">회원가입</Link>하기
              </span>
            </div>
          </FrmBtnContainer>
        </form>
      </FormWrap>
    </Container>
  );
};

export default React.memo(Login);
