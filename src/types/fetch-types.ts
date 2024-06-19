export type State = {
  state: string
}

export type City = {
  city: string
}

export type Weather = {
  ts: string
  tp: number
  pr: number
  hu: number
  ws: number
  wd: number
  ic: string
}

export type Pollution = {
  ts: string
  aqius: number
  mainus: string
  aqicn: number
  maincn: string
}