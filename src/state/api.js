import Urbit from "@urbit/http-api";
import { getAuth } from "../lib/auth";

const auth = getAuth();

export const api = new Urbit(
  auth?.url || process.env.REACT_APP_URL,
  auth?.code || process.env.REACT_APP_CODE,
  'garden'
);

api.onError = e => {
  console.error(e);
}

window.url = auth?.url || process.env.REACT_APP_URL;

window.api = api;
