import BigNumber from 'bignumber.js'
import styled from 'styled-components'

import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, CardBody, Flex, Button, Modal, Text, Image, Progress, Input } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface LaunchpadModalProps {
//   onConfirm: (amount: string) => void
  onDismiss?: () => void
 
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
const LaunchpadModal: React.FC<LaunchpadModalProps> = ({onDismiss}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
//   const fullBalance = useMemo(() => {
//     return getFullDisplayBalance(max)
//   }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

//   const handleSelectMax = useCallback(() => {
//     setVal(fullBalance)
//   }, [fullBalance, setVal])

  return (
    <Modal title={`${TranslateString(316, 'Select a token')}`} onDismiss={onDismiss}>
    <div className="modal_input">
    <input type="text" id="token-search-input" placeholder="Search name or paste address" className="mod_inp" value="" />
    </div>

    <div className="token_name_parent">
<div className="token_name_txt">Token name</div>
<div className="token_name_div">
<div className="token_name_symbol">↓</div>
</div>
</div>

<div className="pair_div_parent">
  <div className="pair_div">
<Image src='/images/egg/bnb.png' width={24} height={24} />
      <div id="pair" color="textwhitebl">BNB</div>

      </div>


      <div className="pair_div inactive">
<Image src='/images/egg/logo.png' width={24} height={24} />
      <div id="pair" color="textwhitebl">GBT</div>

      </div>
</div>
    

    </Modal>
  )
}

export default LaunchpadModal
