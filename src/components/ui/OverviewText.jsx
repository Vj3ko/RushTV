import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { overviewBtnVariant, overviewVariant } from '../../animations/variants'
import { device } from '../../styles/utils'

const StyledOverview = styled.div`
    max-width: 37.5rem;

    @media ${device.laptop} {
      max-width: 25rem;
    }

    @media ${device.laptopL} {
      max-width: ${({ type }) => type === "person" ? "62.5rem" : "37.5rem"};
    }

    p{
      text-shadow: 0.188rem 0.188rem 0.313rem rgba(0,0,0,1);
      line-height: 1.5rem;
      mask-image: none;
      -webkit-mask-image: none;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: unset;
      line-clamp: unset;
      -webkit-box-orient: vertical;
      margin-bottom: 0.188rem;
    }

    .read-more {
      mask-image: linear-gradient(#0b0c0f calc(100% - 3.125rem), transparent);
      -webkit-mask-image: linear-gradient(#0b0c0f calc(100% - 3.125rem), transparent);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      margin-bottom: 0.188rem;
    }

    .overview--cta {
      color: ${({ theme }) => theme.colors.blue};
      background:transparent;
      font-size: 0.875rem;
    }
`


export const OverviewText = ({ text, type }) => {
  const [active, setActive] = useState(false)


  return (
    <StyledOverview type={type}>
      <AnimatePresence mode="wait">
        <motion.p key={active} className={active ? "" : "read-more"} variants={overviewVariant} initial="shrink" animate="grow" exit="shrink" > {text}</motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.button key={active} variants={overviewBtnVariant} initial="hide" animate="show" exit="exit" className='overview--cta' onClick={() => setActive(prev => !prev)}>{active ? "Read Less" : "Read More"}</motion.button>
      </AnimatePresence>

    </StyledOverview>
  )
}
