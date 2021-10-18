

import { MenuEntry } from '@pancakeswap-libs/uikit'

const baseurl="http://localhost:3000";
const swap="http://localhost:3001";

const config: MenuEntry[] = [
  {
    label: 'Dashboard',
    icon: 'HomeIcon',
    href: baseurl.concat('/'),
    calloutClass: 'menulink'
  },  
  {
    label: 'Trade',
    icon: 'TradeIcon',
    calloutClass: 'menulink',
    items: [
      {
        label: 'Swap',
        href: swap.concat('/#/swap'),
      calloutClass: 'menulink',
      },
      {
        label: 'Liquidity',
        href: swap.concat('/#/pool'),
        calloutClass: 'menulink',
      },
    ],
  },
  
  {
    label: 'Refinery',
    icon: 'FarmIcon',
    href:baseurl.concat('/Refinery'),
    calloutClass: 'menulink'
  },
  {
    label: 'Staking',
    icon: 'PoolIcon',
    href:baseurl.concat('/Staking'),

    calloutClass: 'menulink'
  },
  {
    label: 'Stake Swap',
    icon: 'StakeswapIcon',
    calloutClass: 'menulink',
    href:  baseurl.concat('/stakeswap'),
  },
  {
    label: 'Warp',
    icon: 'WarpIcon',
    calloutClass: 'menulink',
    href:  baseurl.concat('/warp'),
  },
  
]

export default config
