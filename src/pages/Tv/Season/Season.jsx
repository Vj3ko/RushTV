import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AnimatedComponent from "../../../animations/AnimatedComponent";
import { Carousel, CustomImg, OverviewText, Slider, Spinner, VideoGallery } from '../../../components/ui';
import { ApiContext } from '../../../context/ApiContext';
import { useFetch } from '../../../hooks/useFetch';
import { Container, PageSection, StatsSection } from '../../../styles/components';
import { formatDate, formatYear } from "../../../utils";



const Season = () => {
  const { KEY, URL } = useContext(ApiContext)
  const { id, season_number } = useParams()
  const { data, loading } = useFetch({
    url: `${URL}/tv/${id}/season/${season_number}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`
  })

  const { data: dataTv } = useFetch({
    url: `${URL}/tv/${id}?api_key=${KEY}`
  })

  if (loading) return <Spinner />


  return (
    <AnimatedComponent>
      <PageSection>
        <div className='wrapper'>
          <CustomImg size="w500" link={data?.poster_path} />

          <Container>
            <div className="media">
              <h1>{dataTv?.title ?? dataTv?.name}: {data?.name}
                {data?.air_date && <span className='year'>({formatYear(data.air_date)})</span>}
              </h1>

              {data?.overview && <OverviewText text={data.overview} />}

              {data?.air_date && (
                <div>
                  <h3>Air Date</h3>
                  <p>{formatDate(data.air_date)}</p>
                </div>
              )}

              {!!data?.season_number && (
                <div>
                  <h3>Season Number</h3>
                  <p>{data.season_number}</p>
                </div>
              )}

              {!!data?.episodes && (
                <div>
                  <h3>Number of episodes</h3>
                  <p>{data.episodes.length}</p>
                </div>
              )}
            </div>
          </Container>
        </div>

        <Container >
          {(data?.episodes && data?.episodes.length > 0) && (
            <StatsSection>
              <h2>Episodes</h2>
              <Slider gallery={data.episodes} mediaType="episode" size="big" id={id} />
            </StatsSection>
          )}

          {(data?.videos?.results && data?.videos?.results.length > 0) && (
            <StatsSection>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={data.videos.results} />
            </StatsSection>
          )}

          {(data?.credits?.cast && data?.credits?.cast.length > 0) && (
            <StatsSection>
              <h2>Cast</h2>
              <Slider gallery={data.credits.cast} mediaType="person" />
            </StatsSection>
          )}

          {(data?.images?.posters && data?.images.posters.length > 0) && (
            <StatsSection>
              <h2>Images</h2>
              <Carousel data={data.images.posters} />
            </StatsSection>
          )}
        </Container>


      </PageSection>
    </AnimatedComponent>
  )
}

export default Season;
