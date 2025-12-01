export const GenresThumbs: Record<GenreName, number> = {
  Comedy: require('./Comedy.jpg'),
  Crime: require('./Crime.jpg'),
  Documentary: require('./Documentary.jpg'),
  Drama: require('./Drama.jpg'),
  Family: require('./Family.jpg'),
  Fantasy: require('./Fantasy.jpg'),
  Horror: require('./Horror.jpg'),
  'Science Fiction': require('./Science Fiction.jpg'),
  Thriller: require('./Thriller.jpg'),
  Western: require('./Western.jpg'),
}

export type GenreName =
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'Horror'
  | 'Science Fiction'
  | 'Thriller'
  | 'Western'
