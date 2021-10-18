import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import DashboardCard from 'views/Home/components/DashboardCard'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'

const Hero = styled.div`
  align-items: center;
  // background-image: url('/images/egg/3.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/home.png'), url('/images/home.png');
    // background-position: left center, right center;
    height: 60px;
    padding-top: 0;
    text-align:left;
    align-items:flex-start;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 20px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const CardsLarge = styled(BaseLayout)`
  align-items: stretch;
  justify-self: center;
  margin-bottom: 32px;

  & > div {
    grid-column: span 12;
    width: 100%;
    text-align: center;

  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page className="px-0">
      <div className="banner_swap_bg">
      <Heading as="h1" mb="20px" color="primaryblack" className="hvd_comic_serif orange_head" style={{ fontSize: "2.5rem" }}>
          Dashboard
        </Heading>
      </div>

      <Container>
          <div className="homw_full_sec">
           
            <Cards>
              <div>
              <DashboardCard />
            </div>
            <div>
            <TotalValueLockedCard />

              
              </div>
            </Cards>
            <Cards>
              <div>
              <CakeStats />

              </div>
              <div>
              <FarmStakingCard />

              <EarnAPYCard /> 
              </div>
                
            </Cards>
          </div>
      </Container>
    </Page>
  )
}

export default Home
