const BASE_URL = "https://api.tvmaze.com";

const generateUrl = (v) => [BASE_URL, v].join("");

const api = {
  BASE_URL,

  get(url, query = {}, ...atrs) {
    const formattedQuery = Object.entries(query)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) =>
        [encodeURIComponent(key), encodeURIComponent(value)].join("=")
      )
      .join("&");

    let formattedUrl = formattedQuery ? [url, formattedQuery].join("?") : url;
    formattedUrl = generateUrl(formattedUrl);

    return fetch(formattedUrl, ...atrs)
      .then((response) => {
        const { status } = response;

        if (status === 404) {
          throw new Error(404);
        }

        return response.json();
      })
      .then((data) => ({
        url: formattedUrl,
        data,
      }));
  },

  getShows(query) {
    return this.get("/shows", query).then(({ data, ...attrs }) => ({
      ...attrs,
      data: data.map(this.mapShowsItem),
    }));
  },
  mapShowsItem: ({ id, name, image, genres, rating }) => ({
    id,
    name,
    image: (image || {}).medium,
    genres,
    rating: rating.average,
  }),

  getShowInfo(urlId) {
    return this.get(`/shows/${urlId}`).then(({ data, ...attrs }) => ({
      ...attrs,
      data: this.mapShowInfo(data),
    }));
  },
  mapShowInfo: (data) => {
    const keys = {
      id: "id",
      name: "name",
      description: "summary",
      image: "image",
      language: "language",
      averageRuntime: "averageRuntime",
      genres: "genres",
      website: "officialSite",
    };

    const result = Object.entries(keys).map(([formattedKey, key]) => [
      formattedKey,
      data[key],
    ]);
    return Object.fromEntries(result);
  },

  getSearchedShows(keywords) {
    return this.get("/search/shows", { q: keywords }).then(
      ({ data, ...attrs }) => {
        if (!data.length) {
          throw new Error("No results");
        }

        return { ...attrs, data: data.map((v) => this.mapShowsItem(v.show)) };
      }
    );
  },
};

export default api;
