import React, { Component } from "react";
import styled from "styled-components";

// tslint:disable-next-line:completed-docs
const AdaptBodyBox = styled.div<{scale: string; height: number; width: number; equalProportion: boolean}>`
  height: 100vh;
  width: 100vw;
  overflow: hidden visible;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .adapt-border{
    position: absolute;
    left: ${props => props.equalProportion ? "50%" : 0};
    top: 0;
    transform-origin: ${props => props.equalProportion ? "top center" : "top left"};
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    transform: ${props => props.equalProportion ? `translateX(-50%) scale(${props.scale})` : `scale(${props.scale})`};
    /* transition: transform 1s ease-out; */
  }
`;
interface Props {
  /** 开启自适应，宽高有变形的情况 */
  adaptive: boolean;
  /** 等比例缩放 */
  equalProportion: boolean;
  /** 设计的宽度 */
  designWidth: number;
  /** 设计高度 */
  designHeight: number;
  /** 传入子元素 */
  children: React.ReactNode;
}
interface State {
  /** 缩放比例 */
  scale: string;
}
/**
 * 适应固定比例缩放组件，greaterWidth:优先级高；可自适应 adaptive属性优先与 equalProportion
 * @author 马俊峰
 * @date 2020-03-23
 * @export
 * @class AdaptBody
 * @extends {Component<Props, State>}
 */
export class AdaptBody extends Component<Props, State> {
  static defaultProps = {
    adaptive: false,
    equalProportion: false,
    // designWidth: 2560,
    // designHeight: 1440,
    designWidth: 1920,
    designHeight: 1080,
  };
  state: State = {
    scale: "1",
  };
  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    const { scale } = this.state;
    const { designWidth, designHeight, equalProportion } = this.props;
    return(
      <AdaptBodyBox scale={scale} height={designHeight} width={designWidth} equalProportion={equalProportion} id="adapt_body_box">
        <div className="adapt-border">{this.props.children}</div>
      </AdaptBodyBox>
    );
  }
  /** 调整尺寸事件 */
  onResize = () => {
    const { adaptive, designWidth, designHeight, equalProportion } = this.props;
    const realWidth = window.document.body.clientWidth;
    const realHeight = window.document.body.clientHeight;
    const getDesignWidth = designWidth;
    const getDesignHeight = designHeight;
    if (adaptive) {
      this.setState({ scale: `${realWidth / getDesignWidth}, ${realHeight / getDesignHeight}` });
    } else if (equalProportion) {
      const designSreenRatio = designWidth / designHeight;
      const realScreenRatio = realWidth / realHeight;
      if (realScreenRatio > designSreenRatio) {
        // 实际画面更宽
        this.setState({ scale: `${realHeight / designHeight}` });
      } else {
        // 实际画面更窄
        this.setState({ scale: `${realWidth / designWidth}` });
      }
    } else {
      this.setState({ scale: "1" });
    }
  }
}
