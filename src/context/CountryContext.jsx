import { createContext, useContext, useState, useEffect } from "react"
import { getCountriesCode } from "api/countryAPI"

const defaultCountryContext = {
  modeTheme: "",
  onModeChange: null,
  findCountryName: null,
  currentPage: null,
  setCurrentPage: null,
  isLastPage: null,
  setIsLastPage: null,
  onMoreClick: null,
}

const CountryContext = createContext(defaultCountryContext)
export const useCountry = () => useContext(CountryContext)

export const CountryProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const mode = isDarkMode ? "dark" : ""
  const [countriesCodeTable, setCountriesCodeTable] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)

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
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        isLastPage: isLastPage,
        setIsLastPage: setIsLastPage,
        onMoreClick: () => {
          setCurrentPage((prev) => prev + 1)
        },
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}
