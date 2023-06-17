import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { styled } from 'styled-components';
import { headerVariant, menuBtnVariant, navVariant } from "../animations/variants";
import { device, mixins } from "../styles/utils";
import { movieGenre, optionMovie, optionPeople, optionTv, tvGenre } from "../utils/routesData";

const StyledHeader = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  background: ${({ $changeColor, theme }) => $changeColor ? theme.colors.bgColor : "transparent"};
  transition: background ${({ theme }) => theme.transition};
  overflow: hidden;

  .header--wrapper {
    width: 100%;
    height: 100%;
    ${mixins.flex("space-between", "center")};
    flex-wrap: wrap;
    padding: 0.625rem 1.5rem;

    @media ${device.laptop} {
      padding: 10px 48px;
    }

    .header__logo {
      font-family: ${({ theme }) => theme.fonts.action};
      text-shadow: 0.125rem 0.125rem 0.313rem rgba(0,0,0,0.3);
      letter-spacing: 0.125rem;
    }
  }

  .header__action{
    ${mixins.flex("unset", "center")}
    gap: 1rem;

    a,button {
      ${mixins.flex("center", "center")}
    }

    .header--cta {
      background: transparent;
    }
  }

  
`

const StyledNav = styled(motion.nav)`
  width: 100%;
  
  .nav--wrapper {
    margin: 1.25rem 0;
    ${mixins.flex("unset", "center")};
    flex-flow: wrap;
    gap: 1.25rem;
    overflow-y: auto;
    height: 80vh;
    scrollbar-width: none;
    
    &::-webkit-scrollbar { 
      display: none; 
    }

    @media ${device.tablet} {
      height: auto;
      gap: 1.875rem;
      margin: 2.5rem 0;
    }
  }

  .nav--section {
    flex-basis: 100%;
    align-self: start;

    @media ${device.mobileL} {
      flex-basis: 45%;
    }

    @media ${device.tablet} {
      flex-basis: 30%;
    }
  }

  h3{
    color:${({ theme }) => theme.colors.blue};
    text-transform: uppercase;
    margin-bottom: 0.313rem;
    font-size: 1.25rem;
    font-weight: normal;
  }

  h4 {
    color:${({ theme }) => theme.colors.blue};
    font-weight: normal;
  }

  li{
    padding: 0.125rem 0;

    a:hover, a:focus {
      color: ${({ theme }) => theme.colors.blue}; 
    }
  }
`

const Overlay = styled(motion.div)`
    position: ${({ open }) => open ? "fixed" : "absolute"};
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${({ open }) => open ? "rgba(11,12,15,0.8)" : "transparent"};
    z-index: -1;
    transition: background ${({ theme }) => theme.transition};
  
`

const Navigation = () => {
  const [isNav, setIsNav] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [navColor, setNavColor] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0);


  function controlNav() {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 20) {
        setNavColor(true)
      } else {
        setNavColor(false)
      }

      if (window.scrollY > 1000 && window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setIsNav(false);
      } else { // if scroll up show the navbar
        setIsNav(true);
      }

      setLastScrollY(window.scrollY);
    }
  }


  useEffect(() => {
    if (openMenu) {
      setNavColor(true)
      document.body.style.overflowY = "hidden"
    } else if (!openMenu && window.scrollY < 20) {
      setNavColor(false)
      document.body.style.overflowY = "auto"
    } else {
      document.body.style.overflowY = "auto"
    }


    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNav);

      return () => {
        window.removeEventListener('scroll', controlNav);
      };
    }
  }, [lastScrollY, openMenu])

  return (
    <AnimatePresence>
      {isNav && (
        <StyledHeader key={isNav} $changeColor={navColor} initial="closed" animate="open" exit="exit" variants={headerVariant}  >
          <Overlay key={isNav} open={openMenu} animate={{ height: "100vh", transition: { duration: .2 } }} onClick={() => setOpenMenu(false)}></Overlay>

          <div className='header--wrapper'>
            <Link to="/" onClick={() => openMenu ? setOpenMenu(false) : null} >
              <h1 className='header__logo'>Rush TV</h1>
            </Link>

            <div className='header__action'>
              <Link to="/search" onClick={() => openMenu ? setOpenMenu(false) : null} >
                <BsSearch color="#ffffff" size={20} />
              </Link>
              <button className='header--cta' onClick={() => setOpenMenu(p => !p)}>
                <AnimatePresence mode='wait' >
                  {openMenu ?
                    <motion.div key={openMenu} variants={menuBtnVariant} initial="closed" animate="open" exit="exit">
                      <AiOutlineClose color="#ffffff" size={25} />
                    </motion.div>
                    : <motion.div key={openMenu} variants={menuBtnVariant} initial="closed" animate="open" exit="exit">
                      <RiMenu3Line color="#ffffff" size={25} />
                    </motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>

            <AnimatePresence>
              {openMenu &&
                <StyledNav key={openMenu} variants={navVariant} initial="closed" animate="open" exit="exit">
                  <div className='nav--wrapper'>
                    <div className="nav--section">
                      <h3>Tv shows</h3>
                      <ul>
                        {optionTv.map(item =>
                          <li key={item.name}><Link onClick={() => setOpenMenu(false)} to={item.link}>{item.name}</Link></li>
                        )}
                      </ul>

                      <h4>By Genre</h4>
                      <ul>
                        {tvGenre.map(item =>
                          <li key={item.name}><Link onClick={() => setOpenMenu(false)} to={item.link}>{item.name}</Link></li>
                        )}
                      </ul>
                    </div>

                    <div className="nav--section">
                      <h3>Movies</h3>
                      <ul>
                        {optionMovie.map(item =>
                          <li key={item.name}><Link onClick={() => setOpenMenu(false)} to={item.link}>{item.name}</Link></li>
                        )}
                      </ul>

                      <h4>By Genre</h4>
                      <ul>
                        {movieGenre.map(item =>
                          <li key={item.name}><Link onClick={() => setOpenMenu(false)} to={item.link}>{item.name}</Link></li>
                        )}
                      </ul>
                    </div>

                    <div className="nav--section">
                      <h3>People</h3>
                      <ul>
                        {optionPeople.map(item =>
                          <li key={item.name}><Link onClick={() => setOpenMenu(false)} to={item.link}>{item.name}</Link></li>
                        )}
                      </ul>
                    </div>
                  </div>
                </StyledNav>
              }
            </AnimatePresence>
          </div>
        </StyledHeader>
      )}
    </AnimatePresence>
  )
}

export const MemoizedNavigation = React.memo(Navigation);
