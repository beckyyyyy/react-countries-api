import { Card } from "components/Card"
import { getAllCountries, getRegionCountries } from "api/countryAPI"
import styles from "styles/cardList.module.css"
import { useState, useEffect } from "react"

export const CardList = ({ inputValue, selectedRegion, onCardClick }) => {
  const [displayCountries, setDisplayCountries] = useState([])
  const searchValue = inputValue.toUpperCase()
  const COUNTRIES_PER_PAGE = 24

  // 依字母排序
  const sortOrder = (orders) => {
    orders.sort((a, b) => {
      return a.name.common > b.name.common ? 1 : -1
    })
    return orders
  }
  // 搜尋國家
  const searchCountries = (countries) => {
    if (searchValue.trim().length === 0) {
      setDisplayCountries(countries.map((country) => ({ ...country })))
    } else {
      const countriesFilter = countries.filter((country) => {
        return country.name.common.toUpperCase().includes(searchValue)
      })
      setDisplayCountries(countriesFilter.map((country) => ({ ...country })))
    }
  }

  useEffect(() => {
    const getAllCountriesAsync = async () => {
      try {
        // 取得所有國家or取得某region國家
        if (!selectedRegion) {
          let allCountries = await getAllCountries()
          allCountries = sortOrder(allCountries)
          searchCountries(allCountries)
        } else {
          let regionCountries = await getRegionCountries(selectedRegion)
          regionCountries = sortOrder(regionCountries)
          searchCountries(regionCountries)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAllCountriesAsync()
  }, [inputValue, selectedRegion])

  return (
    <div className={styles.cardsContainer}>
      {displayCountries.map((c) => {
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
