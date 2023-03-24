import styled from 'styled-components';
import { useEffect, useState } from 'react';
// import { type } from '@testing-library/user-event/dist/type';
import { Input } from '../styles/Input';
import { MouseEvent } from 'react';
export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 998;
  @media (max-width: 768px) {
    .mobile_box {
      margin-top: 80px;
    }
  }
`;
export const Container = styled.div`
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
    max-width: 768px;
    border-radius: 0px;
  }
  background-color: white;
  position: fixed;
  width: 100%;
  max-width: 400px;
  height: auto;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  .login_header {
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
  }
  .tab {
    display: flex;
    flex-direction: row;
    flex-grow: 0.1;
    justify-content: space-between;
  }
  .mid {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 30px;
  }
  span {
    font-size: 18px;
    color: var(--fontBlack__300);
    font-weight: 550;
    cursor: pointer;
    &.active {
      color: #538b4a;
    }
  }
  .input_field {
    /* border: 2px solid var(--darkGreen__color); */
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 3.5em; */
    border-radius: 12px;
    /* margin-bottom: 15px; */
  }
  /* input {
    height: 100%;
    width: 100%;
    padding-left: 10px;
    ::placeholder {
      vertical-align: center;
    }
  } */
  .hello {
    font-size: 20px;
    color: #538b4a;
    font-weight: 550;
    margin: 35px 0;
  }
  .bottom {
    padding: 0 30px;
    margin: 20px 0 50px 0;
  }
  .login_submit {
    border-radius: 12px;
    width: 100%;
    height: 3.2em;
    color: white;
    font-weight: 600;
    font-size: 16px;
    background-color: var(--darkGreen__color);
    cursor: pointer;
    margin-bottom: 15px;
  }
  .goggle {
    border-radius: 12px;
    width: 100%;
    height: 3.2em;
    color: var(--fontBlack__500);
    font-weight: 550;
    font-size: 16px;
    background-color: white;
    border: 1px solid var(--fontBlack__500);
    cursor: pointer;
  }
  .social {
    position: relative;
  }
  svg {
    position: absolute;
    width: 2.5em;
    padding: 10px 0px 10px 5px;
    margin-left: 5px;
  }
  .error {
    color: var(--chamong__color);
    padding: 5px 0 0px 5px;
    font-weight: 500;
    font-size: var(--fs__mid);
  }
  .input_mg {
    margin-top: 20px;
  }
  .input_mg_bottom {
    margin-bottom: 20px;
  }
`;
type LoginInfo = {
  setIsLogin: (foo: any) => void;
};
type CustomMouseEvent = MouseEvent<HTMLElement>;
function Login({ setIsLogin }: LoginInfo) {
  const [isUserState, setIsUserState] = useState<boolean>(true);

  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [signUp, setSignUp] = useState({
    nickName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    return () => {
      setErrorMessage({
        email: '',
        password: '',
      });
    };
  }, [isUserState]);

  //todo 인풋 : onChange 핸들러
  const loginInputValue = (key: string) => (e: any) => {
    if (key === 'email' && e.target.value)
      setErrorMessage({ ...errorMessage, email: '' });
    if (key === 'password' && e.target.value)
      setErrorMessage({ ...errorMessage, password: '' });
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //todo 버튼 : onClick 핸들러
  const loginRequestHandler = () => {
    setErrorMessage({ email: '', password: '' });
    if (!loginInfo.email && !loginInfo.password) {
      setErrorMessage({
        email: '이메일을 입력해주세요',
        password: '비밀번호를 입력해주세요',
      });
    } else if (!loginInfo.email && loginInfo.password) {
      setErrorMessage({ email: '이메일을 입력해주세요', password: '' });
    } else if (loginInfo.email && !loginInfo.password) {
      setErrorMessage({ email: '', password: '비밀번호를 입력해주세요' });
    }
  };
  const singUpInputHandler = (key: string) => (e: any) => {
    let emailCheck = true;
    let pwCheck = true;

    //* 빈칸이면? 에러메시지 초기화
    if (!e.target.value) setErrorMessage({ email: '', password: '' });

    //* Email: a@a 형태 아니면? `{loginInfo.email} is not a valid email address.`
    if (
      key === 'email' &&
      e.target.value &&
      !e.target.value.match(
        /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      )
    ) {
      emailCheck = false;
      setErrorMessage({
        ...errorMessage,
        email: `${e.target.value} 이메일 형식에 맞게 입력해주세요`,
      });
    }

    //* Email: a@a 형태 맞다면 에러메시지 초기화
    if (key === 'email' && e.target.value && emailCheck) {
      setErrorMessage({ ...errorMessage, email: '' });
    }

    //* Password: num + letter + symbol
    if (
      key === 'password' &&
      e.target.value &&
      !e.target.value.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/
      )
    ) {
      pwCheck = false;
      setErrorMessage({
        ...errorMessage,
        password: '영문, 숫자, 특수문자를 1개 이상 포함시켜주세요',
      });
    }
    console.log(pwCheck);

    //* Password: 8글자 미만이면?
    if (pwCheck && key === 'password' && e.target.value) {
      if (e.target.value.length < 8) {
        setErrorMessage({
          ...errorMessage,
          password: `8글자 이상 입력해주세요`,
        });
        // const num = 8 - e.target.value.length;
        // num === 1
        //   ? setErrorMessage({
        //       ...errorMessage,
        //       password: `Must contain at least 1 more character.`,
        //     })
        //   : setErrorMessage({
        //       ...errorMessage,
        //       password: `Must contain at least ${num} more characters.`,
        //     });
      } else setErrorMessage({ ...errorMessage, password: '' });
    }
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  return (
    <Background onClick={() => setIsLogin(false)}>
      <Container onClick={e => e.stopPropagation()}>
        <div className="login_header">
          <div className="tab">
            <div className="login">
              <span
                className={isUserState ? 'active' : ''}
                onClick={() => setIsUserState(!isUserState)}
              >
                로그인
              </span>
            </div>
            <div className="signup">
              <span
                className={!isUserState ? 'active' : ''}
                onClick={() => setIsUserState(!isUserState)}
              >
                회원가입
              </span>
            </div>
          </div>
          <div>
            <span onClick={() => setIsLogin(false)}>&times;</span>
          </div>
        </div>

        <div className="mobile_box">
          <div className="mid">
            <div className="hello">
              {isUserState ? '환영합니다 🎉' : '🚗 차박 여행지는 차몽에서'}
            </div>
            {!isUserState ? (
              <div className="input_field">
                <div className="input_mg_bottom">
                  <Input
                    color={'green'}
                    placeholder="닉네임"
                    onChange={singUpInputHandler('nickName')}
                  ></Input>
                </div>
              </div>
            ) : null}

            <div className="input_field">
              {/* <div className="input_mg"> */}
              <Input
                color={errorMessage.email ? 'red' : 'green'}
                placeholder="이메일"
                onChange={
                  isUserState
                    ? loginInputValue('email')
                    : singUpInputHandler('email')
                }
              ></Input>
              {/* </div> */}
              {errorMessage.email ? (
                <div className="error">{errorMessage.email}</div>
              ) : (
                ''
              )}
            </div>
            <div className="input_field">
              <div className="input_mg">
                <Input
                  color={errorMessage.password ? 'red' : 'green'}
                  placeholder="비밀번호"
                  type={'password'}
                  onChange={
                    isUserState
                      ? loginInputValue('password')
                      : singUpInputHandler('password')
                  }
                ></Input>
              </div>
              {errorMessage.password ? (
                <div className="error">{errorMessage.password}</div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="bottom">
            <div className="login_button">
              <button className="login_submit" onClick={loginRequestHandler}>
                {isUserState ? '로그인' : '회원가입'}
              </button>
            </div>
            {isUserState ? (
              <div className="social">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <g transform="translate(4.376957 4.073369)">
                    <path
                      d="m19.7480429 20.9266305c2.813-2.625 4.063-7 3.313-11.18799996h-11.188v4.62599996h6.375c-.25 1.5-1.125 2.75-2.375 3.562z"
                      fill="#4285f4"
                    ></path>
                    <path
                      d="m1.24804285 17.2396305c.82223 1.6196 2.0014 3.0314 3.4486 4.129s3.1247 1.8523 4.906 2.2073c1.78130005.355 3.62000005.301 5.37740005-.1579s3.3877-1.3108 4.768-2.4914l-3.875-3c-3.313 2.188-8.81300005 1.375-10.68800005-3.75z"
                      fill="#34a853"
                    ></path>
                    <path
                      d="m5.18573285 14.1766305c-.5-1.563-.5-3 0-4.56299996l-3.938-3.062c-1.438 2.875-1.875 6.93799996 0 10.68799996z"
                      fill="#fbbc02"
                    ></path>
                    <path
                      d="m5.18604285 9.61463054c1.374-4.31301 7.25000005-6.81301 11.18700005-3.126l3.438-3.37401c-4.875-4.688-14.37500005-4.5-18.56300005 3.43601l3.938 3.063z"
                      fill="#ea4335"
                    ></path>
                  </g>
                </svg>
                <button className="goggle">구글로 로그인</button>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Background>
  );
}

export default Login;
