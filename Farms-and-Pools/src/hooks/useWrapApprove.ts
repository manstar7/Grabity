import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBnb,wrapTransfer,warpBalance,warpApprove } from 'utils/callHelpers'
import { useWarp, useSousChef,useCake } from './useContract'

const useWarpApprove = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useWarp()
  const cakeContract = useCake()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await warpApprove(masterChefContract, cakeContract, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract,cakeContract],
  )

  return { onWrapApprove : handleStake }
}


export default useWarpApprove
