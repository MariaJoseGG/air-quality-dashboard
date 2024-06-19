import { Pollution, Weather } from "@/types/fetch-types";
import fetchData from "@/utils/fetch-data";
import { useEffect, useState } from "react";
import Loading from "../loading";

const CityData = ({ state, city }: { state: string; city: string }) => {
  const [errorRequest, setErrorRequest] = useState(false)
  const [isBadRequest, setIsBadRequest] = useState(false)
  const [weather, setWeather] = useState<Weather | undefined>(undefined)
  const [pollution, setPollution] = useState<Pollution | undefined>(undefined)
  const [dateWeather, setDateWeather] = useState<string>('')
  const [datePollution, setDatePollution] = useState<string>('')

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
      const date = new Date(cityData.current.weather.ts)
      setDateWeather(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:0${date.getMinutes()}`)

      setPollution(cityData.current.pollution)
      const datePollution = new Date(cityData.current.pollution.ts)
      setDatePollution(`${datePollution.getDate()}/${datePollution.getMonth() + 1}/${datePollution.getFullYear()} ${datePollution.getHours()}:0${datePollution.getMinutes()}`)
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
    <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-5 w-full">
      {errorRequest ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-400">Ha ocurrido un error en el servidor. Espere un minuto y después vuelva a intentarlo</p>
          <Loading />
        </div>
      ) : (
        isBadRequest ? (
          <p className="text-red-400 text-center">Ha ocurrido un error con los valores seleccionados. Por favor seleccione otros y vuelva a realizar la consulta</p>
        ) : (
          <>
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl font-bold text-dodger-blue-800">Clima en {city}</h2>
              {weather && (
                <>
                  <img src={`https://www.airvisual.com/images/${weather.ic}.png`} alt='ícono del clima actual' className="w-16" />
                  <div className="grid grid-cols-2 gap-5">
                    <p className="font-semibold">Temperatura</p>
                    <p>{weather.tp}°C</p>
                    <p className="font-semibold">Presión atmosférica</p>
                    <p>{weather.pr} hPa</p>
                    <p className="font-semibold">Humedad</p>
                    <p>{weather.hu}%</p>
                  </div>
                  <p className="text-gray-600 pt-4">{dateWeather}</p>
                </>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-dodger-blue-800">Calidad del aire en {city}</h2>
            </div>
          </>
        )
      )}
    </div>
  )
}

export default CityData