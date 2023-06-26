import { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedComponent from '../../animations/AnimatedComponent';
import { ApiContext } from '../../context/ApiContext';
import { useFetch } from '../../hooks/useFetch';
import { Container, ListSection } from '../../styles/components';
import { Pagination, Slider } from '../ui';

const TrendingList = ({ mediaType, timeline, title }) => {
  const [pageValue, setPageValue] = useState(1);
  const { KEY, URL } = useContext(ApiContext);

  const { data } = useFetch({
    url: `${URL}/trending/${mediaType}/${timeline}?api_key=${KEY}&include_adult=false&page=${pageValue}`,
  });

  const callbackPageChange = useCallback(page => {
    setPageValue(page);
  }, []);

  return (
    <AnimatedComponent>
      <ListSection>
        <Container>
          <h2>Trending {title} this week</h2>
          <p>
            Not happy with the results? You can always use our{' '}
            <Link to='/search'>search</Link> option.
          </p>

          <div className='list'>
            <Slider gallery={data?.results} />

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

export default TrendingList;
