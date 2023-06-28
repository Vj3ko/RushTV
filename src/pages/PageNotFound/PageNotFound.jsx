import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import AnimatedComponent from '../../animations/AnimatedComponent';
import { Container, PageSection } from '../../styles/components';

const PageNotFound = () => {
  const theme = useTheme();
  return (
    <AnimatedComponent>
      <PageSection>
        <div className='wrapper'>
          <Container>
            <h2>Lost your way?</h2>
            <p>
              Sorry we can't find that page. You'll find loads to explore on the
              <Link to='/' style={{ color: theme.colors.blue }}>
                {' '}
                home{' '}
              </Link>
              page.
            </p>
          </Container>
        </div>
      </PageSection>
    </AnimatedComponent>
  );
};

export default PageNotFound;
