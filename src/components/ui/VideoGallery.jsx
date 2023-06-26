import ReactPlayer from 'react-player/lazy';
import { styled } from 'styled-components';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { device } from '../../styles/utils';

const StyledGallery = styled.div`
  position: relative;
  height: auto;

  .swiper {
    height: 100%;
  }

  .swiper-slide {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    width: 20.625rem;
    height: 11.875rem;

    @media ${device.tablet} {
      width: 26.25rem;
      height: 15rem;
    }

    @media ${device.tablet} {
      width: 37.5rem;
      height: 20.625rem;
    }
  }

  .slider-controler {
    display: none;

    @media ${device.tablet} {
      display: block;
    }
  }
`;

export const VideoGallery = ({ gallery }) => {
  return (
    <StyledGallery>
      <Swiper
        spaceBetween={10}
        loop={false}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[Navigation]}>
        {gallery?.map(item => (
          <SwiperSlide key={item.id}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${item.key}`}
              playing={false}
              width={'100%'}
              height={'100%'}
              light={true}
              controls={true}
            />
          </SwiperSlide>
        ))}

        <div className='slider-controler'>
          <div className='swiper-button-prev slider-arrow'></div>
          <div className='swiper-button-next slider-arrow'></div>
        </div>
      </Swiper>
    </StyledGallery>
  );
};
