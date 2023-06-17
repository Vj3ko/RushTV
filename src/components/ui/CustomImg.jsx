import { useContext } from 'react'
import { styled } from 'styled-components'
import placeholderImage from "../../assets/images/No-Image-Placeholder.svg.png"
import placeholder from "../../assets/images/breakingbad.jpg"
import { ApiContext } from '../../context/ApiContext'
import { device } from '../../styles/utils'

const StyledImg = styled.div`
  position: relative;
  overflow:hidden;
  
  @media ${device.tablet} {
    margin-left: 1.5rem;
    border-radius: 1rem;
  }

  @media ${device.laptop} {
    margin-left: 3rem;
  }

  

  img {
    width: 100%;
    height: 100%;
    max-width: 26.563rem;
    object-fit: cover;
    object-position: center;
    

    @media ${device.tablet} {
      max-width: 18.75rem;
    }

    @media ${device.laptop} {
      max-width: 31.25rem;
    }
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(180deg, rgba(11,12,15,0) 80%,rgba(11,12,15,0.9) 95% , rgba(11,12,15,1) 100%);

    @media ${device.laptop} {
      background: linear-gradient(90deg, rgba(11,12,15,0) 85%,rgba(11,12,15,0.6) 95%, rgba(11,12,15,1) 100%),
      linear-gradient(180deg, rgba(11,12,15,0) 85%, rgba(11,12,15,1) 100%);
    }
  }

    .placeholder--cover::after {
    content: "";
    position:absolute;
    top:0;
    right: 0;
    bottom: -1px;
    left:0;
    background-image: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(11,12,15,0.8) 85%, rgba(11,12,15,1) 100%), url(${placeholderImage});
    background-size: cover;
    background-position: center;
    z-index: 100;
  }
`

export const CustomImg = ({ size, link }) => {
  const { IMG_URL } = useContext(ApiContext)

  return (
    <StyledImg>
      {link ? <img src={`${IMG_URL}/${size}/${link}`} alt="poster" /> : <div className="placeholder--cover"><img src={placeholder} alt="there is nothing to display" /></div>}
    </StyledImg>
  )
}
