import React, { Component } from "react";
import styled from "styled-components";

const AdaptBodyBox = styled.div<{scale: string; height: number; width: number; equalProportion: boolean}>`
  height: 100%;
  width: 100%;
  overflow: auto;
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
    transition: transform .3s ease-out;
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
 * 适应固定比例缩放组件,使用父元素设置宽高，可自适应 adaptive属性优先与 equalProportion
 * @author majunfeng
 * @date 13/01/2022
 * @export
 * @class AdaptBox
 * @extends {Component<Props, State>}
 */
export class AdaptBox extends Component<Props, State> {
  static defaultProps = {
    adaptive: true,
    equalProportion: false,
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
    const domBox = document.getElementById("adapt_body_box") as HTMLElement;
    const realWidth = domBox.offsetWidth || window.document.body.clientWidth;
    const realHeight = domBox.offsetHeight || window.document.body.clientHeight;
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
