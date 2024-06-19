import axios from "axios"
import customAxios from "@/lib/axios"

type FetchProperties = {
  uri: string;
  method: 'get';
}

const fetchData = async ({ uri, method }: FetchProperties) => {
  const url = `/${uri}`
  try {
    const response = await customAxios({
      method,
      url,
    })
    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return 'Bad request'
      } else if (error.response?.status === 429) {
        return 'Too many requests'
      } else {
        return 'An unexpected error occurred'
      }
    } else {
      return 'An unexpected error occurred'
    }
  }
}

export default fetchData