import styled from "styled-components";

export const TopBarStyled = styled.div`
width: 100%;
height: 100%;
background-color: rgb(22, 119, 255);
padding-left: 45px;
display: flex;
justify-content: space-between;
.company-name {
  color: #fff;
  height: 100%;
  display: table;
  span {
    display: table-cell;
    vertical-align: middle;
  }
}
.user {
  height: 100%;
  display: flex;
  margin-right: 20px;
  align-items: center;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #ae9f9f
  }
  transition: all .5s;
  .img {
    padding-right: 5px;
    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }
  .name {
    padding-right: 5px;
    font-family: monospace;
    font-size: large;
  }
}
`