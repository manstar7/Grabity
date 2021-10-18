import { MenuEntry, menuStatus } from '@pancakeswap-libs/uikit'

const baseurl="http://localhost:3000";
const swap="http://localhost:3001";


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
    calloutClass: 'menulink dropdown tradeDropdown',
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
