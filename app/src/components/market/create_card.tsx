import React, { HTMLAttributes } from 'react'
import { Card } from '../common/card'
import styled from 'styled-components'

const CardStyled = styled(Card)`
  margin: 0 auto;
  max-width: ${props => props.theme.createSteps.maxWidth};
  width: 100%;
`

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CreateCard: React.FC<Props> = (props: Props) => {
  const { children, ...restProps } = props
  return <CardStyled {...restProps}>{children}</CardStyled>
}
