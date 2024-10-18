import queryString from "query-string";

export type ParameterProps = {
  [k: string]: string | boolean | number;
};

class FetchRequest {
  // get
  async get<T>(
    url: string,
    data: ParameterProps = {},
    headers?: HeadersInit
  ): Promise<T | null> {
    if (!url) return null;
    return (
      await fetch(url + "?" + queryString.stringify(data), {
        headers,
        cache: "no-store",
      })
    ).json();
  }

  // post: formdata
  async post(
    url: string,
    data: ParameterProps = {},
    headers?: HeadersInit
  ): Promise<Response | null> {
    if (!url) return null;
    return (
      await fetch(url + "?" + queryString.stringify(data), { headers })
    ).json();
  }

  // post: json
  async postJson(
    url: string,
    data: ParameterProps = {},
    headers: HeadersInit
  ): Promise<Response | null> {
    if (!url) return null;
    return (
      await fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      })
    ).json();
  }
}

const request = new FetchRequest();

export default request;
