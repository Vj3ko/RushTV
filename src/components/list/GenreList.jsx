import { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import AnimatedComponent from '../../animations/AnimatedComponent';
import { ApiContext } from '../../context/ApiContext';
import { useFetch } from '../../hooks/useFetch';
import { Container, FilterBtns, ListSection } from '../../styles/components';
import { Pagination, Slider } from '../ui';

const StyledButton = styled.button`
  white-space: nowrap;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.action};
  font-size: 1rem;
  letter-spacing: 0.125rem;
  padding: 0.313rem 1.25rem;
  border-radius: 1.563rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue};
  border: 0.063rem solid ${({ theme }) => theme.colors.blue};
  transition: ${({ theme }) => theme.transition};
  outline: none;
  scroll-snap-align: start;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const GenreList = ({ mediaType, title, genre }) => {
  const [pageValue, setPageValue] = useState(1);
  const [filter, setFilter] = useState('vote_count.desc');
  const { KEY, URL } = useContext(ApiContext);

  const { data } = useFetch({
    url: `${URL}/discover/${mediaType}?api_key=${KEY}&include_adult=false&page=${pageValue}&with_genres=${genre}&sort_by=${filter}`,
  });

  const callbackPageChange = useCallback(page => {
    setPageValue(page);
  }, []);

  return (
    <AnimatedComponent>
      <ListSection>
        <Container>
          <h2>{title}</h2>
          <p>
            Not happy with the results? You can always use our{' '}
            <Link to='/search'>search</Link> option.
          </p>

          <FilterBtns>
            <StyledButton onClick={() => setFilter('popularity.desc')}>
              Most Popular
            </StyledButton>
            <StyledButton onClick={() => setFilter('vote_count.desc')}>
              Most Voted
            </StyledButton>
            <StyledButton onClick={() => setFilter('popularity.asc')}>
              Least Popular
            </StyledButton>
            <StyledButton onClick={() => setFilter('revenue.desc')}>
              Biggest Revenue
            </StyledButton>
            <StyledButton
              onClick={() => setFilter('primary_release_date.desc')}>
              Latest
            </StyledButton>
            <StyledButton onClick={() => setFilter('primary_release_date.asc')}>
              Oldest
            </StyledButton>
          </FilterBtns>

          <div className='list'>
            <Slider gallery={data?.results} mediaType={mediaType} />

            <div className='results'>
              <p>A total of {data?.total_results} results has been found!</p>
            </div>

            <div className='pagination--wrapper'>
              <Pagination
                changePage={callbackPageChange}
                totalPages={data?.total_pages}
              />
            </div>
          </div>
        </Container>
      </ListSection>
    </AnimatedComponent>
  );
};

export default GenreList;
