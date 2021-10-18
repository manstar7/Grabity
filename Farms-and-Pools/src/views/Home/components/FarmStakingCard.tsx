import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  // background-image: url('/images/coin_bg_01.png');
  // background-repeat: no-repeat;
  // background-position: top right;
  // min-height: 376px;
  border-radius:10px;
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

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
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
    <StyledFarmStakingCard className="mb-10 card_radius">
      <CardBody>
        <Heading size="xl" mb="24px" className="hvd_comic_serif card_3_tiele" color="text">
          {TranslateString(542, 'Total Value Warped')}
        </Heading>
        <Block className="mb-0">
          <div className="mt-0 mb-0">
            <div>
            <p className="text_warp_txt">
          <Label color="card_small" className="label_color">$63,192,028.93</Label>

          </p>
          <p className="text_subtitle">Assets bridged from ETH to BSC on Warp</p>
            </div>
          
          </div>
          {/* <Heading color="card_small" className="card_title" size="md">
            {TranslateString(544, 'Tokens to Harvest')}:
          </Heading> */}
         
        </Block>
        {/* <Block>
          <Heading color="card_small" size="md" className="card_title">
            {TranslateString(546, 'Tokens to Supply')}:
          </Heading>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label className="label_color">~${(eggPrice * cakeBalance).toFixed(2)}</Label>
        </Block> */}
       
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
