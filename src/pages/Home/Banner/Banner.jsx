import { styled } from 'styled-components';
import { device, mixins } from '../../../styles/utils';

const StyledBanner = styled.section`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  gap: 1.875rem;
  margin: ${({ theme }) => theme.sectionMarginS};

  @media ${device.laptop} {
    flex-direction: ${({ position }) => position === "left" ? "row-reverse" : "row"};
    gap: 0;
  }

  .img--container {
    height: 100%;
    position: relative;

    @media ${device.laptop} {
      max-width: 50%;
    }

    img{
      width:100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .overlay {
      position: absolute;
      top:0;
      left:0;
      right: 0;
      bottom: -1px;
      background: linear-gradient(180deg, rgba(11,12,15,0) 80%,rgba(11,12,15,0.9) 95% , rgba(11,12,15,1) 100%);

      @media ${device.laptop} {
        background: ${({ position }) => position === "left" ?
    "linear-gradient(180deg, rgba(11,12,15,0) 80%,rgba(11,12,15,0.9) 95% , rgba(11,12,15,1) 100%), linear-gradient(90deg, rgba(11, 12, 15) 5%, rgba(11,12,15,0.9) 10%, rgba(11,12,15,0) 30%)" :
    "linear-gradient(180deg, rgba(11,12,15,0) 80%,rgba(11,12,15,0.9) 95% , rgba(11,12,15,1) 100%), linear-gradient(270deg, rgba(11, 12, 15) 5%, rgba(11,12,15,0.9) 10%, rgba(11,12,15,0) 30%)"}
      }
    }
  }

  .content {
    margin: auto;
    text-align: center;
    padding: 0 1.5rem;
    max-width: 40.625rem;
    z-index: 2;
    ${mixins.flex("center", "center")};
    flex-direction: column;
    gap: 0.625rem;

    @media ${device.laptop} {
      margin: 0 auto;
      display: flex;
      align-items: center;
      padding-right: 0; 
    }

    h3{
      font-weight: normal;
      text-shadow: 0.125rem 0.125rem 0.125rem ${({ theme }) => theme.colors.bgColor};
    }
  }  
`

const Banner = ({ title, description, img, position }) => {
  return (
    <StyledBanner position={position}>
      <div className='img--container'>
        <img src={img} alt="banner background" />
        <div className="overlay"></div>
      </div>

      <div className='content'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </StyledBanner>
  )
}

export default Banner;
