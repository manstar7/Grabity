import { MenuEntry, menuStatus } from '@pancakeswap-libs/uikit'

const baseurl="http://69.164.195.140:8096";
const swap="http://69.164.195.140:8097";


const config: MenuEntry[] = [
  {
    label: 'Dashboard',
    icon: 'HomeIcon',
    calloutClass: 'menulink',
    href: baseurl.concat('/'),
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
    calloutClass: 'menulink',
    href:  baseurl.concat('/Refinery'),
  },
  {
    label: 'Staking',
    icon: 'PoolIcon',
    calloutClass: 'menulink',
    href:  baseurl.concat('/Staking'),
  },
  {
    label: 'Warp',
    icon: 'WarpIcon',
    calloutClass: 'menulink',
    href:  baseurl.concat('/warp'),
  },
  {
    label: 'Stake Swap',
    icon: 'StakeswapIcon',
    calloutClass: 'menulink',
    href:  baseurl.concat('/stakeswap'),
  },
  
]

export default config
