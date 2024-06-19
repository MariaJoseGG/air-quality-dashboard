import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import fetchData from "@/utils/fetch-data"
import { State, City } from "@/types/fetch-types"
import CityData from "@/components/city-data/CityData"
import Loading from "../loading"

const formSchema = z.object({
  state: z.string({ required_error: "Por favor seleccione un departamento" }),
  city: z.string({ required_error: "Por favor seleccione una ciudad" }),
})

const CityForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const [statesError, setStatesError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [states, setStates] = useState([] as string[])
  const [firstRender, setFirstRender] = useState(true)
  const [currentState, setCurrentState] = useState('' as string)
  const [citiesError, setCitiesError] = useState(false)
  const [cities, setCities] = useState([] as string[])
  const [stateName, setStateName] = useState('' as string)
  const [cityName, setCityName] = useState('' as string)
  const [showCityData, setShowCityData] = useState(false)

  const getStates = async () => {
    const statesNames = await fetchData({
      uri: `states?country=${import.meta.env.VITE_COUNTRY}&key=${import.meta.env.VITE_API_KEY}`,
      method: 'get'
    })

    if (statesNames === 'Bad request' || statesNames === 'An unexpected error occurred') {
      setStatesError(true)
    } else if (statesNames === 'Too many requests') {
      setDisable(true)
    } else {
      setStatesError(false)
      setStates(statesNames.map((state: State) => state.state))
    }
  }

  const getCities = async () => {
    const citiesNames = await fetchData({
      uri: `cities?state=${currentState}&country=${import.meta.env.VITE_COUNTRY}&key=${import.meta.env.VITE_API_KEY}`,
      method: 'get'
    })

    if (citiesNames === 'Bad request') {
      setCitiesError(true)
    } else if (citiesNames === 'Too many requests') {
      setDisable(true)
    } else if (citiesNames === 'An unexpected error occurred') {
    } else {
      setCitiesError(false)
      setCities(citiesNames.map((city: City) => city.city))
    }
  }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      getStates()
    }

    if (currentState !== '') {
      getCities()
    }
  }, [currentState])

  if (disable) {
    setTimeout(() => {
      setDisable(false)
    }, 60000)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { state, city } = values
    setStateName(state)
    setCityName(city)
    setShowCityData(true)
  }

  return (
    <>
      <p>Para empezar, por favor seleccione el departamento y la ciudad que desee consultar.</p>
      <div className="flex justify-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-3/4 flex flex-col items-center gap-5">
            {disable && (
              <div className="flex flex-col items-center">
                <p className="text-red-400">Ha ocurrido un error en el servidor. Por favor espere un minuto y después vuelva a intentarlo</p>
                <Loading />
              </div>
            )}

            {statesError ? (<p className="text-red-400">Ha ocurrido un error al cargar los departamentos</p>) : (
              <>
                <div className="flex gap-10">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <Select onValueChange={(value) => {
                          setCurrentState(value)
                          field.onChange(value)
                          form.resetField('city')
                        }} defaultValue={field.value} disabled={disable} >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un departamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state: string, index: number) => {
                              return <SelectItem key={index} value={state}>{state}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {citiesError ? (
                    <p className="text-red-400 text-center">El departamento no cuenta con datos disponibles, por favor seleccione otro departamento</p>
                  ) : (
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciudad</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disable} >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione una ciudad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city: string, index: number) => {
                                return <SelectItem key={index} value={city}>{city}</SelectItem>
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <Button type="submit" className="bg-dodger-blue-600 hover:bg-dodger-blue-700">Consultar</Button>
              </>
            )}
          </form>
        </Form>
      </div>
      <div className="w-full border border-dodger-blue-500"></div>
      {showCityData && <CityData state={stateName} city={cityName} />}
    </>
  )
}

export default CityForm