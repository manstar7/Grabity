import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton, Text } from '@pancakeswap-libs/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'
// import { getFarmApy } from 'utils/apy'
// import { useFarms, usePriceCakeBusd, useGetApiPrices } from 'state/hooks'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farms = useFarms();
  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledFarmStakingCard className="white_box card_heigh_fifty card_radius">
      <CardBody>
        <Text color="textSubtle" className="card_3_tiele mb-emsi">
          Current Emissions
        </Text>
        {/* <Text color="card_small" style={{ fontWeight: 600, fontSize: "16px" }}>{TranslateString(540, 'New Supply/block')}</Text> */}
          <Text bold fontSize="25px" color="contrast" className='mb-35'>{eggPerBlock} GBT <span className='emissionsgrayblock'>/ Block </span></Text>
        {/* <CardMidContent color="secondary" className="hvd_comic_serif">
          
          <Heading color="textblack" className="hvd_comic_serif text_big_val" size="xl">413.43% APR</Heading>
        </CardMidContent>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="textblack" className="card_3_subtiele">
            in Farms
          </Text>
       
        </Flex> */}
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
