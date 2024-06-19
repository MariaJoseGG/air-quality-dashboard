import fetchData from "@/utils/fetch-data";
import { useEffect, useState } from "react";

const CityData = ({ state, city }: { state: string; city: string }) => {
  const [errorRequest, setErrorRequest] = useState(false)
  const [isBadRequest, setIsBadRequest] = useState(false)
  const [weather, setWeather] = useState({})
  const [pollution, setPollution] = useState({})

  const getCityData = async () => {
    const cityData = await fetchData({
      uri: `city?city=${city}&state=${state}&country=${import.meta.env.VITE_COUNTRY}&key=${import.meta.env.VITE_API_KEY}`,
      method: 'get'
    })

    if (cityData === 'Bad request' || cityData === 'An unexpected error occurred') {
      setIsBadRequest(true)
    } else if (cityData === 'Too many requests') {
      setErrorRequest(true)
    } else {
      setIsBadRequest(false)
      setErrorRequest(false)
      setWeather(cityData.current.weather)
      setPollution(cityData.current.pollution)
    }
  }

  useEffect(() => {
    if (state !== '' && city !== '') {
      getCityData()
    }
  }, [state, city])

  if (errorRequest) {
    setTimeout(() => {
      setErrorRequest(false)
    }, 60000)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-5">
      {errorRequest ? (
        <p className="text-red-400">Ha ocurrido un error en el servidor. Espere un minuto y después vuelva a intentarlo</p>
      ) : (
        isBadRequest ? (
          <p className="text-red-400 text-center">Ha ocurrido un error con los valores seleccionados. Por favor seleccione otros y vuelva a realizar la consulta</p>
        ) : (
          <>
            <p>CityData</p>
            <p>{state}</p>
            <p>{city}</p>
          </>
        )
      )}
    </div>
  )
}

export default CityData