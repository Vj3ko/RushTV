import { useContext, useRef } from 'react';
import { BsChevronCompactDown } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import AnimatedComponent from '../../animations/AnimatedComponent';
import heroImg from "../../assets/images/home_bg.jpg";
import lastOfUsImage from "../../assets/images/last2.jpg";
import { ApiContext } from '../../context/ApiContext';
import { useFetch } from '../../hooks/useFetch';
import { Container } from '../../styles/components';
import { device, mixins } from '../../styles/utils';
import Banner from './Banner/Banner';
import { Cards } from './Cards/Cards';
import { ScrollTray } from './ScrollTray/ScrollTray';

const StyledHero = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  ${mixins.flex("center", "center")}
  flex-direction: column;
  gap: 1.25rem;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: -21.875rem center;

    @media ${device.tablet} {
      object-position: unset;
    }
  }


  h1{
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.action};
    z-index: 2;
    letter-spacing: 1.2px;
    max-width: 31.25rem;
    line-height: 2.5rem;
    padding: 0 0.625rem;

    @media ${device.laptop} {
      font-size: 2.813rem;
      max-width: 43.75rem;
    }
  }

  p {
    z-index: 2;
    max-width: 43.75rem;
    text-align: center;
    padding: 0 0.625rem;
  }

  .overlay {
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: -1px;
    background: radial-gradient(rgba(11, 12, 15,1), rgba(11, 12, 15,0)), linear-gradient(180deg, rgba(11,12,15,0) 80%,rgba(11,12,15,0.9) 95% , rgba(11,12,15,1) 100%);
  }

  .scrollToContent{
    background: transparent;
    z-index: 10;
    position: absolute;
    bottom: 3.125rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 1s infinite alternate;

    &.second {
      pointer-events: none;
      animation: bounce 1s .3s infinite alternate;
    }
  }


  @keyframes bounce {
    0%{
      transform: translateY(0);
    } 100% {
      transform: translateY(10px);
    }
  }
`

const Description = styled.div`
  margin: 4.688rem auto;
  max-width: 28.125rem;
  text-align: center;
  ${mixins.flex("center", "center")}
  flex-direction: column;
  gap: 0.938rem;

  @media ${device.tablet} {
    max-width: 40.625rem;
  }
  
  .explore {
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.action};
  font-size: 1rem;
  letter-spacing: 0.125rem;
  padding: 0.313rem 1.25rem;
  border-radius: 1.563rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  transition: ${({ theme }) => theme.transition};

    &:hover,&:focus{
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
    }

    @media ${device.laptop} {
      font-size: 1.125rem;
      padding: 0.625rem 1.5rem;
    }
  }
`


const Home = () => {
  const { KEY, URL } = useContext(ApiContext)
  const { data: comedyData } = useFetch({
    url: `${URL}/discover/movie?api_key=${KEY}&include_adult=false&with_genres=35`
  })

  const { data: topRatedData } = useFetch({
    url: `${URL}/movie/top_rated?api_key=${KEY}&include_adult=false`
  })

  const { data: crimeData } = useFetch({
    url: `${URL}/discover/movie?api_key=${KEY}&include_adult=false&with_genres=80`
  })

  const desc = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth"
    })
  }


  return (
    <AnimatedComponent>
      <StyledHero >
        <img src={heroImg} alt="background filled with random movie and tv posters" />
        <h1>Rush TV, the ultimate application for all your entertainment needs! </h1>
        <p>
          With Rush TV, you can embark on an exciting journey through the vast world of movies, TV shows and your favorite celebrities. Whether you're in the mood for a thrilling action-packed film, a heartwarming romance, or a gripping TV series, Rush TV has got you covered.
        </p>
        <button onClick={() => scrollToSection(desc)} className='scrollToContent' >
          <BsChevronCompactDown color="#B3B3B3" size={30} />
        </button>

        <div className='scrollToContent second' >
          <BsChevronCompactDown color="#B3B3B3" size={30} />
        </div>
        <div className="overlay" />
      </StyledHero>

      <Container >
        <Description ref={desc}>
          <h2>
            Searching for your favorite movies or TV shows has never been easier
          </h2>
          <p>With our intuitive search feature, you can simply type in the title or keywords, and Rush TV will present you with a plethora of options to choose from. From classic blockbusters to the latest releases, our extensive library ensures that you'll find exactly what you're looking for.</p>
          <Link className='explore' to={`/search`}>
            Start searching
          </Link>
        </Description>
      </Container>

      {comedyData?.results && <ScrollTray gallery={comedyData.results} mediaType="movie" direction="right" />}
      {crimeData?.results && <ScrollTray gallery={crimeData.results} mediaType="movie" direction="left" />}
      {topRatedData?.results && <ScrollTray gallery={topRatedData.results} mediaType="movie" direction="right" />}

      <Container>
        <Description>
          <h2>Explore an extensive library of TV shows and movies, covering a wide range of genres to suit every taste.</h2>
          <p>WWhether you're in the mood for action, comedy, romance, or something entirely different, Rush TV has you covered. Dive into popular releases, binge-worthy series, or discover hidden gems that will leave you wanting more.</p>
        </Description>
        <Cards />
      </Container>

      {/* <Banner
        title="Join the Rush TV community today and unlock a universe of entertainment possibilities."
        description="But Rush TV isn't just limited to movies and TV shows. We know how important it is for you to stay up to date with your favorite actors, actresses, and celebrities. With our comprehensive database, you can explore the lives and careers of famous personalities, dive into their filmography, and learn interesting trivia about them."
        img={lastOfUsImage}
        position="left"
      /> */}

    </AnimatedComponent>

  )
}



export default Home;
