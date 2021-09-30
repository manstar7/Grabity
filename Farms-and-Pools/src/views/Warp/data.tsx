import { provider } from 'web3-core'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import erc20 from 'config/abi/erc20.json'
import useWeb3 from 'hooks/useWeb3'
import { AbiItem } from 'web3-utils'
import warpJSON from 'config/abi/wrap.json'
import addresses from 'config/constants/contracts'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const GetWarpBalance = async(tokenAddress)  =>{
    const web3 = useWeb3()
    const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
    const wrapItem  =(warpJSON as unknown) as AbiItem
    const WrapContract = new web3.eth.Contract(wrapItem,addresses.Wrap[CHAIN_ID]);
    const erc20Abi  =(erc20 as unknown) as AbiItem
    const erc20Token = new web3.eth.Contract(erc20Abi,tokenAddress);
    const tokenB = await erc20Token.methods.balanceOf(account);
   return tokenB
}

export default GetWarpBalance