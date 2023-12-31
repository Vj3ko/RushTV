import { useContext } from 'react';
import { BiTime } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import AnimatedComponent from '../../animations/AnimatedComponent';
import {
  Button,
  Carousel,
  CustomBg,
  CustomImg,
  OverviewText,
  Slider,
  Spinner,
  VideoGallery,
} from '../../components/ui';
import { ApiContext } from '../../context/ApiContext';
import { useFetch } from '../../hooks/useFetch';
import { Container, PageSection, StatsSection } from '../../styles/components';
import { formatCurrency, formatDate, formatYear, getTitle } from '../../utils';

const Movie = () => {
  const { KEY, URL } = useContext(ApiContext);
  const { id } = useParams();
  const { data, loading } = useFetch({
    url: `${URL}/movie/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  });

  const theme = useTheme();

  if (loading) return <Spinner />;

  return (
    <AnimatedComponent>
      <PageSection>
        {data?.backdrop_path && (
          <CustomBg size='w1280' link={data.backdrop_path} />
        )}
        <div className='wrapper'>
          <CustomImg size='w500' link={data?.poster_path} />

          <Container>
            <div className='media'>
              {!!data?.vote_average && (
                <p>Rating: {data.vote_average.toFixed(1)}</p>
              )}
              <h1>
                {data?.title}
                {data?.release_date && (
                  <span className='year'>
                    ({formatYear(data.release_date)})
                  </span>
                )}
              </h1>

              <div className='genres'>
                {data?.genres && data?.genres.length > 0 && (
                  <div>
                    <span className='genre'>{data.genres[0].name}</span>
                    {data?.genres[1] && (
                      <span className='genre'>/ {data?.genres[1].name}</span>
                    )}
                  </div>
                )}

                {!!data?.runtime && (
                  <span className='runtime'>
                    <BiTime
                      color={theme.colors.white}
                      size={theme.iconSizeMedium}
                    />
                    <em style={{ whiteSpace: 'nowrap' }}>{data.runtime} min</em>
                  </span>
                )}
              </div>

              <div className='buttons--wrapper'>
                {data?.homepage && (
                  <Button link={data.homepage} text='Visit Website' />
                )}

                {data?.external_ids?.imdb_id && (
                  <Button
                    link={getTitle('title', data.external_ids.imdb_id)}
                    text='View on IMDB'
                  />
                )}
              </div>

              {data?.overview && <OverviewText text={data.overview} />}

              {!!data?.revenue && (
                <div>
                  <h3>Revenue</h3>
                  <span>{formatCurrency(data.revenue)}</span>
                </div>
              )}

              {!!data?.budget && (
                <div>
                  <h3>Budget</h3>
                  <span>{formatCurrency(data.budget)}</span>
                </div>
              )}
            </div>
          </Container>
        </div>

        <Container>
          {data?.release_date && (
            <StatsSection>
              <h3>Release Date</h3>
              <span>{formatDate(data.release_date)}</span>
            </StatsSection>
          )}

          {data?.status && (
            <StatsSection>
              <h3>Status</h3>
              <span>{data.status}</span>
            </StatsSection>
          )}

          {data?.original_language && (
            <StatsSection>
              <h3>Language</h3>
              <span className='language'>{data.original_language}</span>
            </StatsSection>
          )}

          {data?.genres && data?.genres.length > 0 && (
            <StatsSection>
              <h3>Genres</h3>
              <span>
                {data.genres.map((genre, index) => {
                  if (index === data.genres.length - 1) {
                    return genre.name;
                  }
                  return `${genre.name}, `;
                })}
              </span>
            </StatsSection>
          )}

          {data?.production_companies &&
            data?.production_companies.length > 0 && (
              <StatsSection>
                <h3>Production Companies</h3>
                <span>
                  {data.production_companies.map((company, index) => {
                    if (index === data.production_companies.length - 1) {
                      return company.name;
                    }
                    return `${company.name}, `;
                  })}
                </span>
              </StatsSection>
            )}

          {data?.credits?.cast && data?.credits?.cast.length > 0 && (
            <StatsSection>
              <h2>Cast</h2>
              <Slider gallery={data.credits.cast} mediaType='person' />
            </StatsSection>
          )}

          {data?.videos?.results && data?.videos?.results.length > 0 && (
            <StatsSection>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={data.videos.results} />
            </StatsSection>
          )}

          {data?.images?.backdrops && data?.images?.backdrops.length > 0 && (
            <StatsSection>
              <h2>Images</h2>
              <Carousel data={data.images.backdrops} size='big' />
            </StatsSection>
          )}

          {data?.recommendations?.results &&
            data?.recommendations?.results.length > 0 && (
              <StatsSection>
                <h2>Recommended Movies</h2>
                <Slider
                  gallery={data.recommendations.results}
                  mediaType='movie'
                />
              </StatsSection>
            )}

          {data?.similar?.results && data?.similar?.results.length > 0 && (
            <StatsSection>
              <h2>Similar Movies</h2>
              <Slider gallery={data.similar.results} mediaType='movie' />
            </StatsSection>
          )}
        </Container>
      </PageSection>
    </AnimatedComponent>
  );
};

export default Movie;
