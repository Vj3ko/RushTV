import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-headless-accordion";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from 'styled-components';
import { Container } from '../styles/components';
import { device, mixins } from '../styles/utils';
import { isValidEmail } from '../utils';
import { movieGenre, optionMovie, optionPeople, optionTv, tvGenre } from "../utils/routesData";

const StyledFooter = styled.footer`
  border-top: 0.063rem soLid rgba(179, 179, 179, 0.4);
  margin-top: 3.125rem;
  padding: 2.5rem 0;

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


  @media ${device.laptopL} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
  }


  .Toastify__toast {
    background: ${({ theme }) => theme.colors.oxfordBlue};
    color: ${({ theme }) => theme.colors.white};
  }

  .Toastify__close-button {
    width: unset;
    color: ${({ theme }) => theme.colors.white};
    background: transparent;
    padding: unset;
    opacity: 0.7;
    align-self: center;
  }

  .Toastify__progress-bar {
    background: ${({ theme }) => theme.colors.blue};
  }

  .bottom {
    @media ${device.laptopL} {
      grid-area: 2 / 1 / 3 / 5;
    }

    .links--container {
      margin-top: 1.25rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.313rem;

      @media ${device.tablet} {
        gap: 1.25rem;
      }

      li{
        padding: 0.313rem 0.625rem;

        a{
          color:  ${({ theme }) => theme.colors.blue};
        }
      }
    }

    .rights {
      text-align: center;
      margin-top: 0.625rem;
    }
  }
`

const StyledNav = styled.nav`
    ${mixins.flex("unset", "center")};
    flex-flow: wrap;
    display: none;

    @media ${device.tablet} {
      display: flex;
    }

    @media ${device.laptopL} {
      grid-area: 1 / 1 / 2 / 3;
    }


  .nav--section {
    aLign-self: start;

    @media ${device.tablet} {
      flex-basis: 33%;
    }

    @media ${device.laptopL} {
      flex-basis: 30%;
    }
  }

  li{
    padding: 0.125rem 0;

    a:hover, a:focus {
      color: ${({ theme }) => theme.colors.blue}; 
    }
  }
  `

const StyledForm = styled.div`
  margin: 1.25rem 0;

  @media ${device.tablet} {
    margin: 2.5rem 0;
  }

  @media ${device.laptopL} {
    grid-area: 1 / 3 / 2 / 5;
    margin: unset;
  }
  
  .form--cta {
    ${mixins.flex("start", "center")}
    flex-wrap: wrap;
    gap: 0.625rem;
  }

  input, button {
    padding: 0.625rem 1.25rem;
    width: 100%;

    @media ${device.tablet} {
      padding: 0.75rem 1.5rem;
    }
  }

  input {
    border: none;
    max-width: 25rem;
  }

  button{
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    max-width: 25rem;
    text-transform: uppercase;

    @media ${device.tablet} {
      max-width: 6.25rem;
    }
  }

  h4{
    text-transform: uppercase;
    margin-bottom: 0.625rem;
  }

  .updates--info {
    margin-top: 0.625rem;
    font-size: 0.813rem;
    max-width: 43.75rem;
  }

  .border{
    margin-top: 1.25rem;
    height: 0.063rem;
    background: rgba(179, 179, 179, 0.4);
    width: 80%;
    display: none;

    @media ${device.laptopL} {
      display: block;
    }
  }

  .social {
    margin-top: 1.875rem;
    ${mixins.flex("center", "center")};
    gap: 1.25rem;

    @media ${device.laptopL} {
      justify-content: flex-start;
    }
    
    &__icon{
      font-size: 1.875rem;
      color: ${({ theme }) => theme.colors.white};
      transition: ${({ theme }) => theme.transition};

      &:hover {
        color: ${({ theme }) => theme.colors.blue};
        cursor: pointer;
      }
    }
  }
`

const StyledAccordion = styled.div`
    max-width: 50rem;
    margin: 2.5rem auto;
  
      @media ${device.tablet} {
        display: none;
      }
  
    li{
      padding: 0.125rem 0;
  
      a:hover, a:focus {
        color: ${({ theme }) => theme.colors.blue}; 
      }
    }
  
    button {
      background:transparent;
      border:none;
      width: 100%;
      margin: 0.313rem 0;
    }
  
    .accordion-header {
      ${mixins.flex("space-between", "center")}
  
      span{
        font-size: 1.25rem;
        color: ${({ theme }) => theme.colors.blue}; 
      }
    }
  `

const Footer = () => {
  const [email, setEmail] = useState('');

  function handleSubmit() {
    if (email && email.replace(/\s/g, '').length > 0) {
      if (isValidEmail(email)) {
        toast.success("Success, stay tuned for updates")
        setEmail("")
      } else {
        toast.error('Your email address is invalid.');
      }
    }
  }

  return (
    <Container>
      <StyledFooter>
        <StyledNav>
          <div className="nav--section">
            <h3>Tv shows</h3>
            <ul>
              {optionTv.map(item =>
                <li key={item.name}><Link to={item.link}>{item.name}</Link></li>
              )}
            </ul>

            <h4>By Genre</h4>
            <ul>
              {tvGenre.map(item =>
                <li key={item.name}><Link to={item.link}>{item.name}</Link></li>
              )}
            </ul>
          </div>

          <div className="nav--section">
            <h3>Movies</h3>
            <ul>
              {optionMovie.map(item =>
                <li key={item.name}><Link to={item.link}>{item.name}</Link></li>
              )}
            </ul>

            <h4>By Genre</h4>
            <ul>
              {movieGenre.map(item =>
                <li key={item.name}><Link to={item.link}>{item.name}</Link></li>
              )}
            </ul>
          </div>

          <div className="nav--section">
            <h3>People</h3>
            <ul>
              {optionPeople.map(item =>
                <li key={item.name}><Link to={item.link}>{item.name}</Link></li>
              )}
            </ul>
          </div>
        </StyledNav>

        <Accordions />

        <StyledForm>
          <div>
            <h4>Stay in touch</h4>
            <div className='form--cta'>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={handleSubmit}>Submit</button>
              <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover />
            </div>

            <p className='updates--info'>By clicking the submit button, you agree to Rush TV using your email address to send you marketing communications, updates, special offers and other information about Rush TV. You can unsubscribe at any time. For more information on how we handle your personal data, please see our <a style={{ color: "#5468ff" }}>Privacy Policy</a>.</p>
          </div>

          <div className="border"></div>

          <div className='social'>
            <FaFacebookSquare className='social__icon' />
            <FaInstagramSquare className='social__icon' />
            <FaTwitterSquare className='social__icon' />
          </div>
        </StyledForm>

        <div className='bottom'>
          <ul className='links--container'>
            <li><a>Privacy Policy</a></li>
            <li><a>Manage Preferences</a></li>
            <li><a>Terms of use</a></li>
            <li><a>Help Center</a></li>
            <li><a>Corporate Info</a></li>
          </ul>


          <p className='rights'>©{new Date().getFullYear()} Rush TV. All Rights Reserved. Rush TV is used under license.</p>
        </div>
      </StyledFooter>
    </Container>


  )
}

const Accordions = () => {
  return (
    <StyledAccordion>
      <Accordion className='accordion' transition={{ duration: "500ms", timingFunction: "cubic-bezier(0, 0, 0.2, 1)" }}>
        <AccordionItem>
          {({ open }) => (
            <>
              <AccordionHeader className='accordion-header'>
                <h3>Tv Shows</h3>
                <span>{open ? "-" : "+"}</span>
              </AccordionHeader>

              <AccordionBody as={'ul'}>
                {optionTv.map(item =>
                  <li key={item.name}><Link tabIndex={open ? "0" : "-1"} to={item.link}>{item.name}</Link></li>
                )}

                <h4>By Genre</h4>
                {tvGenre.map(item =>
                  <li key={item.name}><Link tabIndex={open ? "0" : "-1"} to={item.link}>{item.name}</Link></li>
                )}
              </AccordionBody>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ open }) => (
            <>
              <AccordionHeader className='accordion-header'>
                <h3>Movies</h3>
                <span>{open ? "-" : "+"}</span>
              </AccordionHeader>

              <AccordionBody as={'ul'}>
                {optionMovie.map(item =>
                  <li key={item.name}><Link tabIndex={open ? "0" : "-1"} to={item.link}>{item.name}</Link></li>
                )}

                <h4>By Genre</h4>
                {movieGenre.map(item =>
                  <li key={item.name}><Link tabIndex={open ? "0" : "-1"} to={item.link}>{item.name}</Link></li>
                )}

              </AccordionBody>
            </>
          )}
        </AccordionItem>

        <AccordionItem>
          {({ open }) => (
            <>
              <AccordionHeader className='accordion-header'>
                <h3>People</h3>
                <span>{open ? "-" : "+"}</span>
              </AccordionHeader>

              <AccordionBody as={"ul"}>
                {optionPeople.map(item =>
                  <li key={item.name}><Link tabIndex={open ? "0" : "-1"} to={item.link}>{item.name}</Link></li>
                )}
              </AccordionBody>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </StyledAccordion>
  );
};

export const MemoizedFooter = React.memo(Footer);

