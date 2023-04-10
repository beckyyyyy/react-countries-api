import { Header } from "components/Header"
import { Main } from "components/Main"
import { InputBox } from "components/InputBox"
import { SelectBox } from "components/SelectBox"
import { CardList } from "components/CardList"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from "styles/countriesPage.module.css"

export default function CountriesPage() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  // search bar功能
  const handleChange = (value) => {
    setInputValue(value)
  }
  // filter by region功能
  const handleRegionChange = (region) => {
    setSelectedRegion(region)
  }
  // 點擊卡片進入該國家詳細頁面
  const handleCardClick = (countryName) => {
    navigate(`/${countryName}`)
  }

  return (
    <>
      <Header />
      <Main>
        <div className={styles.searchContainer}>
          <InputBox inputValue={inputValue} onChange={handleChange} />
          <SelectBox onRegionChange={handleRegionChange} />
        </div>
        <CardList
          inputValue={inputValue}
          selectedRegion={selectedRegion}
          onCardClick={handleCardClick}
        />
      </Main>
    </>
  )
}
