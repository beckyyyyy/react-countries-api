import { createContext, useContext, useState, useEffect } from "react"
import { getCountriesCode } from "api/countryAPI"

const defaultCountryContext = {
  modeTheme: "",
  onModeChange: null,
  findCountryName: null,
}

const CountryContext = createContext(defaultCountryContext)
export const useCountry = () => useContext(CountryContext)

export const CountryProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const mode = isDarkMode ? "dark" : ""
  const [countriesCodeTable, setCountriesCodeTable] = useState([])

  // 抓取所有國家名稱及簡稱，為了提供Border Countries 使用。
  useEffect(() => {
    const getCountriesCodeAsync = async () => {
      try {
        const countriesCode = await getCountriesCode()
        setCountriesCodeTable(countriesCode.map((country) => ({ ...country })))
      } catch (error) {
        console.error(error)
      }
    }
    getCountriesCodeAsync()
  }, [])

  return (
    <CountryContext.Provider
      value={{
        modeTheme: mode,
        onModeChange: () => {
          setIsDarkMode(!isDarkMode)
        },
        findCountryName: (code) => {
          const fullName = countriesCodeTable.filter(
            (country) => country.cca3 === code
          )
          return fullName
        },
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}
