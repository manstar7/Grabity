import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text,Progress, Input } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`

  align-items: center;
  display: flex;
  flex: 1;
`
// console.log(props.theme.colors)
const TicketsVal = styled.div`
  width:10px;
  height:10px;
  display:inline-block;
  margin-right:5px;
  background-color: ${(props) => props.theme.colors.contrast};
`
const PoolsVal = styled.div`
  width:10px;
  height:10px;
  display:inline-block;
  margin-right:5px;
  border-width:1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.input};
  background-color: ${(props) => props.theme.colors.input};

`


const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue();
 // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard className="card_radius card_totla">
      <CardBody>       
        <Text color="textSubtle" className="card_3_tiele">
          {TranslateString(762, 'Total Value Locked')}
        </Text>
        <>
          {/* <Heading size="xl">{`$${tvl}`}</Heading> */}
          <p className="text_big_val">
          <CardValue value={totalValue.toNumber()} prefix="$" decimals={2}/>
          </p>
          <div className="progres_theme">
          <Progress primaryStep={50} showProgressBunny />
          </div>
          <div className="flex_tot">
            <div>
              <p className="val_ref">
                <TicketsVal className="check_total"  />
                <Text color="textSubtle">Refinery</Text>

                </p>
                <Text color="textSubtle" className="ref_pl">$21,235,345.42</Text>
            </div>
            <div>
              <p className="val_ref">
                <PoolsVal className="check_total" />
                <Text color="textSubtle">Staking Pools</Text>

                </p>
                <Text color="textSubtle" className="ref_pl">$4,156,896.96</Text>
            </div>
          </div>
          {/* <Heading color="textblack" className="hvd_comic_serif" size="xl">Supply,

sfp, Lina,</Heading> */}
          {/* <Text color="textblack" className="card_3_subtiele">{TranslateString(999, 'Across all LPs and Pools')}</Text> */}
        </>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
