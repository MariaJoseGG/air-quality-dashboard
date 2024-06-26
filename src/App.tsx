import CityForm from "@/components/city-form/CityForm"
import Header from "./components/Header"

function App() {
  return (
    <div className="bg-dodger-blue-50 h-screen">
      <Header />
      <div className="flex flex-col gap-5 p-6">
        <h1 className="text-center text-2xl text-dodger-blue-950 font-bold">Calidad del Aire en {import.meta.env.VITE_COUNTRY}</h1>
        <p>A continuación, podrá consultar el clima y los datos de calidad del aire actuales en {import.meta.env.VITE_COUNTRY}.</p>
        <CityForm />
      </div>
    </div>
  )
}

export default App