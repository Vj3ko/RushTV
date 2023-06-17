import { styled } from 'styled-components';
import { device } from '../utils';

export const StatsSection = styled.section`
    margin: 1.25rem 0;

    @media ${device.laptop}{
      margin: 2.5rem 0;
    }
`