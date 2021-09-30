import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text,Image, CardFooter } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledFarmStakingCard = styled(Card)`
  
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 30px;
`

const FarmedStakingCard = () => {
  const TranslateString = useI18n()
    const totalSupply = useTotalSupply()
    const burnedBalance = useBurnedBalance(getCakeAddress())
    const farms = useFarms();
    const eggPrice = usePriceCakeBusd();
    const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
    const cakeSupply = getBalanceNumber(circSupply);
    const marketCap = eggPrice.times(circSupply);
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])



  return (
    <StyledFarmStakingCard className="white_box vision_card_panel">
      <CardBody>
      <div className="flex_tot align_center mt-0">
        <div>
        <p className="img_div">
      <Image src='/images/egg/logo.png' width={45} height={45} />
      <Text color="text" className="ml-2">GBT</Text>
      </p>
        </div>
        <div>
        <p className="img_div just_end">
     <Text color="text">0.65</Text>
      <span className="coin_name_color ml-2">USD</span>
      </p>
        </div>
        </div>

        <div className="flex_tot align_center mt-0 flex_sm">
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
        </div>
        <Row>
          <Text color="card_small" style={{ fontWeight: 600, fontSize: "16px" }}>{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue color="contrast" fontSize="18px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text color="card_small" style={{ fontWeight: 600, fontSize: "16px" }}>{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="18px" color="contrast" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text color="card_small" style={{ fontWeight: 600, fontSize: "16px" }}>{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue color="contrast" fontSize="18px" value={cakeSupply} decimals={0} />}
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
      <div className="flex_tot align_center mt-0 flex_sm pos_end">
        <div>
        <p className="img_div">
        <Button as="a" href="#" variant="secondary" className="btnh_trans">
        <Image src='/images/egg/globe.png' width={15} height={15} />
      <span className="coin_name_color">Official Website</span>
          </Button>
       
      </p>
        </div>
        <div>
        <p className="img_div just_end flex_sm">
        <Button as="a" href="#" variant="secondary" className="btnh_trans btn_end">
      <Image src='/images/egg/scan.png' width={15} height={15} />
      <span className="sacn_color">BscScan</span>
      </Button>
      </p>
        </div>
        </div>
      </CardFooter>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
