import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const ListStyled = styled.div`
  .content {
    width: 300px;
    height: 400px;
    overflow: auto;
    /* position: relative; */
    .vis-content {
      .item {
        height: 20px;
      }
      position: absolute;
      top: 0px;
      width: 280px;
      height: 400px;
    }
  }
`

export const List = () => {
  const [data, setData] = useState<any>([])
  const [start, setStart] = useState(0)
  const [showData, setShowData] = useState([])
  const scrollTop = useRef(0)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    let listAll = []
    for (let i = 0; i < 100; i++) {
      listAll.push(`我是第${i}条数据呀`)
    }
    setData(listAll)
    contentRef.current?.addEventListener('scroll', e => {
      console.log(contentRef.current?.scrollTop)
      scrollTop.current = contentRef.current?.scrollTop || 0
      let start = Math.ceil(scrollTop.current / 20)
      console.log('start', start)
      console.log('start', listAll.slice(start, start + 21))
      // setStart(start)
      setShowData(listAll.slice(start, start + 21))
    })
  }, [])
  useEffect(() => {
    setShowData(data.slice(start, start + 21))
  }, [data])
  return (
    <ListStyled>
      <div className='content' ref={contentRef} >
        <div className='real' style={{ height: `${data.length * 20}px` }}>
          <div className='vis-content'>
            {showData.map((v: any, i: number) => (
              <div className='item' ref={itemRef} key={i}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ListStyled>
  )
}
