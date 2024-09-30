import { photos_api_key } from '../constant'

export const fetchPexelsImages = async (category, page) => {
  const url = `https://api.pexels.com/v1/search?query=${category}&per_page=10&page=${page}`
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: photos_api_key,
      },
    })

    const data = await response.json()
    const images = data.photos

    return data
  } catch (error) {
    console.error('Error fetching images:', error)
  }
}
