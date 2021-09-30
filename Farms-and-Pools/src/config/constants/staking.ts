import contracts from './contracts'
import { LockedConfig, QuoteToken } from './types'

const Launch: LockedConfig[] = [
    {
        pid: 0,
        tokenSymbol: 'GBT',
        tokenAddresses: {
            97: '0xe2b52d9f7b55F191f7A26c7D4B73E309b918eF3a',
            56: '0x290c665656a67e0ea0784f90ECBaeFF77c884217',
        },
        quoteTokenSymbol: QuoteToken.BUSD,
        quoteTokenAdresses: contracts.busd,
        lpAddress: {
          97: '0x193f37625455D0c563D30F00A574aF0c962e983a',
          56: '0x93871b338864Be012AF3038ce2A73D5017c5c9ba',
      },
      contractAddress: {
        97: '0x2619968b7c5aE1625a3709a118b01e90482b4252',
        56: '0x93871b338864Be012AF3038ce2A73D5017c5c9ba',
      }
    }
 
]

export default Launch