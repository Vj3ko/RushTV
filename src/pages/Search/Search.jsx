import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import AnimatedComponent from '../../animations/AnimatedComponent';
import { Pagination, Slider, Spinner } from '../../components/ui';
import { ApiContext } from '../../context/ApiContext';
import { Container } from "../../styles/components";
import { device, mixins } from '../../styles/utils';

const StyledSection = styled.section`
    text-align: center;
    min-height: 60vh;
    ${mixins.flex("unset", "center")};
    margin: ${({ theme }) => theme.sectionMarginS};

      @media ${device.laptop} {
        margin: ${({ theme }) => theme.sectionMarginM};
      }
    
    .wrapper {
      width: 100%;
    }

  h2{
    margin-bottom: 0.625rem;

    @media ${device.laptop} {
      font-size: 2.188rem;
    }

    em {
      text-transform: lowercase;
      font-weight: 300;
    }
  }

  a{
    color: ${({ theme }) => theme.colors.blue};
  }

  .list{
    margin-top: 1.25rem;

    .results {
      margin-top: 1.25rem;
    }
  }

  form {
    ${mixins.flex("center", "center")};
    gap: 0.938rem;
    flex-direction: column;
    margin-top: 1.25rem;

    @media ${device.laptop} {
      flex-direction: row;
    }

    input, button {
      padding: 0.625rem 1.25rem;
      border-radius: 1.563rem;
      border: none;
      font-size: 1rem;
      

      @media ${device.laptop} {
        padding: 0.875rem 1.625rem;
        max-width: unset;
      }
    }

    input {
      width: 100%;
      color: ${({ theme }) => theme.colors.white};
      background: transparent;
      outline: 3px solid ${({ theme }) => theme.colors.blue};
      text-align: center;
      max-width: 31.25rem;
      caret-color: ${({ theme }) => theme.colors.white};
    }

    button {
      font-family: ${({ theme }) => theme.fonts.action};
      letter-spacing: 2px;
      color: white;
      background: ${({ theme }) => theme.colors.blue};
      cursor: pointer;
      max-width: 31.25rem;
      width: 100%;

      @media ${device.laptop} {
        width: unset;
        padding: 0.875rem 2.25rem;
      }
    }
  }
`

const Search = () => {
  const [pageValue, setPageValue] = useState(1)
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState(null)
  const [showData, setShowData] = useState(false)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { KEY, URL } = useContext(ApiContext)


  const callbackPageChange = useCallback((page) => {
    setPageValue(page)
  }, [])

  function resetSearch() {
    setInputText("")
    setShowData(false)
    setPageValue(1)
    setData(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText && inputText.replace(/\s/g, '').length > 0) {
      fetchData(`${URL}/search/multi?api_key=${KEY}&language=en-US&query=${inputText}&page=${pageValue}&include_adult=false`)
      navigate({ pathname: '/search', search: `?q=${inputText}` });
    }

  }

  const fetchData = (url) => {
    if (!showData) setLoading(true)
    if (url) {
      let isCancelled = false;
      axios
        .get(url)
        .then((res) => {
          if (!isCancelled) setData(res.data)
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 200)
          // setLoading(false)
          setShowData(true)
        })

      return () => isCancelled = true;
    }
  }

  useEffect(() => {
    if (showData) {
      fetchData(`${URL}/search/multi?api_key=${KEY}&language=en-US&query=${inputText}&page=${pageValue}&include_adult=false`)
    }
  }, [pageValue])

  if (loading) return <Spinner />

  return (
    <AnimatedComponent>
      <Container>
        <StyledSection style={{ alignItems: (showData && data?.results.length !== 0) ? "start" : "center" }}>
          <div className='wrapper' >
            {!showData ?
              (
                <div>
                  <h2>What are u looking for</h2>
                  <p>Start searching by typing a word or a phrase.</p>
                  <form onSubmit={handleSubmit}>
                    <input type="text" autoFocus value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Enter search term' />
                    <button>Search</button>
                  </form>
                </div>)
              : (showData && data?.results.length !== 0) ? (
                <div style={{ width: "100%" }}>
                  <div>
                    <h2 style={{ textAlign: "left" }}>Results for related term: "<em>{inputText}"</em></h2>
                    <p style={{ textAlign: "left" }}>Not exactly what you were searching for? Click <Link onClick={resetSearch} to="/search">here</Link> to try again.</p>

                    <div className='list'>
                      <Slider gallery={data?.results} mediaType={data?.mediaType} />

                      <div className='results'>
                        <p>A total of {data?.total_results} results has been found!</p>
                      </div>

                      <div className="pagination--wrapper">
                        <Pagination changePage={callbackPageChange} totalPages={data?.total_pages} />
                      </div>
                    </div>
                  </div></div>)
                : <div>
                  <h2>No results found for term: "<em>{inputText}"</em></h2>
                  <p>Not exactly what you were searching for? Click <Link onClick={resetSearch} to="/search">here</Link> to try again.</p>
                </div>
            }
          </div>
        </StyledSection>
      </Container>
    </AnimatedComponent>
  )
}

export default Search