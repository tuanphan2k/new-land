import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Spin } from 'antd'
import * as S from './styled'

const Loading = () => {
  useEffect(() => {
    const el = document.querySelector('#main-wrapper')

    if (el) {
      el.style.zIndex = '1002'

      return () => {
        el.style.zIndex = 'initial'
      }
    }
  }, [])

  return createPortal(
    <S.Wrapper>
      <Spin size="large" />
    </S.Wrapper>,
    document.body
  )
}

export default Loading
