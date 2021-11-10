import api from "./api";
import "regenerator-runtime/runtime";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: (data) => Promise.resolve(data),
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
