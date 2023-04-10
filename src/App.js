import styles from "styles/app.module.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CountriesPage from "pages/CountriesPage"
import CountryPage from "pages/CountryPage"
import { useCountry } from "context/CountryContext"

function App() {
  const { modeTheme } = useCountry()
  return (
    <div className={styles.app} data-theme={modeTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountriesPage />}></Route>
          <Route path="/:countryName" element={<CountryPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
