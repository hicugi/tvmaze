import api from "./api";
import "regenerator-runtime/runtime";

global.fetch = jest.fn((url) =>
  Promise.resolve({
    json: () => Promise.resolve(url),
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
  const queryStr = `${api.BASE_URL}${url}?number=0&string=hey&special_char=A%2FB`;

  const data = await api.get(url, queryObj);

  expect(data).toBe(queryStr);
});
