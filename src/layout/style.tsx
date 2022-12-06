import styled from 'styled-components'

export const LayoutStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  .side-bar {
    width: 12%;
    transition: all 0.4s;
  }
  .off {
    width: 80px;
    transition: all 0.4s;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    .top-bar {
      height: 45px;
    }
    .content {
      flex: 1;
      padding: 20px;
      background-color: #f4f2f2;
    }
  }
`