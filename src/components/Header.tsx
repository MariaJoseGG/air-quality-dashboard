import Wind from '@/assets/wind.png'

const Header = () => {
  return (
    <header className="bg-dodger-blue-300 text-dodger-blue-950 p-4 flex items-center gap-2">
      <img src={Wind} alt="Imagen de una nube" className='w-9' />
      <h1 className="text-base font-bold">Calidad del Aire en {import.meta.env.VITE_COUNTRY}</h1>
    </header>
  )
}

export default Header