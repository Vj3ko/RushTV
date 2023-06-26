import styled from 'styled-components';

export const FilterBtns = styled.div`
  margin-top: 0.938rem;
  display: flex;
  gap: 0.625rem;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;
