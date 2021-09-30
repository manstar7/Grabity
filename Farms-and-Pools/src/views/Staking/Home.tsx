import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Heading, Text, BaseLayout,CardBody,Image,Flex, Card, AddIcon } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'

import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import staking from 'config/constants/staking'
import StakingCard from 'views/Staking/components/StakingCard'
import DetailsSection from 'views/Staking/components/DetailsSection'

import UnlockButton from 'components/UnlockButton'
import { useTotalValue } from '../../state/hooks'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const Hero = styled.div`
  align-items: center;
  // background-image: url('/images/egg/3.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/home.png'), url('/images/home.png');
    // background-position: left center, right center;
    // height: 300px;
    // padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const CardsLarge = styled(BaseLayout)`
  align-items: stretch;
  justify-self: center;
  margin-bottom: 32px;

  & > div {
    grid-column: span 12;
    width: 100%;
    text-align: center;

  }
`

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
  border-radius:10px;
  margin-top:20px;
  margin-bottom:20px;
  background-color: ${({ theme }) => theme.colors.backgroundDisabled}
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`



const Home: React.FC = () => {
  const TranslateString = useI18n()
  const totalValue = useTotalValue();
  const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  
  // const totalValue: BigNumber = useMemo(() => {
  //   if (!farm.lpTotalInQuoteToken) {
  //     return null
  //   }
  //   if (farm.quoteTokenSymbol === QuoteToken.BNB) {
  //     return bnbPrice.times(farm.lpTotalInQuoteToken)
  //   }
  //   if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
  //     return cakePrice.times(farm.lpTotalInQuoteToken)
  //   }
  //   return farm.lpTotalInQuoteToken
  // }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  // const totalValueFormated = totalValue
  //   ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  //   : '-'

  // const lpLabel = farm.lpSymbol
  // const earnLabel = 'GBT'
  // const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // })

  // const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm


  return (
    <Page className="px-0">
       <div className="banner_swap_bg">
      <Heading as="h1" size="lg" className="h1_big" color="color_blue" mb="20px" style={{ textAlign: 'left' }}>
        {
          
          TranslateString(320, 'Stake Swap')
        }
      </Heading>
     
      <Heading as="h2" color="colrblk" mb="0px" style={{ textAlign: 'left', fontSize:'18px' }}>
        {TranslateString(10000, 'Stake & burn assets to earn rewards')}
      </Heading>
      </div>
      <div className="px-left-right">
        {/* <CardsLarge>
          <VisionCard />
        </CardsLarge> */}
        <div className="stake_row">

        <CardsLarge className="stake_row">
        {
          
          staking.map((stake)=>
          <StakingCard
          key={stake.pid}
          pid={stake.pid}
          tokenAddress={stake.tokenAddresses[CHAIN_ID]}
          tokenSymbol={stake.tokenSymbol}
          quoteTokenSymbol={stake.quoteTokenSymbol}
          quoteTokenAdresses={stake.quoteTokenAdresses[CHAIN_ID]}
          lpAddress={stake.lpAddress[CHAIN_ID]}
          contractAddress={stake.contractAddress[CHAIN_ID]}
          ethereum={ethereum}
          account={account}
           />      
          )}
        </CardsLarge>

     
        </div>
      </div>
    </Page>
  )
}

export default Home

