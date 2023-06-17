import { Link } from 'react-router-dom'
import styled from 'styled-components'
import breakingBad from "../../../assets/images/breakingbad.jpg"
import dragons from "../../../assets/images/houseofdragon.jpg"
import office from "../../../assets/images/office.jpg"
import { device } from '../../../styles/utils'

const StyledCards = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(1, 15.625rem);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 1.25rem;

  @media ${device.tablet} {
    grid-template-columns: repeat(3, 13.75rem);
    grid-template-rows: repeat(1, 1fr);
    column-gap: 1.25rem;
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(3, 15.625rem);
    column-gap: 1.25rem;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(3, 18.75rem);
    column-gap: 1.875rem;
  }

  a {
    overflow: hidden;
    border-radius: 0.625rem;
    outline: 0.125rem solid transparent;
    transition:  ${({ theme }) => theme.transition};
    &:hover, &:focus {
      outline: 0.125rem solid ${({ theme }) => theme.colors.silver};
      box-shadow: 0 0.438rem 3.125rem 0.625rem #000000aa;
      transform: scale(1.015);
      filter: brightness(1.3);
    }
  }


  .grid__item {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(11,12,15, 0.5);
      z-index: 1;
    }

    &--title {
      position: absolute;
      top: 0.625rem;
      left: 0.625rem;
      z-index: 2;
      

      h2 {
      font-family: ${({ theme }) => theme.fonts.action};
      letter-spacing: 0.075rem;
      }
    }

    img{
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  
`


export const Cards = () => {
  return (
    <StyledCards>
      <Link to="/discover/tv/genre/comedy">
        <Card
          title="Comedy shows"
          description="Guaranteed source of laughter that brighten our days"
          alt="Poster of a popular comedy show"
          img={office}
        />
      </Link>

      <Link to="/popular/tv">
        <Card
          title="Most Popular Shows"
          description="TV shows that have captured the hearts and minds of viewers everywhere"
          alt="Poster of a popular show"
          img={dragons}
        />
      </Link>

      <Link to="/top-rated/tv">
        <Card
          title="Top Rated Shows"
          description="Top-rated TV shows that have earned critical acclaim and loyal fanbases"
          alt="Poster of a top rated show"
          img={breakingBad}
        />
      </Link>
    </StyledCards>
  )
}

const Card = ({ title, description, img, alt }) => {
  return (
    <div className="grid__item">
      <img src={img} alt={alt} />
      <div className='grid__item--title'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
