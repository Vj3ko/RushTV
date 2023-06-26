import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cardVariant } from '../../animations/variants';
import placeholderImage from '../../assets/images/No-Image-Placeholder.svg.png';
import { ApiContext } from '../../context/ApiContext';
import { device, mixins } from '../../styles/utils';

const StyledSlider = styled.section`
  position: relative;
  min-height: 15.25rem;

  @media ${device.tablet} {
    min-height: 19rem;
  }

  .swiper-wrapper {
    user-select: none;
  }

  .swiper-slide {
    width: ${({ size }) => (size === 'big' ? '20.625rem' : '10rem')};
    height: auto;
    max-height: 305px;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;

    @media ${device.tablet} {
      width: ${({ size }) => (size === 'big' ? '25rem' : '12.5rem')};
    }

    @media ${device.laptop} {
      width: ${({ size }) => (size === 'big' ? '31.25rem' : '12.5rem')};
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slider-controler {
    display: none;

    @media ${device.tablet} {
      display: block;
    }
  }
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: -1px;
  bottom: -1px;
  ${mixins.flex('end', 'flex-start')}
  flex-direction: column;
  padding: 0.625rem;
  background: ${({ theme }) => theme.gradients.cardGradient};
  text-align: left;
`;
const SlideTitle = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const CardImage = ({ img }) => {
  const { IMG_URL } = useContext(ApiContext);
  return (
    <>
      {img.poster_path ||
      img.file_path ||
      img.still_path ||
      img.backdrop_path ||
      img.profile_path ? (
        <motion.img
          variants={cardVariant}
          loading='lazy'
          src={`${IMG_URL}/w500/${
            img.poster_path ??
            img.file_path ??
            img.still_path ??
            img.backdrop_path ??
            img.profile_path
          }`}
          alt={img.title ?? img.name}
        />
      ) : (
        <img src={placeholderImage} alt='there is nothing to display' />
      )}
    </>
  );
};

const SliderComponent = ({ gallery, mediaType, id, size }) => {
  const renderSlideItem = item => {
    if (mediaType === 'season') {
      return (
        <SwiperSlide key={item.id} className='swiper-slide'>
          <Link to={`/tv/${id}/season/${item.season_number}`}>
            <CardImage img={item} />
            <Overlay>
              <SlideTitle>{item.title ?? item.name}</SlideTitle>
            </Overlay>
          </Link>
        </SwiperSlide>
      );
    } else if (mediaType === 'episode') {
      return (
        <SwiperSlide key={item.id} className='swiper-slide'>
          <Link
            to={`/tv/${id}/season/${item.season_number}/episode/${item.episode_number}`}>
            <CardImage img={item} />
            <Overlay>
              <SlideTitle>{item.title ?? item.name}</SlideTitle>
            </Overlay>
          </Link>
        </SwiperSlide>
      );
    } else {
      return (
        <SwiperSlide key={item.id + nanoid()} className='swiper-slide'>
          <Link to={`/${item.media_type || mediaType}/${item.id}`}>
            <CardImage img={item} />
            <Overlay>
              <SlideTitle>{item.title ?? item.name}</SlideTitle>
            </Overlay>
          </Link>
        </SwiperSlide>
      );
    }
  };

  return (
    <StyledSlider size={size}>
      <Swiper
        spaceBetween={15}
        grabCursor={false}
        loop={false}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[Navigation]}>
        {gallery?.map(item => renderSlideItem(item))}

        <div className='slider-controler'>
          <div className='swiper-button-prev slider-arrow'></div>
          <div className='swiper-button-next slider-arrow'></div>
        </div>
      </Swiper>
    </StyledSlider>
  );
};

export const Slider = React.memo(SliderComponent);
