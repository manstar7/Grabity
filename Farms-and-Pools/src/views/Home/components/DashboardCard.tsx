import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text,Progress, Input,Button,Image, CardFooter } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledTotalValueLockedCard = styled(Card)`

  align-items: center;
  display: flex;
  flex: 1;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 10px;
`




const DashboardCard = () => {
  // const data = useGetStats()
//   const totalValue = useTotalValue();

  const TranslateString = useI18n()
    const totalSupply = useTotalSupply()
    const burnedBalance = useBurnedBalance(getCakeAddress())
    const farms = useFarms();
    const eggPrice = usePriceCakeBusd();
    const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
    const cakeSupply = getBalanceNumber(circSupply);
    const marketCap = eggPrice.times(circSupply);
 // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard className="card_radius card_totla vision_card_panel">
     <CardBody>
      <div className="flex_tot align_center mt-0">
        <div>
        <p className="img_div">
      <Image src='/images/egg/logo.png' width={45} height={45} />
      <Text color="text" className="ml-2 text_big_dash">GBT</Text>
      </p>
        </div>
        <div>
        <p className="img_div just_end">
     <Text color="text">0.65</Text>
      <span className="coin_name_color ml-2">USD</span>
      </p>
        </div>
        </div>

        {/* <div className="flex_tot align_center mt-0 flex_sm">
        <div>
        <p className="img_div">
        <Text color="text">Circulating Supply</Text>
      <span className="coin_name_color">23,000,000 GBT</span>
      </p>
        </div>
        <div>
        <p className="img_div just_end flex_sm">
     <Text color="text">Market Cap</Text>
      <span className="coin_name_color">$289,878.78</span>
      </p>
        </div>
        </div> */}
        <Row className="card_sm_grey_clr">
        <Text color="card_small" style={{ fontWeight: 600, fontSize: "16px" }}>{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue color="contrast" fontSize="16px" value={cakeSupply} decimals={0} />}
        </Row>
      
        <Row className="card_sm_grey_clr">
          <Text color="card_small" style={{ fontWeight: 600, fontSize: "16px" }}>{TranslateString(10004, 'Market Cap')}</Text>
          <CardValue color="contrast" fontSize="16px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        {/* <Heading size="md" mb="15px"  style={{ fontWeight: 400, fontSize: "24px", fontFamily: "Roboto', sans-serif" }}>
          {TranslateString(542, 'What is the vision of ddexx.?')}
        </Heading>
        <Text mb="15px" color="secondary" style={{ fontSize: "20px", fontFamily: "Roboto', sans-serif" }}>The Healthiest Exchange on the Binance Smart Chain</Text>
        <Heading size="md">
          <a className="hvd_comic_serif" style={{ fontSize: "30px" }} href="https://ddexx..medium.com/">{TranslateString(542, 'Check it Out!')}</a>
        </Heading>      */}
      </CardBody>
      <CardFooter>
        <div className="sell-footer d-flex justify-content-between align-items-center">
          <div className="sell-ow">
            <a href="https://grabity.org/">
            <img src="/images/egg/world.png" alt=""/>Official Website</a>
          </div>
          <div className="sell-bsc">
            <a href="https://bscscan.com/token/0xa4b0574D8634B9514e89174c67400F5F947d1dd1">
              <img src="/images/egg/scan.png" alt=""/>BscScan</a>
          </div>
        </div>
      </CardFooter>
    </StyledTotalValueLockedCard>
  )
}

export default DashboardCard
