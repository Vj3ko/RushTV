import { styled } from 'styled-components'
import { device } from '../../styles/utils'

const StyledLink = styled.a`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.action};
  font-size: 1rem;
  letter-spacing: 0.125rem;
  padding: 0.25rem 1.125rem;
  border-radius: 1.563rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  transition: ${({ theme }) => theme.transition};

  @media ${device.tablet} {
    padding: 0.375rem 1.375rem;
  }

  &:hover,&:focus{
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`

export const Button = ({ link, text, target }) => {
  return link && <StyledLink href={link} target="_blank">{text}</StyledLink>
}
