import api from "./api";
import "regenerator-runtime/runtime";

const showItem = {
  default: {
    id: 1,
    name: "Under the Dome",
    genres: ["Drama", "Science-Fiction", "Thriller"],
    rating: {
      average: 6.5,
    },
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      original:
        "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg",
    },
  },
  withoutImage: {
    id: 2,
    name: "Person of Interest",
    genres: ["Action", "Crime", "Science-Fiction"],
    rating: {
      average: 8.9,
    },
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test("api.get generates correct url from object data", async () => {
  const url = "/test";

  const queryObj = {
    number: 0,
    string: "hey",
    special_char: "A/B",
    obj_null: null,
    obj_undefined: undefined,
  };
  const generatedUrl = [
    api.BASE_URL,
    url,
    "?number=0&string=hey&special_char=A%2FB",
  ].join("");

  const query = api.get(url, queryObj);
  console.log("query: ", query.url);

  const response = await query;

  expect(response.url).toBe(generatedUrl);
});

test("api.getShows generates correct url", async () => {
  const url = "/shows";
  const generatedUrl = [api.BASE_URL, url].join("");

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  const response = await api.getShows();

  expect(response.url).toBe(generatedUrl);
});

test("api.getShowInfo generates correct url with show id", async () => {
  const url = "/shows/";
  const showId = 1;
  const generatedUrl = [api.BASE_URL, url, showId].join("");

  const response = await api.getShowInfo(showId);

  expect(response.url).toBe(generatedUrl);
});

describe("api.getSearchedShows", () => {
  const url = "/search/shows";
  const keywords = "comedy";
  const generatedUrl = [api.BASE_URL, url, "?q=", keywords].join("");

  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { show: showItem.default },
          { show: showItem.withoutImage },
        ]),
    })
  );

  test("generates correct url with search queries", async () => {
    global.fetch = fetchMock;
    const response = await api.getSearchedShows(keywords);

    expect(response.url).toBe(generatedUrl);
  });
  test("response data has correct structure", async () => {
    global.fetch = fetchMock;
    const response = await api.getSearchedShows(keywords);

    const formatItem = (v) => ({
      id: v.id,
      name: v.name,
      image: v.image?.medium,
      genres: v.genres,
      rating: v.rating.average,
    });

    expect(JSON.stringify(response.data)).toBe(
      JSON.stringify([
        formatItem(showItem.default),
        formatItem(showItem.withoutImage),
      ])
    );
  });
});
