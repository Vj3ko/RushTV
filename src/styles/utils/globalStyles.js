import { createGlobalStyle } from 'styled-components';
import { device } from './breakpoints';

export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: none;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bgColor};
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.white};

    &::-webkit-scrollbar { 
      display: none; 
    }
  }

  ul{
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    transition: ${({ theme }) => theme.transition};
    
    cursor: pointer;
  }

  h1,h2,h3,h4,h5,h6 {
    color: ${({ theme }) => theme.colors.white};
  }

  h1{
    font-size: 1.563rem;
    
    @media ${device.tablet} {
      font-size: 2rem;
    }

    @media ${device.laptop} {
      font-size: 2.188rem;
    }
  }

  h2{
    font-size: 1.25rem;
    text-transform: uppercase;
    font-weight:600;
    
    @media ${device.tablet} {
      font-size: 1.563rem;
    }

    @media ${device.laptopL} {
      font-size: 1.75rem;
    }
  }


  h3{
    font-size:1.125rem;
    font-weight:500;
    
    @media ${device.tablet} {
      font-size: 1.25rem;
    }

    @media ${device.laptopL} {
      font-size: 1.5rem;
    }
  }

  p,span{
    font-size: 0.938rem;
    color: ${({ theme }) => theme.colors.silver};
  }

  button {
    border: none;
    cursor: pointer;
  }
`