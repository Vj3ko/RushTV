# [Rush TV](https://rush-tv.vercel.app/)

Rush TV is an application that allows users to search for movies, TV shows, and actors, providing them with detailed information sourced from The Movie Database (TMDB). With Rush TV, users can explore their favorite movies, discover new TV shows, and learn more about their favorite actors, all in one place.

## Features

- **Search:** Easily search for movies, TV shows, or actors by entering the desired name in the search bar.
- **Detailed Information:** Get comprehensive information about movies, TV shows, and actors, including plot summaries, release dates, genres, ratings, and more.
- **Related Content:** Explore related content such as recommended movies, similar TV shows, and other works by the same actor.
- **External Links:** Find direct links to official websites, IMDb profiles, and social media accounts of actors and productions.

## Screenshots

<table>
    <tr>
        <td valign="top"><img src="/src/assets/screenshots/movie.png" width="100%" /></td>
        <td valign="top"> <img src="/src/assets/screenshots/actor.png" width="100%" /></td>
    </tr>
</table>

<table>
    <tr>
        <td><img src="/src/assets/screenshots/comedy.png" width="100%" /></td>
    </tr>
    <tr>
        <td><img src="/src/assets/screenshots/actors.png" width="100%" /></td>
    </tr>
        <tr>
        <td><img src="/src/assets/screenshots/toprated.png" width="100%" /></td>
    </tr>
        <tr>
        <td><img src="/src/assets/screenshots/upcoming.png" width="100%" /></td>
</table>

## Installation

1. Clone the repository to your local machine.

```
git clone https://github.com/Vj3ko/RushTV
```

2. Install the required dependencies.

```
cd rushTV
npm install
```

3. Set up your TMDB API key.
   - Visit the [TMDB website](https://www.themoviedb.org/documentation/api) and create an account.
   - Generate an API key from your TMDB account dashboard.
   - Duplicate `.env.template` and rename it to `.env` file in the project root directory.
   - Fill in `REACT_APP_API_KEY` with your actual TMDB API key.

```
REACT_APP_API_KEY=YOUR_TMDB_API_KEY
```

4. Start the application.

```
npm start
```

## Technologies Used

- React: JavaScript library for building user interfaces.
- Framer Motion: Animation library for React, providing smooth and interactive animations.
- React Router: Library for handling routing and navigation in React applications.
- React Toastify: React notification library for displaying alerts and notifications.
- Swiper: Touch-enabled slider library for creating responsive and touch-friendly carousels and sliders.
- Axios: Promise-based HTTP client for making API requests.
- TMDB API: The Movie Database API for accessing movie, TV show, and actor data.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Rush TV makes use of the TMDB API for accessing movie, TV show, and actor data. Special thanks to the TMDB team for providing this valuable resource.

Enjoy using Rush TV and happy movie watching!
