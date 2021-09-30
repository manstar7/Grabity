import React, { useState, useCallback }from 'react'
import { Card, CardBody, Heading, Text,  Button } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { useAllHarvest } from 'hooks/useHarvest'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  // background-image: url('/images/coin_bg_02.png');
  // background-repeat: no-repeat;
  // background-position: bottom right;
  min-height: 376px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 30px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`
const CakeStats = () => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const totalSupply = useTotalSupply()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd().toNumber()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  // const marketCap = eggPrice.times(circSupply);
  const farmsWithBalance = useFarmsWithBalance()

  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }
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
    <StyledCakeStats className="card_radius min_h_unset">
        <CardBody>
       <Heading size="xl" mb="24px" className="hvd_comic_serif card_3_tiele" color="text">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>

         <Heading color="card_small" className="card_title" size="md">
            {TranslateString(544, 'Tokens to Harvest')}:
          </Heading>
        <Block className="mb-0">
          <div className="flex_tot flex_to_new align_center mt-0 mb-0">
            <div>
            <p className="card_sub_text_grey">
          <Label color="card_small" className="label_color">~${(eggPrice * earningsSum).toFixed(2)}</Label>

          </p>
            </div>
            <div className="float_right">
            <CakeHarvestBalance earningsSum={earningsSum} />

            </div>
           
          </div>
         
         
        </Block>

        <Heading color="card_small" className="card_title" size="md">
            {TranslateString(544, 'Tokens to Supply')}:
          </Heading>
        <Block className="mb-0">
          <div className="flex_tot flex_to_new align_center mt-0 mb-0">
            <div>
            <p className="card_sub_text_grey">
            <CakeWalletBalance cakeBalance={cakeBalance} />

        
          </p>
            </div>
            <div>
            <Label className="label_color float_right">~${(eggPrice * cakeBalance).toFixed(2)}</Label>
        </div>
          </div>
         
         
        </Block>

         <div>
          <Actions className="actiob_dib_ma">
          {account ? (
            <Button className="btn_yellow"
              id="harvest-all"
            
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting GBT')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton className="btn_yellow" fullWidth />
          )}
        </Actions>
        </div>


        
        </CardBody>
      
       
    </StyledCakeStats>
  )
}

export default CakeStats
