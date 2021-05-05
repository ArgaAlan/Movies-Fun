export interface MovieShowResult {
  ids: { trakt: number; slug: string; imdb: string; tmdb: number };
  title: string;
  year: number;
  type?: 'movie' | 'show';
}

export interface Movie {
  title: string;
  year: number;
  ids: IDS;
  tagline: string;
  overview: string;
  released: Date;
  runtime: number;
  country: string;
  trailer: string;
  homepage: string;
  status: string;
  rating: number;
  votes: number;
  comment_count: number;
  updated_at: Date;
  language: string;
  available_translations: string[];
  genres: string[];
  certification: string;
  imageUrl?: string;
}

export interface IDS {
  trakt: number;
  slug: string;
  imdb: string;
  tmdb: number;
}

export interface QueryResult {
  type: string;
  score: number;
}

export interface QueryMovieShowResult extends QueryResult {
  movie?: MovieShowResult
  show?: MovieShowResult
}
