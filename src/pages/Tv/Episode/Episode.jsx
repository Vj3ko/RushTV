import { useContext } from 'react';
import { BiTime } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import AnimatedComponent from "../../../animations/AnimatedComponent";
import { Carousel, CustomBg, OverviewText, Slider, Spinner, VideoGallery } from '../../../components/ui';
import { ApiContext } from '../../../context/ApiContext';
import { useFetch } from '../../../hooks/useFetch';
import { Container, PageSection, StatsSection } from '../../../styles/components';
import { formatDate, formatYear } from "../../../utils";


const Episode = () => {
  const { KEY, URL } = useContext(ApiContext)
  const { id, season_number, episode_number } = useParams()
  const { data, loading } = useFetch({
    url: `${URL}/tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`
  })

  const { data: dataTv } = useFetch({
    url: `${URL}/tv/${id}?api_key=${KEY}`
  })

  if (loading) return <Spinner />


  return (
    <AnimatedComponent>
      <PageSection>
        <div className='wrapper'>
          {data?.still_path && <CustomBg size="w1280" link={data.still_path} />}

          <Container>
            <div className="media">
              <h1>{dataTv?.title ?? dataTv?.name}: {data?.name}
                {data?.air_date && <span className='year'>({formatYear(data.air_date)})</span>}
              </h1>

              {!!data?.vote_average && <p>Rating: {data.vote_average.toFixed(1)}</p>}

              {!!data?.runtime && <span className='runtime'>
                <BiTime color="#ffffff" size={20} />
                <em style={{ whiteSpace: "nowrap" }}>{data.runtime} min</em>
              </span>}

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

              {!!data?.episode_number && (
                <div>
                  <h3>Episode Number</h3>
                  <p>{data.episode_number}</p>
                </div>
              )}
            </div>
          </Container>
        </div>

        <Container >
          {(data?.videos?.results && data?.videos?.results.length > 0) && (
            <StatsSection>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={data.videos.results} />
            </StatsSection>
          )}

          {(data?.guest_stars && data?.guest_stars.length > 0) && (
            <StatsSection>
              <h2>Guest Stars</h2>
              <Slider gallery={data.guest_stars} mediaType="person" />
            </StatsSection>
          )}

          {(data?.credits?.cast && data?.credits?.cast.length > 0) && (
            <StatsSection>
              <h2>Cast</h2>
              <Slider gallery={data.credits.cast} mediaType="person" />
            </StatsSection>
          )}

          {(data?.images?.stills && data?.images?.stills.length > 0) && (
            <StatsSection>
              <h2>Images</h2>
              <Carousel data={data.images.stills} size="big" />
            </StatsSection>
          )}
        </Container>


      </PageSection>
    </AnimatedComponent>
  )
}

export default Episode;
