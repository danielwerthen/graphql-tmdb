const fetch = require('node-fetch');

const TMDB_API_PATH = 'https://api.themoviedb.org/3';

const movies = [
  {
    id: 150,
    title: 'Starwars',
    poster_path: 'foobar',
    overview: 'foobar',
  },
];

const resolvers = {
  Query: {
    movies: (root, args, context) => {
      // Wrapping a REST API with GraphQL is simple, you just describe the
      // result in the schema above, and call fetch in the resolver
      // See a complete tutorial: https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
      return movies;
    },
    config: (_, $, context) => {
      return fetch(
        `${TMDB_API_PATH}/configuration?api_key=${context.secrets.TMDB_API_KEY}`
      ).then(res => res.json());
    },
    movie: (root, args, context) => {
      return movies.find(movie => movie.id === args.id);
    },
  },
  Mutation: {
    createMovie: (_, { movie }) => {
      const nextId =
        movies.reduce((id, movie) => {
          return Math.max(id, movie.id);
        }, -1) + 1;
      const newMovie = {
        id: nextId,
        ...movie,
        title: movie.title.toUpperCase(),
      };
      movies.push(newMovie);
      return newMovie;
    },
  },
};

module.exports = resolvers;
