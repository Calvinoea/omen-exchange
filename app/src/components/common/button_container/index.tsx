import React, { ReactNode, HTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 30px;

  > button {
    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      margin-left: 10px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
`

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ButtonContainer = (props: Props) => {
  const { children, ...restProps } = props

  return <Wrapper {...restProps}>{children}</Wrapper>
}
