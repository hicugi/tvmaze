const BASE_URL = "https://api.tvmaze.com";

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

    return fetch(generateUrl(formattedUrl), ...atrs).then((response) => {
      const { status } = response;

      if (status === 404) {
        throw new Error(404);
      }

      return response.json();
    });
  },

  getShows(query) {
    return this.get("/shows", query).then((data) =>
      data.map(this.mapShowsItem)
    );
  },
  mapShowsItem: ({ id, name, image, genres, rating }) => ({
    id,
    name,
    image: (image || {}).medium,
    genres,
    rating: rating.average,
  }),

  getShowInfo(urlId) {
    return this.get(`/shows/${urlId}`).then(
      ({
        id,
        name,
        summary,
        image,
        averageRuntime,
        genres,
        officialSite,
        language,
      }) => ({
        id,
        name,
        description: summary,
        image,
        language,
        averageRuntime,
        genres,
        website: officialSite,
      })
    );
  },

  getSearchedShows(keywords) {
    return this.get("/search/shows", { q: keywords }).then((data) => {
      if (!data.length) {
        throw new Error("No results");
      }

      return data.map((v) => this.mapShowsItem(v.show));
    });
  },
};

export default api;
