import React, { useMemo,useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, BaseLayout, Flex, ArrowForwardIcon, Skeleton, Text, Image, Progress, Button, Input, useModal,CalculateIcon, IconButton, AddIcon } from '@pancakeswap-libs/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import BigNumber from 'bignumber.js'
import stakeABI from 'config/abi/stakeswap.json'
import erc20 from 'config/abi/erc20.json'
import { AbiItem } from 'web3-utils'
import { Address } from 'config/constants/types'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import { provider } from 'web3-core'
import useWeb3 from 'hooks/useWeb3'

import UnlockButton from 'components/UnlockButton'



import LaunchpadModal from './LaunchpadModal'
import DepositModal from '../DepositModal'




// import { getFarmApy } from 'utils/apy'
// import { useFarms, usePriceCakeBusd, useGetApiPrices } from 'state/hooks'



interface StakeCardProps {
  tokenAddress: Address
  tokenSymbol: string
  pid?: number
  ethereum?: provider
  account?: string
  quoteTokenAdresses: Address
  quoteTokenSymbol:string
  lpAddress?:Address
  contractAddress?: Address
  }




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
const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`


const StakingCard : React.FC<StakeCardProps> = ({tokenAddress,tokenSymbol,pid,ethereum,account,quoteTokenSymbol,quoteTokenAdresses,lpAddress,contractAddress }) => {
  const TranslateString = useI18n()
  // const { onStake } = useStake()
  const [onPresentLaunch] = useModal(<LaunchpadModal />)
  const web3 =  useWeb3()
  const [amount, setAmount] = useState('')
  const [farmAPR, setfarmAPR] = useState('')
  const [farmAPY, setfarmAPY] = useState('')
  const [tokenDecimal, settokenDecimal] = useState('')

  const [pending, setPending] = useState('0')
  const [total, setTotal] = useState('0')
  const [staked, setStacked] = useState('0')
  const [status, setStatus] = useState(false)
  const [allowance, setAllowance] = useState(false)
  const [requestedApproval, setrequestedApproval] = useState(false)
  const [cakePrice,setcakePrice] = useState('')
  const [depositFeeBP,setdepositFeeBP] = useState('')
  const [allowanceValue,setallowanceValue] = useState('')
  const [earnedUSD,setearnedUSD] = useState('')
  const [stakedUSD,setstakedUSD] = useState('')



const stakeAbi = (stakeABI as unknown) as AbiItem
const erc20Abi  =(erc20 as unknown) as AbiItem
const Stakes = new web3.eth.Contract(stakeAbi,contractAddress.toString());
const erc20Token = new web3.eth.Contract(erc20Abi,tokenAddress.toString());
const quoteToken = new web3.eth.Contract(erc20Abi,quoteTokenAdresses.toString());

const handleData = async () => {
  try {
    const decimal = await erc20Token.methods.decimals().call();
    settokenDecimal(decimal.toString())
   if(account){
    const pend = await Stakes.methods.pendingReward(account).call();
    console.log("data pending : ",pend)
    const user = await Stakes.methods.userInfo(account).call();
    setStacked(user.amount)
    const dataF = parseInt(pend)/10**parseInt(tokenDecimal)
    setPending(dataF.toFixed(2))

    // setPending(dataF.toFixed(2))
    const allownce = await erc20Token.methods.allowance(account,contractAddress.toString()).call();
    console.log("allowance : ",allownce)
    setallowanceValue(allownce.toString())
    if((allownce) > 0)
    setAllowance(true);
   }
    const balance = await erc20Token.methods.balanceOf(account).call();
    const price1 = await quoteToken.methods.balanceOf(lpAddress).call();
    const price2 = await erc20Token.methods.balanceOf(lpAddress).call();
    const TokenPrice = parseInt(price1)/parseInt(price2)
    setcakePrice(TokenPrice.toString())
    calculateAPR(cakePrice)
    setAmount(balance.toString())
    console.log("balance of ",cakePrice)
   
  }
  catch(e) {
        console.error(e)
      }
}
 handleData()

 const calculateAPR = async(cake)=>{
  // eggPerBlock
  const eggPerBlock = await Stakes.methods.rewardPerBlock().call();
  // poolWeight
  // const pool= await Stakes.methods.poolInfo(pid.toString()).call();
  // const totalloc = await Stakes.methods.totalAllocPoint().call();
  const poolWeight = 1;
  // lpinMc
  const lpinMc = await erc20Token.methods.balanceOf(contractAddress.toString()).call();
  const erc20T = await erc20Token.methods.decimals().call();
  const totalinMC = parseInt(lpinMc) / 10 ** parseInt(erc20T);
  console.log("lp in Mc : ",parseFloat(cakePrice)*totalinMC)
  const lpTotalInQuoteToken = new BigNumber(cakePrice).times(new BigNumber(totalinMC))
  const totalValueFormated = lpTotalInQuoteToken
 ? `$${Number(lpTotalInQuoteToken).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
 : '-'
  setTotal(totalValueFormated.toString())
 const cakeRewardPerBlock = new BigNumber(eggPerBlock || 1).times(new BigNumber(poolWeight)) .div(new BigNumber(10).pow(18))
 const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

 const totalValue = new BigNumber(lpTotalInQuoteToken || 0);

 const apy = (new BigNumber(cakePrice).times(cakeRewardPerYear)).div(totalValue);
 
 const stakedinusd = (parseInt(staked)/ 10 ** parseInt(tokenDecimal))* parseFloat(cakePrice);

 const earnedinusd = parseFloat(pending)*(parseFloat(cakePrice));

 setstakedUSD(stakedinusd.toFixed(2))
 setearnedUSD(earnedinusd.toFixed(2))

 console.log("earned : ",stakedinusd)


 const farmAPYs = apy && new BigNumber(apy).times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
     minimumFractionDigits: 2,
     maximumFractionDigits: 2,
   })
 setfarmAPY(farmAPYs.toString())
 setfarmAPR(apy.toString())
}
 
const onStake = async(value) =>{
  // const val = parseFloat(value)* 10 **parseInt(tokenDecimal)
  console.log("onstake : ",value)
     await Stakes.methods.transact(value.toString()).send({ from: account })
  .then(async (result) => {
    handleData()

  }).catch(e => {
    console.log("Error ",e)
  })
  handleData()
}

const onHarvest = async() =>{
  // const val = parseFloat(value)* 10 **parseInt(tokenDecimal)

     await Stakes.methods.transact(0).send({ from: account })
  .then(async (result) => {
    handleData()

  }).catch(e => {
    console.log("Error ",e)
  })
  handleData()
}

const handleApproval = ()=>{
  return allowance && parseInt(allowanceValue) >= parseInt(amount) ? (
      <>
   
    </>
  ) : (
    <Button className="btn_yellow" mt="8px" fullWidth disabled={requestedApproval} onClick={Approve}>
      {TranslateString(999, 'Enable')}
    </Button>
  )
}

const Approve = async() =>{
  console.log("take")
 await erc20Token.methods.approve(contractAddress.toString(),"115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: account })
 .then(async (result) => {
   console.log("result");
   const allownce = await erc20Token.methods.allowance(account,contractAddress.toString()).call() / 10 ** 18;
   if((allownce) > 0)
   setAllowance(true);

 }).catch(e => {
   console.log("Error ",e)
 })
 const allownce = await erc20Token.methods.allowance(account,contractAddress.toString()).call() / 10 ** 18;
 if((allownce) > 0)
 setAllowance(true);
}

const [onPresentDeposit] = useModal(<DepositModal max={new BigNumber(amount)} onConfirm={onStake} tokenName={tokenSymbol} depositFeeBP={parseInt(depositFeeBP)} />)


  return (
    <CardsLarge className="stake_card">
    <div className="">
<StyledFarmStakingCard className="white_box">
    <div className="card_pos">
   
  <CardBody>
  <div className="flex_coin_new">
  <div>
  <Text color="color_balck_grey" className="coin_name_title">
   Earn {tokenSymbol}
    </Text>
    </div>
    <div className="flec_coind_div_new">
  <Image src={`/images/farms/${tokenSymbol}.png`} width={45} height={45} />
 
    </div>
   
   
    
  </div>
  <Flex justifyContent='space-between' alignItems='center' className="mb_end mt-top-end">
    <Text className="fam_left_txt_sm">Stake & Burn</Text>
    <div className="end_card_title">{tokenSymbol}</div>
  </Flex>
  <Flex justifyContent='space-between' alignItems='center' className="mb_end mt-top-end">
    <Text className="fam_left_txt_sm">APR</Text>
    <div className="end_card_title">  {farmAPY} %</div>
  </Flex>
  <Divider />
 
  <Flex justifyContent='space-between' alignItems='center' className="mb_end mt-top-end">
    <div>
    <Text className="fam_left_txt_sm">GBT Earned</Text>
    <Text className="fam_left_txt_md">{pending}</Text>
    <Text className="fam_left_txt_xsm">+ ${earnedUSD}</Text>


    </div>
    <div>
    <button onClick={onHarvest} className="btn_yellow btn_new_padding" type="button">Harvest</button>
   

      </div>
    
  </Flex>


  <Flex justifyContent='space-between' alignItems='center' className="mb_end mt-top-end">
    <div>
    <Text className="fam_left_txt_sm">GBT Staked</Text>
    <Text className="fam_left_txt_md">{(parseInt(staked)/10**parseInt(tokenDecimal)).toFixed(2)}</Text>
    <Text className="fam_left_txt_xsm">+ ${stakedUSD}</Text>


    </div>
    <div>
    <button onClick={onPresentDeposit} className="btn_yellow btn_new_padding myplusebutton" type="button">
    <AddIcon color="primary" />
    </button>
   

      </div>
    
  </Flex>
  
 
<div className="mb-btn-stake">
{!account ?
              <UnlockButton mt="8px" fullWidth className="btn_yellow" />:
            handleApproval() }
    </div>

 
  </CardBody>
  </div>
</StyledFarmStakingCard>


</div>


  
    </CardsLarge>
   
   
  )
}

export default StakingCard

