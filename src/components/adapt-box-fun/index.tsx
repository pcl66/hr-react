import { useEffect, useState } from 'react'
import styled from 'styled-components'

type P = {
  // 开启自适应
  adaptive?: boolean
  // 等比例缩放
  equalProportion?: boolean
  designWidth?: number
  designHeight?: number
  children?: React.ReactNode
}

const AdaptBoxFunStyled = styled.div<{ width: number; height: number; scale: string; equalProportion: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .adapt-box {
    position: absolute;
    width: ${p => p.width}px;
    height: ${p => p.height}px;
    top: 0;
    transform-origin: ${props => (props.equalProportion ? 'top center' : 'top left')};
    left: ${props => (props.equalProportion ? '50%' : 0)};
    transform: ${props => (props.equalProportion ? `translateX(-50%) scale(${props.scale})` : `scale(${props.scale})`)};
  }
`

export const AdaptBoxFun: React.FC<P> = p => {
  // 设计稿宽/高
  const { designWidth = 1920, designHeight = 1080, adaptive = true, equalProportion = false } = p
  const [scale, setScale] = useState<string>('1')
  useEffect(() => {
    hResize()
    window.addEventListener('resize', hResize)
    return () => {
      window.removeEventListener('resize', hResize)
    }
  }, [])
  function hResize() {
    let adaptBox = document.getElementById('adapt_body_box') as HTMLElement
    const adaptBoxWidth = adaptBox.offsetWidth || window.document.body.clientWidth
    const adaptBoxHeight = adaptBox.offsetHeight || window.document.body.clientHeight
    const getDesignWidth = designWidth
    const getDesignHeight = designHeight
    // 自适应
    if (adaptive) {
      console.log('xxxx')
      setScale(`${adaptBoxWidth / getDesignWidth}, ${adaptBoxHeight / getDesignHeight}`)
      return
    }
    // 等比例
    if (equalProportion) {
      const realRatio = adaptBoxWidth / adaptBoxHeight
      const designRatio = designWidth / designHeight
      if (realRatio > designRatio) {
        // 实际画面更宽
        setScale((adaptBoxHeight / getDesignHeight).toString())
        return
      }
      // 实际画面更窄
      setScale((adaptBoxWidth / getDesignWidth).toString())
      return
    }
    setScale('1')
  }
  return (
    <AdaptBoxFunStyled width={designWidth} height={designHeight} scale={scale} equalProportion={equalProportion} id='adapt_body_box'>
      <div className='adapt-box'>{p.children}</div>
    </AdaptBoxFunStyled>
  )
}
