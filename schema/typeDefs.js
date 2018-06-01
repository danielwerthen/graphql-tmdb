const typeDefs = `
  # Cache all types in Apollo Engine for an hour
  # since the data never changes. maxAge is in seconds
  # See docs here: https://www.apollographql.com/docs/engine/caching.html
  type Query @cacheControl(maxAge: 3600) {
    movies(query: String): [Movie]
    config: Config
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(movie: MovieInput): Movie
  }
  input MovieInput {
    title: String
    overview: String
  }
  type Movie @cacheControl(maxAge: 3600) {
    id: Int
    title: String
    poster_path: String
    overview: String
  }
  type Images @cacheControl(maxAge: 3600) {
    poster_sizes: [String]
    base_url: String
    secure_base_url: String
  }
  type Config @cacheControl(maxAge: 3600) {
    images: Images
  }
`;

module.exports = typeDefs;
