import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import styled from 'styled-components';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { modalVariant } from '../../animations/variants';
import { ApiContext } from '../../context/ApiContext';
import { device, mixins } from '../../styles/utils';

const StyledCarousel = styled.div`
  .slider-controler {
    display: none;

    @media ${device.tablet} {
      display: block;
    }
  }

  .swiper-slide {
    width: ${({ size }) => size === "big" ? "20.625rem" : "10rem"};
    height: auto;
    position: relative;
    border-radius: 1rem;
    overflow:hidden;
    cursor: pointer;

    @media ${device.tablet} {
      width: ${({ size }) => size === "big" ? "26.25rem" : "12.5rem"};
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${mixins.flex("center", "center")}
  background: rgba(11,12,15,0.9);
  z-index: 1000;
  overflow: hidden;


  .modal--wrapper {
    background: transparent;
    width:100%;
    max-width: 25rem;
    height: auto;
    margin: 1.25rem;
    user-select: none;
    border-radius: 1rem;
    overflow-x:hidden;

    @media ${device.tablet} {
      max-width: ${({ size }) => size === "big" ? "43.75rem" : "31.25rem"};
    }

    @media ${device.laptop} {
      max-width: ${({ size }) => size === "big" ? "56.25rem" : "31.25rem"};
    }

    @media ${device.laptopL} {
      max-width: ${({ size }) => size === "big" ? "75rem" : "31.25rem"};
    }
  }

  .modal__swiper-slide {
    position: relative;
    border-radius: 1rem;
    overflow:hidden;


    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: ${({ size }) => size === "big" ? "16/9" : "unset"};
    }
  }

  .modal__close--cta {
    position: absolute;
    top: 0.875rem;
    right: 1.375rem;
    z-index: 99999;
    font-size:1.563rem;
    background: transparent;
    color: ${({ theme }) => theme.colors.blue};

    @media ${device.laptop} {
      right: 2.813rem;
      top: 1rem;
    }
  }
`

export const Carousel = ({ data, size }) => {
  const [openModal, setOpenModal] = useState(false)
  const [initialSlide, setInitialSlide] = useState(0)

  const { IMG_URL } = useContext(ApiContext);

  function handleOpenImageModal(slide) {
    setInitialSlide(slide)
    setOpenModal(true)
    document.body.style.overflow = "hidden"
  }

  function handleCloseImageModal() {
    setOpenModal(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <AnimatePresence>
        {openModal &&
          <Modal size={size} key="modal" onClick={handleCloseImageModal} variants={modalVariant} initial="closed" animate="open" exit="exit">
            <button className='modal__close--cta' onClick={handleCloseImageModal}>
              <AiOutlineClose size={30} />
            </button>
            <div className="modal--wrapper">
              <div onClick={e => e.stopPropagation()} style={{ position: "relative" }}>
                <Swiper allowTouchMove={false} initialSlide={initialSlide} spaceBetween={10} loop={false} slidesPerView={1} navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', clickable: false, }} modules={[Navigation]} >
                  {data?.map((item, index) =>
                    <SwiperSlide key={index} className='modal__swiper-slide'>
                      <img src={`${IMG_URL}/${size === "big" ? "w1280" : "w500"}/${item.file_path}`} alt="carousel slider for selected content" />

                    </SwiperSlide >
                  )}

                  <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow"></div>
                    <div className="swiper-button-next slider-arrow"></div>
                  </div>
                </Swiper >
              </div >
            </div >
          </Modal >
        }
      </AnimatePresence >

      <StyledCarousel size={size}>
        <Swiper spaceBetween={10} grabCursor={true} loop={false} slidesPerView={'auto'} navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', clickable: true, }} modules={[Navigation]} >

          {data.map((item, index) =>
            <SwiperSlide key={index} className='swiper-slide' onClick={() => handleOpenImageModal(index)} >
              <img loading="lazy" src={`${IMG_URL}/w500/${item.file_path}`} alt="slide background" />
            </SwiperSlide>
          )}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow"></div>
            <div className="swiper-button-next slider-arrow"></div>
          </div>
        </Swiper>
      </StyledCarousel>
    </>
  )
}
