import React from 'react'
import styled, { css } from 'styled-components'

import { formatBigNumber } from '../../../util/tools'
import { BalanceItem, OutcomeTableValue, Token } from '../../../util/types'
import { BarDiagram, RadioInput, TD, TH, THead, TR, Table } from '../../common'

interface Props {
  balances: BalanceItem[]
  collateral: Token
  disabledColumns?: OutcomeTableValue[]
  displayRadioSelection?: boolean
  outcomeHandleChange?: (e: number) => void
  outcomeSelected?: number
  probabilities: number[]
  withWinningOutcome?: boolean
}

const TableWrapper = styled.div`
  margin-left: -${props => props.theme.cards.paddingHorizontal};
  margin-right: -${props => props.theme.cards.paddingHorizontal};
  margin-top: 20px;
`

const PaddingCSS = css`
  padding-left: 25px;
  padding-right: 0;

  &:last-child {
    padding-right: 25px;
  }
`

const THStyled = styled(TH)`
  ${PaddingCSS}
`

const TDStyled = styled(TD)`
  ${PaddingCSS}
`
const TDRadio = styled(TD)`
  ${PaddingCSS}
  width: 20px;
`

export const OutcomeTable = (props: Props) => {
  const {
    balances,
    collateral,
    probabilities,
    outcomeSelected,
    outcomeHandleChange,
    disabledColumns = [],
    withWinningOutcome = false,
    displayRadioSelection = true,
  } = props

  const TableHead: OutcomeTableValue[] = [
    OutcomeTableValue.Probabilities,
    OutcomeTableValue.CurrentPrice,
    OutcomeTableValue.Shares,
    OutcomeTableValue.Payout,
  ]

  const TableCellsAlign = ['left', 'right', 'right', 'right', 'right', 'right']

  const renderTableHeader = () => {
    return (
      <THead>
        <TR>
          {TableHead.map((value, index) => {
            return !disabledColumns.includes(value) ? (
              <THStyled
                colSpan={index === 0 && displayRadioSelection ? 2 : 1}
                key={index}
                textAlign={TableCellsAlign[index]}
              >
                {value}
              </THStyled>
            ) : null
          })}
        </TR>
      </THead>
    )
  }

  const renderTableRow = (balanceItem: BalanceItem, outcomeIndex: number) => {
    const { currentPrice, outcomeName, shares } = balanceItem
    const currentPriceFormatted = Number(currentPrice).toFixed(4)
    const probability = probabilities[outcomeIndex]

    return (
      <TR key={outcomeName}>
        {!displayRadioSelection || withWinningOutcome ? null : (
          <TDRadio textAlign={TableCellsAlign[0]}>
            <RadioInput
              checked={outcomeSelected === outcomeIndex}
              data-testid={`outcome_table_radio_${balanceItem.outcomeName}`}
              name="outcome"
              onChange={(e: any) => outcomeHandleChange && outcomeHandleChange(+e.target.value)}
              outcomeIndex={outcomeIndex}
              value={outcomeIndex}
            />
          </TDRadio>
        )}
        {disabledColumns.includes(OutcomeTableValue.Probabilities) ? null : withWinningOutcome ? (
          <TDStyled textAlign={TableCellsAlign[1]}>
            <BarDiagram outcomeIndex={outcomeIndex} outcomeName={outcomeName} probability={probability} />
          </TDStyled>
        ) : (
          <TDStyled textAlign={TableCellsAlign[1]}>
            <BarDiagram outcomeIndex={outcomeIndex} outcomeName={outcomeName} probability={probability} />
          </TDStyled>
        )}
        {disabledColumns.includes(OutcomeTableValue.CurrentPrice) ? null : withWinningOutcome ? (
          <TDStyled textAlign={TableCellsAlign[2]}>
            {currentPriceFormatted} <strong>{collateral.symbol}</strong>
          </TDStyled>
        ) : (
          <TDStyled textAlign={TableCellsAlign[2]}>
            {currentPriceFormatted} <strong>{collateral.symbol}</strong>
          </TDStyled>
        )}
        {disabledColumns.includes(OutcomeTableValue.Shares) ? null : withWinningOutcome ? (
          <TDStyled textAlign={TableCellsAlign[3]}>{formatBigNumber(shares, collateral.decimals)}</TDStyled>
        ) : (
          <TDStyled textAlign={TableCellsAlign[3]}>{formatBigNumber(shares, collateral.decimals)}</TDStyled>
        )}
        {disabledColumns.includes(OutcomeTableValue.Payout) ? null : withWinningOutcome ? (
          <TDStyled textAlign={TableCellsAlign[4]}>{formatBigNumber(shares, collateral.decimals)}</TDStyled>
        ) : (
          <TDStyled textAlign={TableCellsAlign[4]}>{formatBigNumber(shares, collateral.decimals)}</TDStyled>
        )}
      </TR>
    )
  }

  const renderTable = () =>
    balances
      .sort((a, b) => (a.winningOutcome === b.winningOutcome ? 0 : a.winningOutcome ? -1 : 1)) // Put winning outcome first
      .map((balanceItem: BalanceItem, index) => renderTableRow(balanceItem, index))

  return (
    <TableWrapper>
      <Table head={renderTableHeader()} maxHeight="332px">
        {renderTable()}
      </Table>
    </TableWrapper>
  )
}
