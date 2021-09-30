import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'

import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBnb,wrapTransfer,warpBalance, getHashId } from 'utils/callHelpers'
import { useWarp, useSousChef,useCake } from './useContract'



 

const useWarps = () => {

  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useWarp()
  const cakeContract = useCake()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await wrapTransfer(masterChefContract, cakeContract, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.log(txHash)
      return txHash
    },
    [account, dispatch, masterChefContract,cakeContract],
  )

  return { onWrap : handleStake }
}



export const GetWrapBalance = async()=>{
  const cakeContract = useCake()
  const { account } = useWallet()
  const balance = await warpBalance(cakeContract,account)
  return balance
}

export default useWarps
