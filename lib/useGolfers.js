import useSWR from 'swr'

export const GOLFER_URL = `${process.env.NEXT_PUBLIC_API_URL}/golfers`

const useGolfers = id => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach an extra info to the error object.
      error.info = await res.json()
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(GOLFER_URL + `/${id}`, fetcher)

  return {
    golfer: data,
    error: error && error.message,
  }
}

export default useGolfers
