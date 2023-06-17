import styled from 'styled-components'
import { device } from '../utils'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.containerPaddingS};

  @media ${device.laptop} {
    padding: ${({ theme }) => theme.containerPaddingM};
  }

`