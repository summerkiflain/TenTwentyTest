import { Dimensions } from 'react-native'

export const TMDB_BASE_URL = 'https://api.themoviedb.org'
export const TMDB_VERSION = '3'
export const TMDB_API_ENDPOINT = `${TMDB_BASE_URL}/${TMDB_VERSION}`
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/'

export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('screen').height
