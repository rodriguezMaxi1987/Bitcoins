import axios from "axios";


export default async function apicall(url, method, data = null, headers = {}) {
  const response = await axios({
    method,
    url,
    data,
    headers,
  });
  return response.data;
}
