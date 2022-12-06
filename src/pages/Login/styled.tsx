import styled from "styled-components";

export const LoginStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://gw.alipayobjects.com/mdn/rms_47ffb9/afts/img/A*GhnvTJlc6W8AAAAAAAAAAAAAARQnAQ');
  background-size: 100% 100%;
  .login {
    width: 500px;
    height: 400px;
    /* border: 1px solid black; */
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff44;
    /* border-radius: 3px; */
    border-radius: 36% 64% 41% 59% / 46% 50% 50% 54% ;
    /* &:hover {
      animation: move 10s infinite;
    } */
    animation: move 10s infinite;
    @keyframes move {
      0% {
        border-radius: 36% 64% 41% 59% / 46% 50% 50% 54% ;
      }
      25% {
        border-radius: 62% 38% 67% 33% / 37% 58% 42% 63% ;
      }
      50% {
        border-radius: 56% 44% 68% 32% / 35% 61% 39% 65% ;
      }
      75% {
        border-radius: 39% 61% 38% 62% / 50% 32% 68% 50% ;
      }
      100% {
        border-radius: 36% 64% 41% 59% / 46% 50% 50% 54% ;
      }
    }
  }
  
`