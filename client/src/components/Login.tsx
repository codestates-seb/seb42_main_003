import styled from 'styled-components';
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 998;
`;
export const Container = styled.div`
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
  .header {
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
    /* margin: 20px 0; */
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
    border: 2px solid var(--darkGreen__color);
    width: 100%;
    height: 3.5em;
    border-radius: 12px;
    margin-bottom: 15px;
  }
  input {
    height: 100%;
    width: 100%;
    padding-left: 10px;
    ::placeholder {
      vertical-align: center;
    }
  }
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
`;
type LoginInfo = {
  setIsLogin: (foo: any) => void;
};

function Login({ setIsLogin }: LoginInfo) {
  const [isUserState, setIsUserState] = useState<boolean>(true);
  return (
    <Background onClick={() => setIsLogin(false)}>
      <Container onClick={e => e.stopPropagation()}>
        <div className="header">
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
        <div className="mid">
          <div className="hello">
            {isUserState ? '환영합니다 🎉' : '🚗 차박 여행지는 차몽에서'}
          </div>
          {!isUserState ? (
            <div className="input_field">
              <input placeholder="닉네임"></input>
            </div>
          ) : null}
          <div className="input_field">
            <input placeholder="이메일"></input>
          </div>
          <div className="input_field">
            <input placeholder="비밀번호"></input>
          </div>
        </div>
        <div className="bottom">
          <div className="login_button">
            <button className="login_submit">
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
      </Container>
    </Background>
  );
}

export default Login;
