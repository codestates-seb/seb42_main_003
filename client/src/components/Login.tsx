import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Input } from '../styles/Input';
import { loginTs, sendDataTs } from '../api/tsapi';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTK';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/isLoginSlice';
import { loginModal } from '../store/loginModal';
import { setMemberInfo } from '../store/memberInfoSlice';
import { KeyboardEvent } from 'react';
import { getDataTs } from '../api/tsapi';

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
  setIsLoginModal?: (foo: any) => void;
};

function Login({ setIsLoginModal }: LoginInfo) {
  const navigate = useNavigate();
  const [isUserState, setIsUserState] = useState<boolean>(true);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [submitErrorMessage,setSubmitErrorMessage]=useState('');

  //로그인 데이터를 저장하는 redux hook 코드
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.isLogin);
  const memberInfo = useAppSelector(state => state.memberInfo);

  useEffect(() => {
    setNicknameErrorMessage('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setEmail('');
    setNickname('');
    setPassword('');
    setSubmitErrorMessage('');
  }, [isUserState]);

  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    signUpInputHandler();
  }, [nickname, email, password]);

  //todo 버튼 : onClick 핸들러=>빈 필드를 검사하는 함수로 바꿨습니다.
  const requestFieldCheck = () => {
    let pass = true;
    if (!isUserState && !nickname) {
      pass = false;
      setNicknameErrorMessage('닉네임을 입력해주세요');
    }
    if (!email) {
      pass = false;
      setEmailErrorMessage('이메일을 입력해주세요');
    }
    if (!password) {
      pass = false;
      setPasswordErrorMessage('비밀번호를 입력해주세요');
    }
    return pass;
  };

  //로그인 함수입니다.
  const loginRequestHandler = () => {
    if (requestFieldCheck() && !emailErrorMessage && !passwordErrorMessage) {
      console.log('login error 없음');
      const data = { email, password };
      loginTs(data, 'members/login')
        .then(data => {
          getDataTs('members/mypage').then(res => {
            dispatch(setMemberInfo(res.memberInfo));
          });
          // members/login에서 회원정보를 넘겨주지 않음
          // dispatch(setMemberInfo(data));
          dispatch(login());
          navigate('/');
          dispatch(loginModal(false));
        })
        .catch(err => {
          console.log(err)
          if(err.response.status===401) {
            setSubmitErrorMessage(`이메일과 비밀번호를 확인해주세요.`);
          }
          else {
            setSubmitErrorMessage(`로그인에 실패했습니다.`);
          }
        });
      setIsLoginModal && setIsLoginModal(false);
    }
  };

  const loginRequestKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      loginRequestHandler();
    }
  };
  //회원가입 함수입니다.
  const signupRequestHandler = () => {
    if (
      requestFieldCheck() &&
      !nicknameErrorMessage &&
      !emailErrorMessage &&
      !passwordErrorMessage
    ) {
      console.log('signup error 없음');
      const data = { nickname, email, password };
      sendDataTs('members', 'post', data).then(()=>{
        alert('회원가입 되었습니다.')
        window.location.reload();
      }).catch((err)=>{
        if(err.response.data) setSubmitErrorMessage(err.response.data.message);
        else setSubmitErrorMessage('회원가입에 실패했습니다.')
      })
    }
  };

  const signUpInputHandler = () => {
    let emailCheck = true;
    let pwCheck = true;
    //* Email: a@a 형태 아니면? `{loginInfo.email} is not a valid email address.`
    if (
      !isUserState &&
      email.length >= 1 &&
      !email.match(
        /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      )
    ) {
      emailCheck = false;
      setEmailErrorMessage(`${email} 이메일 형식에 맞게 입력해주세요`);
    }

    //* Email: a@a 형태 맞다면 or 로그인 창이라면 에러메시지 초기화
    if (email && emailCheck) {
      setEmailErrorMessage('');
    }

    //* Password: num + letter + symbol
    if (
      !isUserState &&
      password &&
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/
      )
    ) {
      pwCheck = false;
      setPasswordErrorMessage('영문, 숫자, 특수문자를 1개 이상 포함시켜주세요');
    }

    //* Password: 강력 비번형태 맞다면 or 로그인 창이라면 에러메시지 초기화
    if (pwCheck && password) {
      setPasswordErrorMessage('');
    }
    if (!isUserState && pwCheck && password) {
      if (password.length < 8) {
        setPasswordErrorMessage(`8글자 이상 입력해주세요`);
      } else setPasswordErrorMessage('');
    }

    //* 빈칸이면? 에러메시지 초기화
    if (!email) setEmailErrorMessage('');
    if (!password) setPasswordErrorMessage('');
  };

  const socialRequestHandler = () => {
    loginTs({}, 'oauth2/authorization/google')
      .then(data => {
        // members/login에서 회원정보를 넘겨주지 않음
        // dispatch(setMemberInfo(data));
        dispatch(login());
        navigate('/');
        dispatch(loginModal(false));
      })
      .catch(err => console.log(err));
    setIsLoginModal && setIsLoginModal(false);
  };
  return (
    <Background onClick={() => dispatch(loginModal(false))}>
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
            {/* <span onClick={() => setIsLoginModal && setIsLoginModal(false)}> */}
            <span onClick={() => dispatch(loginModal(false))}>&times;</span>
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
                    color={nicknameErrorMessage ? 'red' : 'green'}
                    value={nickname}
                    onChange={nicknameHandler}
                    placeholder="닉네임"
                  ></Input>
                  {nicknameErrorMessage ? (
                    <div className="error">{nicknameErrorMessage}</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ) : null}

            <div className="input_field">
              <Input
                color={emailErrorMessage ? 'red' : 'green'}
                placeholder="이메일"
                value={email}
                onChange={emailHandler}
              ></Input>
              {/* </div> */}
              {emailErrorMessage ? (
                <div className="error">{emailErrorMessage}</div>
              ) : (
                ''
              )}
            </div>
            <div className="input_field">
              <div className="input_mg">
                <Input
                  color={passwordErrorMessage ? 'red' : 'green'}
                  placeholder="비밀번호"
                  type={'password'}
                  value={password}
                  onChange={passwordHandler}
                  onKeyPress={loginRequestKeyPress}
                ></Input>
              </div>
              {passwordErrorMessage ? (
                <div className="error">{passwordErrorMessage}</div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="bottom">
            <div className="login_button">
              {isUserState ? (
                <button
                  className="login_submit login"
                  onClick={loginRequestHandler}
                >
                  로그인
                </button>
              ) : (
                <button
                  className="login_submit signup"
                  onClick={signupRequestHandler}
                >
                  회원가입
                </button>
              )}
              {submitErrorMessage ? (
                    <div style={{padding:'12px'}} className="error">{submitErrorMessage}</div>
                  ) : (
                    ''
                  )}
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
                <button className="goggle" onClick={socialRequestHandler}>
                  구글로 로그인
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Background>
  );
}

export default Login;
