const BASE_URL = "https://api.tvmaze.com/";

const generateUrl = (v) => [BASE_URL, v].join("");

const api = {
  get(url, query = {}, ...atrs) {
    const formattedQuery = Object.entries(query)
      .filter(([, value]) => value)
      .map(([key, value]) =>
        [encodeURIComponent(key), encodeURIComponent(value)].join("=")
      )
      .join("&");

    const formattedUrl = formattedQuery ? [url, formattedQuery].join("?") : url;

    return fetch(generateUrl(formattedUrl), ...atrs).then((response) =>
      response.json()
    );
  },

  getShows(query) {
    return this.get("shows", query).then((data) => data.map(this.mapShowsItem));
  },
  mapShowsItem: ({ name, image, genres, rating, ...extra }) => ({
    name,
    image: (image || {}).medium,
    genres,
    rating: rating.average,
    extra,
  }),

  get showGenres() {
    return Object.entries(this.showFilters.genre).map(([key]) => key);
  },
};

export default api;
