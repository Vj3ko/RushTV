import { styled } from 'styled-components';
import { device, mixins } from "../utils";

export const PageSection = styled.section`
  position: relative;
  overflow:hidden;
  width: 100%;

  h1{
    max-width: 50rem;
  }

  h2,h3{
    margin-bottom: 0.625rem;
  }

  .wrapper {
    ${mixins.flex("center", "flex-start")}
    flex-direction:column;

    @media ${device.tablet} {
      margin: ${({ theme }) => theme.sectionMarginS};
    }
    
    @media ${device.laptop} {
      margin: ${({ theme }) => theme.sectionMarginM};
      flex-direction:row;
    }
  }

  .media {
    ${mixins.flex("unset", "flex-start")}
    flex-direction:column;
    gap: 0.938rem;

    .year{
      font-size: 1.125rem;
      font-weight: normal;
      margin-left: 0.438rem;
      color: ${({ theme }) => theme.colors.blue};

      @media ${device.laptop} {
        font-size: 1.5rem;
      }
    }

    .genres {
      ${mixins.flex("unset", "center")}

      &>div {
        display: flex;
        flex-wrap: wrap;
        column-gap: 0.125rem;
      }

      .genre {
        color: ${({ theme }) => theme.colors.blue};
      }
      
      .runtime {
        margin-left: 0.938rem;
        display: inline-flex;
        align-items: center;
        gap: 0.313rem;
      }
    }
  }

  .genre--wrapper, .companies--wrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.313rem;

    span::after {
      content: ","
    }

    span:last-child::after{
      content: ""
    }
  }

  .buttons--wrapper {
    display: flex;
    gap: 0.625rem;
  }

`