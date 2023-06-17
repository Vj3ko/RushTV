import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ApiContext } from '../../../context/ApiContext'
import { device } from '../../../styles/utils'

const StyledScrollTray = styled.div`
    margin: 0.625rem 0;

    .slider {
      margin: auto;
      position: relative;
      width: 100%;
      overflow:hidden;
      display: grid;
      place-items: center;

      &::before, &::after {
        background: linear-gradient(90deg, rgba(11,12,15, 1) 0%, rgba(11,12,15, 0) 100%);
        content: "";
        height: 100%;
        position: absolute;
        width: 5%;
        z-index: 2;
      }

      &::before {
        left: 0;
        top: 0;
      }

      &::after {
        right: 0;
        top: 0;
        transform: rotate(180deg);
      }
    }


    .slide-track {
      display: flex;
      width: calc(200px * 20);
      animation: scroll 70s linear infinite ${({ direction }) => direction === "right" ? "alternate" : "alternate-reverse"};

      &:hover {
        animation-play-state: paused;
      }

      @media ${device.tablet} {
        width: calc(300px * 20);
      }

      @media ${device.laptop} {
        width: calc(400px * 20);
      }
    }

    .slide {
      width: 200px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      position: relative;

      @media ${device.tablet} {
        width: 300px;
      }

      @media ${device.laptop} {
        width: 400px;
      }

      .overlay {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        transition: .5s;
        display: grid;
        place-items: center;

        &:hover {
        background: rgba(11,12,15, 0.5);
        cursor: pointer;
        }

        &--inner {
          opacity: 0;
          transition: .5s;
          max-width: 80%;

          h4{
            text-shadow: 2px 2px 2px ${({ theme }) => theme.colors.bgColor};
          }
        }

        &:hover .overlay--inner {
          opacity: 1;
        }

      }

      img {
        height: 100%;
        width: 100%;
        object-fit:cover;
        border-radius: 10px;
      }

      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100%  {
          transform: translateX(calc(-200px * 10));

          @media ${device.tablet} {
            transform: translateX(calc(-300px * 10));
          }

          @media ${device.laptop} {
            transform: translateX(calc(-400px * 10));
          }
        }
      }
    }
  `

export const ScrollTray = ({ direction, gallery, mediaType }) => {
  const { IMG_URL } = useContext(ApiContext)

  return (
    <StyledScrollTray direction={direction}>
      <div className="slider">
        <div className="slide-track">
          {gallery.map(item =>
            <div className="slide" key={item.id}>
              <Link to={`/${mediaType}/${item.id}`} tabIndex="-1">
                <img src={`${IMG_URL}/w500/${item.backdrop_path}`} alt={item.name ?? item.title} />
                <div className="overlay">
                  <div className='overlay--inner'>
                    <h4>{item.name ?? item.title} {!!item?.vote_average && <span>({item.vote_average.toFixed(1)})</span>}</h4>

                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div >
    </StyledScrollTray >
  )
}