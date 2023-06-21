import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, styled } from "styled-components";
import { MemoizedFooter } from "./components/Footer";
import { MemoizedNavigation } from "./components/Navigation";
import { CustomList, GenreList, PopularList, TopRatedList, TrendingList } from "./components/list";
import { ApiContext } from "./context/ApiContext";
import { Episode, Home, Movie, Person, Search, Season, Tv } from "./pages";
import { GlobalStyles, theme } from "./styles/utils";
import { ScrollToTop } from "./utils";

const KEY = process.env.REACT_APP_API_KEY
const URL = process.env.REACT_APP_BASE_URL
const IMG_URL = process.env.REACT_APP_IMG_URL

const StyledMain = styled.main`
  min-height: 50vh;
`



function App() {
  const location = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [location.pathname])

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MemoizedNavigation />
        <ScrollToTop />

        <StyledMain>
          <ApiContext.Provider value={{ KEY, URL, IMG_URL }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>

                <Route path='/' element={<Home />} />
                <Route path="/search" element={<Search />} />

                {/* Trending paths */}
                <Route path="/trending/movies" element={<TrendingList mediaType="movie" timeline="week" title="movies" />} />
                <Route path="/trending/tv" element={<TrendingList mediaType="tv" timeline="week" title="Tv Shows" />} />
                <Route path="/trending/people" element={<TrendingList mediaType="person" timeline="week" title="people" />} />

                {/* Popular paths */}
                <Route path="/popular/movies" element={<PopularList mediaType="movie" title="movies" />} />
                <Route path="/popular/tv" element={<PopularList mediaType="tv" title="Tv Shows" />} />
                <Route path="/popular/people" element={<PopularList mediaType="person" title="people" />} />

                {/* Top Rated paths */}
                <Route path="/top-rated/movies" element={<TopRatedList mediaType="movie" link="movie" title="movies" />} />
                <Route path="/top-rated/tv" element={<TopRatedList mediaType="tv" link="tv" title="Tv Shows" />} />

                {/* Movie paths */}
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/upcoming/movies" element={<CustomList mediaType="movie" type="upcoming" title="Upcoming Movies" />} />
                <Route path="/theatre/movies" element={<CustomList mediaType="movie" type="now_playing" title="Movies currently in Theatres" />} />

                {/* Tv paths */}
                <Route path="/tv/:id" element={<Tv />} />
                <Route path="/on-the-air/tv" element={<CustomList mediaType="tv" type="on_the_air" title="TV Shows currently on the air" />} />
                <Route path="/airing-today/tv" element={<CustomList mediaType="tv" type="airing_today" title="Airing Today TV Shows" />} />

                {/* Person path */}
                <Route path="/person/:id" element={<Person />} />

                {/* Tv Shows Genre Paths */}
                <Route path="/discover/tv/genre/action&adventure" element={<GenreList mediaType="tv" link="tv" title="Action & Adventure tv shows" genre="10759" />} />
                <Route path="/discover/tv/genre/comedy" element={<GenreList mediaType="tv" link="tv" title="Comedy tv shows" genre="35" />} />
                <Route path="/discover/tv/genre/crime" element={<GenreList mediaType="tv" link="tv" title="Crime tv shows" genre="80" />} />
                <Route path="/discover/tv/genre/drama" element={<GenreList mediaType="tv" link="tv" title="Drama tv shows" genre="18" />} />
                <Route path="/discover/tv/genre/documentary" element={<GenreList mediaType="tv" link="tv" title="Documentary tv shows" genre="99" />} />
                <Route path="/discover/tv/genre/family" element={<GenreList mediaType="tv" link="tv" title="Family tv shows" genre="10751" />} />
                <Route path="/discover/tv/genre/kids" element={<GenreList mediaType="tv" link="tv" title="Kids tv shows" genre="10762" />} />
                <Route path="/discover/tv/genre/mystery" element={<GenreList mediaType="tv" link="tv" title="Mystery tv shows" genre="9648" />} />
                <Route path="/discover/tv/genre/reality" element={<GenreList mediaType="tv" link="tv" title="Reality tv shows" genre="10764" />} />
                <Route path="/discover/tv/genre/romance" element={<GenreList mediaType="tv" link="tv" title="Romance tv shows" genre="10749" />} />
                <Route path="/discover/tv/genre/soap" element={<GenreList mediaType="tv" link="tv" title="Soap tv shows" genre="10766" />} />
                <Route path="/discover/tv/genre/sci-fi&fantasy" element={<GenreList mediaType="tv" link="tv" title="SCI-FI & Fantasy tv shows" genre="10765" />} />

                {/* Movies Genre Paths */}
                <Route path="/discover/movies/genre/action" element={<GenreList mediaType="movie" link="movie" title="Action movies" genre="28" />} />
                <Route path="/discover/movies/genre/adventure" element={<GenreList mediaType="movie" link="movie" title="Adventure movies" genre="12" />} />
                <Route path="/discover/movies/genre/comedy" element={<GenreList mediaType="movie" link="movie" title="Comedy movies" genre="35" />} />
                <Route path="/discover/movies/genre/crime" element={<GenreList mediaType="movie" link="movie" title="Crime movies" genre="80" />} />
                <Route path="/discover/movies/genre/documentary" element={<GenreList mediaType="movie" link="movie" title="Documentary movies" genre="99" />} />
                <Route path="/discover/movies/genre/drama" element={<GenreList mediaType="movie" link="movie" title="Drama movies" genre="18" />} />
                <Route path="/discover/movies/genre/horror" element={<GenreList mediaType="movie" link="movie" title="Horror movies" genre="27" />} />
                <Route path="/discover/movies/genre/mystery" element={<GenreList mediaType="movie" link="movie" title="Mystery movies" genre="9648" />} />
                <Route path="/discover/movies/genre/romance" element={<GenreList mediaType="movie" link="movie" title="Romance movies" genre="10749" />} />
                <Route path="/discover/movies/genre/sci-fi&fantasy" element={<GenreList mediaType="movie" link="movie" title="SCI-FI & Fantasy movies" genre="14,878" />} />
                <Route path="/discover/movies/genre/thriller" element={<GenreList mediaType="movie" link="movie" title="Thriller movies" genre="53" />} />

                {/* Season Path */}
                <Route path='/tv/:id/season/:season_number' element={<Season />} />

                {/* Episode Path */}
                <Route path='/tv/:id/season/:season_number/episode/:episode_number' element={<Episode />} />


              </Routes>
            </AnimatePresence>
          </ApiContext.Provider>
        </StyledMain>

        <MemoizedFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
