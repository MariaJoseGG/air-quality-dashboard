type UnitDictionary = {
  [key: string]: string
}

export const units: UnitDictionary = {
  "p2": "µg/m3",
  "p1": "µg/m3",
  "o3": "ppb",
  "n2": "ppb",
  "s2": "ppb",
  "co": "ppm"
}

type UnitNameDictionary = {
  [key: string]: string
}

export const unitsName: UnitNameDictionary = {
  "p2": "PM2.5",
  "p1": "PM10",
  "o3": "O3",
  "n2": "NO2",
  "s2": "SO2",
  "co": "CO"
}