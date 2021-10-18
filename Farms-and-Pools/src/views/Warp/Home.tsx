import addresses from 'config/constants/contracts'
import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Heading, Text, BaseLayout,CardBody,Image,Flex, Card, AddIcon, Button, useModal } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useWarps from 'hooks/useWarps'
import useWarpBalance from 'hooks/useWarpBalance'
import useWarpApprove from 'hooks/useWrapApprove'
import useWeb3 from 'hooks/useWeb3'
import useI18n from 'hooks/useI18n'
import warpJSON from 'config/abi/wrap.json'
import erc20 from 'config/abi/erc20.json'
import Page from 'components/layout/Page'
import UnlockButton from 'components/UnlockButton'
import { AbiItem } from 'web3-utils'
import LaunchpadModal from './components/LaunchpadModal'

import { useTotalValue } from '../../state/hooks'





const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

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
const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const Fromcard = styled.div`
background-color:#f7f4f412;
border-radius:5px; 
margin-top: 20px;
padding: 15px 10px;
border:1px solid #49484829;
box-shadow:inset 0px 2px 2px -1px rgb(74 74 104 / 10%);
margin-bottom:20px;
text-align:center

`


const Home: React.FC = () => {
  const TranslateString = useI18n()
  const totalValue = useTotalValue();
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
 
  const web3 = useWeb3()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [tokenBalance,settokenBalance] = useState(0)
  const [userInput,setuserInput] = useState('') 
  const [isApproved,setisApproved] = useState(false) 

  const [token,SetToken] = useState({
    symbol: "GBT",
    tokenAddress: addresses.Wrap[CHAIN_ID]
  })

  
  const { onWrap } = useWarps()
  const { onBalance } = useWarpBalance()
  if(account){
    const balance = onBalance().then((user) => {
      user.balance.then((data)=>{
      settokenBalance(data)
      })
      user.allowance.then((data)=>{
        if(data > 100)
      setisApproved(true)
      })
      
    });
  }
  const { onWrapApprove } = useWarpApprove()
  console.log("Balance : ",tokenBalance)
  const toWholeNumber = (value) => {
    const num = new BigNumber(value * 10 ** 18)
    return num.toString();
  }

  const warpSuccess = async(value)=>{
    console.log("data ===== .> pre ")
    onWrap(value).then((dataHash)=>{
      console.log("data=========>",dataHash)
      web3.eth.getTransactionReceipt(dataHash, async function (e, data) { 
        if(data){
          console.log("data=========>")
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'fromAddress': account, 'cryptoIn': token.tokenAddress, 'amountIn': userInput})
        };
        await fetch('http://localhost:2053/api/createWarp', requestOptions)
            .then(response => console.log("Data Created : ========= > ",response.json()))
        }
      })
    })
  }

  const toFixedNumber = (value)=>{
    const num = value/10**18;
    return num.toString();
  }

  const handlePercentInput = (value) => {
      console.log("Max : ",parseFloat(toFixedNumber(tokenBalance)) * (value) /100);
      const max = parseFloat(toFixedNumber(tokenBalance)) * (value) /100;
      setuserInput(max.toString());
  }

  const handleApprovals = ()=>{
    return (
      isApproved ? 
      <Button onClick={()=> warpSuccess(userInput.toString())} mt="8px" fullWidth className="btn_yellow" >Wrap</Button> :
      <Button onClick={()=> onWrapApprove(userInput.toString())} mt="8px" fullWidth className="btn_yellow" >Approve Contract</Button>
    )
  }


  
  
  const [onPresentLaunch] = useModal(<LaunchpadModal />)
  

  return (
    <Page className="px-0">
      <div className="banner_swap_bg">
      <Heading as="h1" size="lg" className="h1_big" color="color_blue" mb="20px" style={{ textAlign: 'left' }}>
        {
          
          TranslateString(320, 'Warp')
        }
      </Heading>
      <Heading as="h2" color="colrblk" mb="0px" style={{ textAlign: 'left', fontSize:'18px' }}>
        {TranslateString(10000, 'Stake & burn assets to earn rewards')}
      </Heading>
      </div>

      <div className="px-left-right">
     
        <div className="stake_row">
        <CardsLarge className="stake_card warp_card">
       
        <div className="">
    <StyledFarmStakingCard className="white_box">
        <div className="card_pos">
      <CardBody className="pt-40">
      <div id="swap-currency-input" className="swap-currency-input">
<div className="swap-currency-input-div">
<div className="input-div-new">
<div className="amount_input">
<div color="text">Amount and Token</div>

</div>
<div color="text" className="float-right">{toFixedNumber(tokenBalance)}</div>
</div>
<div className="input_div_1">
<input className="token-amount-input" value={userInput} onChange={(e)=> setuserInput(e.target.value)} title="Token Amount" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0"  />
<button className="sc-hkwnrn iXxaXs open-currency-select-button" type="button" onClick={onPresentLaunch}>
  <span className="img_span">
  <Image src='/images/egg/logo.png' width={24} height={24} />
      <div id="pair" color="textwhitebl">GBT</div>
      <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" /></svg>

</span>
</button>
</div>
</div>
</div>
<div className="grid_from_to">
                <div>
                  <p className="from_to_color">From</p>
                <Fromcard>
                  <div className="text-center-img">
                <Image src='/images/egg/to_coin.png' width={51} height={60} />
                </div>
                <p className="from_to_color mt-coin">BEP-20</p>
                </Fromcard>
                </div>
                <div className="text-center-arrow">
                <Image src='/images/egg/arrow_right.png' width={30} height={8} />
                  </div>
                  <div>
                  <p className="from_to_color">To</p>
                  <Fromcard>
                  <div className="text-center-img">
                <Image src='/images/egg/from_coin.png' width={37} height={60} />
                </div>
                <p className="from_to_color mt-coin">ERC-20</p>
                </Fromcard>
                </div>

              </div>
              <div className="btn-flex">
                <Button onClick={()=>handlePercentInput(25)} className="btn_per">25%</Button>
                <Button onClick={()=>handlePercentInput(50)} className="btn_per">50%</Button>
                <Button onClick={()=>handlePercentInput(75)} className="btn_per">75%</Button>
                <Button onClick={()=>handlePercentInput(100)} className="btn_per">100%</Button>


              </div>
             
            

      
<div className="mb-btn-stake">
  {account ? 
        handleApprovals() :
        <UnlockButton mt="8px" fullWidth className="btn_yellow" />
  }
        </div>

      </CardBody>
      </div>
    </StyledFarmStakingCard>

 
    </div>

    
    
        </CardsLarge>
       
        </div>
      </div>
    </Page>
  )
}

export default Home
