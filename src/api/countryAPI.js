import axios from "axios"

const baseUrl = " https://restcountries.com/v3.1"

// 取得所有國家清單 fields=name,capital,region,flags,population
export const getAllCountries = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/all?fields=name,capital,region,flags,population`
    )
    return res.data
  } catch (error) {
    console.error("get 所有國家清單", error)
  }
}

// 依region取得國家清單
export const getRegionCountries = async (region) => {
  try {
    const res = await axios.get(
      `${baseUrl}/region/${region}?fields=name,capital,region,flags,population`
    )
    return res.data
  } catch (error) {
    console.error("get 地區國家清單", error)
  }
}

// 取得指定國家資訊
export const getACountry = async (name) => {
  try {
    const res = await axios.get(`${baseUrl}/name/${name}`)
    return res.data
  } catch (error) {
    console.error("get 某國家資訊", error)
  }
}

// 取得所有國家名稱及其簡稱
export const getCountriesCode = async () => {
  try {
    const res = await axios.get(`${baseUrl}/all?fields=name,cca3`)
    return res.data
  } catch (error) {
    console.error("get 國家簡稱對照表", error)
  }
}
