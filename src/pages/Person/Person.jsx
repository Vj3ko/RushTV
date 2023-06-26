import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import AnimatedComponent from '../../animations/AnimatedComponent';
import {
  Button,
  Carousel,
  CustomImg,
  OverviewText,
  Slider,
  Spinner,
} from '../../components/ui';
import { ApiContext } from '../../context/ApiContext';
import { useFetch } from '../../hooks/useFetch';
import { Container, PageSection, StatsSection } from '../../styles/components';
import {
  calculateAge,
  calculateLifeSpan,
  formatDate,
  getGender,
  getTitle,
} from '../../utils';

const Person = () => {
  const { KEY, URL } = useContext(ApiContext);
  const { id } = useParams();
  const { data, loading } = useFetch({
    url: `${URL}/person/${id}?api_key=${KEY}&include_adult=false&append_to_response=videos,similar,credits,recommendations,images,release_dates,content_ratings,external_ids&include_image_language=en,null`,
  });

  if (loading) return <Spinner />;

  return (
    <AnimatedComponent>
      <PageSection>
        <div className='wrapper'>
          <CustomImg size='w500' link={data?.profile_path} />

          <Container>
            <div className='media'>
              <h1>{data?.name}</h1>

              <div className='buttons--wrapper'>
                {data?.imdb_id && (
                  <Button
                    link={getTitle('name', data.imdb_id)}
                    text='View on IMDB'
                  />
                )}
              </div>

              {data?.biography && (
                <OverviewText text={data.biography} type='person' />
              )}

              {data?.deathday !== null ? (
                <div>
                  <h3>Date of birth</h3>
                  <p>
                    {formatDate(data?.birthday)} - {formatDate(data?.deathday)}{' '}
                    (died at {calculateLifeSpan(data?.birthday, data?.deathday)}
                    )
                  </p>
                </div>
              ) : (
                <div>
                  <h3>Date of birth</h3>
                  <p>
                    {formatDate(data?.birthday)} ({calculateAge(data?.birthday)}{' '}
                    years old)
                  </p>
                </div>
              )}

              {!!data?.place_of_birth && (
                <div>
                  <h3>Place of birth</h3>
                  <p>{data.place_of_birth}</p>
                </div>
              )}
            </div>
          </Container>
        </div>

        <Container>
          {!!data?.gender && (
            <StatsSection>
              <h3>Gender</h3>
              <p>{getGender(data.gender)}</p>
            </StatsSection>
          )}

          {data?.known_for_department && (
            <StatsSection>
              <h3>Known for</h3>
              <p>{data.known_for_department}</p>
            </StatsSection>
          )}

          {data?.also_known_as && data?.also_known_as.length > 0 && (
            <StatsSection>
              <h3>Also known as</h3>
              {data.also_known_as.map(item => (
                <p key={item}>{item}</p>
              ))}
            </StatsSection>
          )}

          {(data?.external_ids?.instagram_id ||
            data?.external_ids.facebook_id ||
            data?.external_ids?.twitter_id) && (
            <StatsSection>
              <h3>Social Media</h3>
              {data.external_ids.instagram_id && (
                <p>
                  <a
                    className='socialmedia--link'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://instagram.com/${data.external_ids.instagram_id}`}>
                    Instagram
                  </a>
                </p>
              )}
              {data.external_ids.facebook_id && (
                <p>
                  <a
                    className='socialmedia--link'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://facebook.com/${data.external_ids.facebook_id}`}>
                    Facebook
                  </a>
                </p>
              )}
              {data.external_ids.twitter_id && (
                <p>
                  {' '}
                  <a
                    className='socialmedia--link'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://twitter.com/${data.external_ids.twitter_id}`}>
                    Twitter
                  </a>
                </p>
              )}
            </StatsSection>
          )}

          {data?.images?.profiles && data?.images?.profiles.length > 0 && (
            <StatsSection>
              <h2>Images</h2>
              <Carousel data={data.images.profiles} />
            </StatsSection>
          )}

          {data?.credits?.cast && data?.credits?.cast.length > 0 && (
            <StatsSection>
              <h2>Known for</h2>
              <Slider gallery={data.credits.cast} mediaType='movie' />
            </StatsSection>
          )}
        </Container>
      </PageSection>
    </AnimatedComponent>
  );
};

export default Person;
