export const googleApiService = {
  getBooksFromAPI,
}

const API_KEY = 'AIzaSyAMyfxnAK6TiNAtrVywl2f__bx3KF6ZO5E'

function getBooksFromAPI(title) {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${title}:keyes&key=${API_KEY}`
    )
    .then((res) => res.data.items)
}
