import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import img1 from './imgs/1.jpg'
import img2 from './imgs/2.jpg'
import img3 from './imgs/3.jpg'
import img4 from './imgs/4.jpg'
import img5 from './imgs/5.jpg'
import img6 from './imgs/6.jpg'
import img7 from './imgs/7.jpg'

const CarouselStyled = styled.div<{ step: number }>`
  .carousel-main {
    width: 200px;
    height: 150px;
    border: 1px solid black;
    /* display: flex; */
    overflow: hidden;
    position: relative;
    .nav {
      position: absolute;
      /* width: 150px; */
      height: 10px;
      /* border: 1px solid black; */
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      display: flex;
      padding: 0;
      margin: 0;
      margin-bottom: 5px;
      z-index: 1;
      .dot {
        width: 7px;
        height: 7px;
        margin: 0 2px;
        list-style: none;
        background-color: black;
        border-radius: 50%;
        cursor: pointer;
      }
      .active {
        background-color: #fff;
      }
    }
    .xxx {
      /* width: 100%; */
      height: 100%;
      position: relative;
      display: flex;
      /* overflow: hidden; */
      flex-wrap: nowrap;
      .img {
        width: 200px;
        /* height: 100%; */
      }
      transform: translateX(${p => p.step}px);
      transition: all 0.5s;
    }
    .prev,
    .next {
      position: absolute;
      background-color: #e4cdcd;
      border-radius: 3px;
      cursor: pointer;
      z-index: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .prev {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .next {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

const imgList = [
  {
    src: img1,
    id: 0
  },
  {
    src: img2,
    id: 1
  },
  {
    src: img3,
    id: 2
  },
  {
    src: img4,
    id: 3
  },
  {
    src: img5,
    id: 4
  },
  {
    src: img6,
    id: 5
  },
  {
    src: img7,
    id: 6
  }
]

type P = {
  autoPlay: boolean
}

export const Carousel: React.FC<P> = p => {
  const [slides, setSlides] = useState(imgList)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const curIndex = useRef(0)
  const [step, setStep] = useState<number>(0)
  const nextRef = useRef<HTMLDivElement | null>(null)
  const time = useRef(-1)
  useEffect(() => {
    if (p.autoPlay) {
      hPlay()
      return () => {
        clearInterval(time.current)
      }
    }
  }, [])
  // 开始自动轮播

  // 暂停自动轮播

  // 跳转到指定位置
  const goTo = (index: number) => {
    curIndex.current = index
    setStep(-(index * 200))
  }
  const hPrevClick = () => {
    if (curIndex.current === 0) {
      goTo(slides.length - 1)
      return
    }
    curIndex.current--
    // setCurrentIndex((last) => last - 1)
    setStep(last => last + 200)
  }
  const hNextClick = () => {
    console.log('currentIndex', curIndex.current)
    if (curIndex.current === slides.length - 1) {
      goTo(0)
      return
    }
    curIndex.current++
    // setCurrentIndex((last) => last + 1)
    setStep(last => last - 200)
  }
  const hPause = () => {
    console.log('鼠标进来了')
    clearInterval(time.current)
  }
  const hPlay = () => {
    time.current = setInterval(() => {
      if (curIndex.current === slides.length - 1) {
        goTo(0)
        return
      }
      nextRef.current?.click()
    }, 1000)
  }
  return (
    <CarouselStyled step={step}>
      <div className='carousel-main' onMouseEnter={hPause} onMouseLeave={hPlay}>
        <div className='prev' onClick={hPrevClick}>
          {'<'}
        </div>
        <div ref={nextRef} className='next' onClick={hNextClick}>
          {'>'}
        </div>
        <ul className='nav'>
          {slides.map((v, i: number) => (
            <li
              onClick={() => {
                goTo(i)
              }}
              className={`dot ${curIndex.current === i ? 'active' : ''}`}
              key={v.id}></li>
          ))}
        </ul>
        <div className='xxx'>
          {slides.map(v => (
            <img className='img' key={v.id} src={v.src}></img>
          ))}
        </div>
      </div>
    </CarouselStyled>
  )
}
