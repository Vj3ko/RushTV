import { styled } from 'styled-components';
import { device } from '../utils';

export const ListSection = styled.section`
  margin: ${({ theme }) => theme.sectionMarginS};

  @media ${device.laptop} {
    margin: ${({ theme }) => theme.sectionMarginM};
  }

  a {
    color: ${({ theme }) => theme.colors.blue};
  }

  .list {
    margin-top: 1.25rem;

    .results {
      text-align: center;
      margin-top: 1.25rem;
    }
  }
`;
