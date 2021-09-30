import styled from 'styled-components'

const SecondaryCard = styled.div`
  align-items: start;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.textDisabled};
  border-radius: 0px;
  display: flex;
  padding: 24px;
`

export default SecondaryCard
