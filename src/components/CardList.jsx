import { Card } from "components/Card"
import { getAllCountries, getRegionCountries } from "api/countryAPI"
import styles from "styles/cardList.module.css"
import { useState, useEffect, useRef } from "react"
import { useCountry } from "context/CountryContext"

export const CardList = ({ inputValue, selectedRegion, onCardClick }) => {
  const displayCountriesRef = useRef([])
  const { currentPage, setCurrentPage, setIsLastPage } = useCountry()
  const [resetPage, setResetPage] = useState(false)
  const COUNTRIES_PER_PAGE = 24
  const [countriesByPage, setCountriesByPage] = useState([])
  const searchValue = inputValue.toUpperCase()

  // 依字母排序
  const sortOrder = (orders) => {
    orders.sort((a, b) => {
      return a.name.common > b.name.common ? 1 : -1
    })
    return orders
  }

  // 搜尋功能
  const searchCountries = (countries) => {
    if (searchValue.trim().length === 0) {
      displayCountriesRef.current = countries.map((country) => ({ ...country }))
    } else {
      const countriesFilter = countries.filter((country) => {
        return country.name.common.toUpperCase().includes(searchValue)
      })
      displayCountriesRef.current = countriesFilter.map((country) => ({
        ...country,
      }))
    }
  }

  // 製作分頁
  const displayCountriesByPage = () => {
    const countriesSlice = displayCountriesRef.current.slice(
      0,
      COUNTRIES_PER_PAGE * currentPage
    )
    setCountriesByPage(countriesSlice.map((country) => ({ ...country })))
  }

  useEffect(() => {
    const getAllCountriesAsync = async () => {
      try {
        if (resetPage) {
          setCurrentPage(1)
          setResetPage(false)
        }
        // 取得所有國家or取得某region國家
        let getCountries
        if (!selectedRegion) {
          const allCountries = await getAllCountries()
          getCountries = sortOrder(allCountries)
        } else {
          const regionCountries = await getRegionCountries(selectedRegion)
          getCountries = sortOrder(regionCountries)
        }
        searchCountries(getCountries)
        // 判斷是否已顯示所有資料
        if (
          Math.ceil(displayCountriesRef.current.length / COUNTRIES_PER_PAGE) ===
          currentPage
        ) {
          setIsLastPage(true)
        }
        displayCountriesByPage()
      } catch (error) {
        console.error(error)
      }
    }
    getAllCountriesAsync()
  }, [currentPage, resetPage])

  useEffect(() => {
    setResetPage(true)
    setIsLastPage(false)
  }, [searchValue, selectedRegion, setIsLastPage])

  return (
    <div className={styles.cardsContainer}>
      {countriesByPage.map((c) => {
        return (
          <Card
            key={c.name.common}
            img={c.flags.png}
            country={c.name.common}
            population={c.population}
            region={c.region}
            capital={c.capital}
            onClick={() => onCardClick?.(c.name.common)}
          />
        )
      })}
    </div>
  )
}
