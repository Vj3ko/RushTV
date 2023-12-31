import { useContext } from 'react';
import { useParams } from 'react-router-dom';
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
import { formatDate, formatYear, getTitle } from '../../utils';

const Tv = () => {
  const { KEY, URL } = useContext(ApiContext);
  const { id } = useParams();
  const { data, loading } = useFetch({
    url: `${URL}/tv/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  });

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
                {data?.title ?? data?.name}
                {data?.first_air_date && (
                  <span className='year'>
                    ({formatYear(data.first_air_date)})
                  </span>
                )}
              </h1>

              {data?.tagline && <p>"{data.tagline}"</p>}

              {data?.genres.length > 0 && (
                <div className='genres'>
                  <div>
                    <span className='genre'>{data?.genres[0].name}</span>
                    {data?.genres[1] && (
                      <span className='genre'>/ {data?.genres[1].name}</span>
                    )}
                  </div>
                </div>
              )}

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

              {!!data?.number_of_seasons && (
                <div>
                  <h3>Number of seasons</h3>
                  <p>{data.number_of_seasons}</p>
                </div>
              )}

              {!!data?.number_of_episodes && (
                <div>
                  <h3>Number of episodes</h3>
                  <p>{data.number_of_episodes}</p>
                </div>
              )}
            </div>
          </Container>
        </div>

        <Container>
          {data?.first_air_date && (
            <StatsSection>
              <h3>First Air Date</h3>
              <p>{formatDate(data.first_air_date)}</p>
            </StatsSection>
          )}

          {data?.last_episode_to_air && (
            <StatsSection>
              <h3>Last Aired Episode</h3>
              <p>{data.last_episode_to_air.name}</p>
              <p>{formatDate(data.last_episode_to_air.air_date)}</p>
            </StatsSection>
          )}

          {data?.next_episode_to_air && (
            <StatsSection>
              <h3>Next Episode To Air</h3>
              <p>{data.next_episode_to_air.name}</p>
              <p>{formatDate(data.next_episode_to_air.air_date)}</p>
            </StatsSection>
          )}

          {data?.status && (
            <StatsSection>
              <h3>Status</h3>
              <p>{data.status}</p>
            </StatsSection>
          )}

          {data?.original_language && (
            <StatsSection>
              <h3>Language</h3>
              <p className='language'>{data.original_language}</p>
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

          {data?.seasons && data?.seasons.length > 0 && (
            <StatsSection>
              <h2>Seasons</h2>
              <Slider gallery={data.seasons} mediaType='season' id={id} />
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

          {data?.images?.backdrops && data?.images.backdrops.length > 0 && (
            <StatsSection>
              <h2>Images</h2>
              <Carousel data={data.images.backdrops} size='big' />
            </StatsSection>
          )}

          {data?.recommendations?.results &&
            data?.recommendations.results.length > 0 && (
              <StatsSection>
                <h2>Recommended Tv Shows</h2>
                <Slider gallery={data.recommendations.results} mediaType='tv' />
              </StatsSection>
            )}

          {data?.similar?.results && data?.similar?.results.length > 0 && (
            <StatsSection>
              <h2>Similar Tv Shows</h2>
              <Slider gallery={data.similar.results} mediaType='tv' />
            </StatsSection>
          )}
        </Container>
      </PageSection>
    </AnimatedComponent>
  );
};

export default Tv;
