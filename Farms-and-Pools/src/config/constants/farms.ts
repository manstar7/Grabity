import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BUSD-MMO LP',
    lpAddresses: {
      97: '0x193f37625455D0c563D30F00A574aF0c962e983a',
      56: '0x37782Fb9D006DeEA19823b80a2b1515B483BF681',
    },
    tokenSymbol: 'MMO',
    tokenAddresses: {
      97: '0xe2b52d9f7b55F191f7A26c7D4B73E309b918eF3a',
      56: '0x59ee5e24ab8459eb8ea5b8c9b22ded647421e9d2',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'BNB-MMO LP',
    lpAddresses: {
      97: '0x75B7f53b9c879FB1c3b1f8EA7cb3282aF52aD8C2',
      56: '0xf1857ecc3f6555d13b94654347D66Cbe27f1A284',
    },
    tokenSymbol: 'MMO',
    tokenAddresses: {
      97: '0xe2b52d9f7b55F191f7A26c7D4B73E309b918eF3a',
      56: '0x59ee5e24ab8459eb8ea5b8c9b22ded647421e9d2',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'MMO',
    lpAddresses: {
      97: '0x193f37625455D0c563D30F00A574aF0c962e983a',
      56: '0x37782Fb9D006DeEA19823b80a2b1515B483BF681', // CAKE-BUSD LP
    },
    tokenSymbol: 'MMO',
    tokenAddresses: {
      97: '0xe2b52d9f7b55F191f7A26c7D4B73E309b918eF3a',
      56: '0x59ee5e24ab8459eb8ea5b8c9b22ded647421e9d2',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
