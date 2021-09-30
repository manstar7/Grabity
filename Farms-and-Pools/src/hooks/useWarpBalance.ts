import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBnb,wrapTransfer,warpBalance, getAllowance } from 'utils/callHelpers'
import { useWarp, useSousChef,useCake } from './useContract'


const useWarpBalance = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useWarp()
  const cakeContract = useCake()
  const handleStake = useCallback(
    async () => {
        const balance = warpBalance(cakeContract,account)
        const allowance = getAllowance(cakeContract,masterChefContract,account)
        return {balance,allowance} 
    },
    [cakeContract,account,masterChefContract],
  )

  return { onBalance : handleStake }
}



export default useWarpBalance
