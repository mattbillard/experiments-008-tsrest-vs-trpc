import { initClient } from "@ts-rest/core";
import { initQueryClient } from "@ts-rest/react-query";
import { tsRestApi } from "../../../api/src/ts-rest/ts-rest.contract";

export const tsRestClient = initClient(tsRestApi, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {
    "x-api-key": "key",
  },
});

export const tsRestQueryClient = initQueryClient(tsRestApi, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {
    "x-api-key": "key",
  },
});
