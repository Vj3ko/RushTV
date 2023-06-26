import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { device } from '../../styles/utils';

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  opacity: 0;

  @media ${device.tablet} {
    opacity: 1;
  }

  @media ${device.laptop} {
    max-width: 48rem;
  }

  @media ${device.laptopL} {
    max-width: 75rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: -1px;
    display: block;
    background-image: linear-gradient(
        90deg,
        rgba(11, 12, 15, 1) 0%,
        rgba(11, 12, 15, 0.7) 50%,
        rgba(11, 12, 15, 0) 100%
      ),
      linear-gradient(
        180deg,
        rgba(11, 12, 15, 0) 70%,
        rgba(11, 12, 15, 0.2) 80%,
        rgba(11, 12, 15, 1) 100%
      ),
      linear-gradient(90deg, rgba(11, 12, 15, 0) 0%, rgba(11, 12, 15, 0.2) 100%);

    @media ${device.laptop} {
      background-image: linear-gradient(
          90deg,
          rgba(11, 12, 15, 1) 0%,
          rgba(11, 12, 15, 0.5) 50%,
          rgba(11, 12, 15, 0) 100%
        ),
        linear-gradient(
          180deg,
          rgba(11, 12, 15, 0) 0%,
          rgba(11, 12, 15, 0.3) 70%,
          rgba(11, 12, 15, 0.5) 80%,
          rgba(11, 12, 15, 1) 100%
        ),
        linear-gradient(90deg, rgba(11, 12, 15, 1) 0%, rgba(11, 12, 15, 0) 50%);
    }

    @media ${device.laptopL} {
      background-image: linear-gradient(
          90deg,
          rgba(11, 12, 15, 1) 0%,
          rgba(11, 12, 15, 0.5) 40%,
          rgba(11, 12, 15, 0.2) 60%
        ),
        linear-gradient(
          180deg,
          rgba(11, 12, 15, 0) 0%,
          rgba(11, 12, 15, 0.5) 70%,
          rgba(11, 12, 15, 0.9) 90%,
          rgba(11, 12, 15, 1) 100%
        );
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const animateBg = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

export const CustomBg = ({ size, link }) => {
  return (
    <ImageWrapper>
      <motion.img
        loading='lazy'
        variants={animateBg}
        initial='hide'
        animate='show'
        src={`https://image.tmdb.org/t/p/${size}/${link}`}
        alt='overlayed background'
      />
    </ImageWrapper>
  );
};
