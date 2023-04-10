import { Header } from "components/Header"
import { Main } from "components/Main"
import { Button } from "components/Button"
import { ReactComponent as Back } from "icons/arrow-left.svg"
import styles from "styles/countryPage.module.css"
import { useParams } from "react-router-dom"
import { getACountry } from "api/countryAPI"
import { useState, useEffect } from "react"
import { useCountry } from "context/CountryContext"

const Flag = ({ flagUrl, flagAlt }) => {
  return (
    <div className={styles.flagBox}>
      <img src={flagUrl} alt={flagAlt} />
    </div>
  )
}

const List = ({ title, detail }) => {
  return (
    <li>
      <span className={styles.boldTitle}>{title} </span>
      {detail}
    </li>
  )
}

export default function CountryPage() {
  const countryName = useParams().countryName
  const [getCountry, setGetCountry] = useState()
  const [borderCountries, setBorderCountries] = useState([])
  let nativeName
  const { findCountryName } = useCountry()

  useEffect(() => {
    const getACountryAsync = async () => {
      try {
        const country = await getACountry(countryName)
        setGetCountry(country[0])

        if (country[0].borders) {
          let borderCountriesList = []
          country[0].borders.forEach((cca3) => {
            let getFullName = findCountryName(cca3)
            borderCountriesList.push(getFullName[0].name.common)
          })
          setBorderCountries([...borderCountriesList])
        }
      } catch (error) {
        console.error(error)
      }
    }
    getACountryAsync()
  }, [countryName, findCountryName])

  if (!getCountry) {
    return
  } else if (!getCountry.name.nativeName) {
    nativeName = getCountry.name.official
  } else {
    const nativeNameObject = getCountry.name.nativeName
    const nativeNameObjectKeys = Object.keys(nativeNameObject)
    const nativeNameKey = nativeNameObjectKeys[0]
    nativeName = nativeNameObject[nativeNameKey].official
  }

  return (
    <>
      <Header />
      <Main>
        <Button link={-1} img={<Back />} text="Back" />
        {!getCountry ? (
          <p>loading</p>
        ) : (
          <div className={styles.countryContainer}>
            <Flag flagUrl={getCountry.flags.png} />
            <div className={styles.introBox}>
              <h2 className={styles.countryTitle}>{getCountry.name.common}</h2>
              <div className={styles.infoBox}>
                <div className={styles.leftSide}>
                  <ul>
                    <List title="Native Name:" detail={nativeName} />
                    <List
                      title="Population:"
                      detail={getCountry.population.toLocaleString()}
                    />
                    <List title="Region:" detail={getCountry.region} />
                    <List title="Sub Region:" detail={getCountry.subregion} />
                    <List
                      title="Capital:"
                      detail={
                        getCountry.capital ? getCountry.capital[0] : "no info"
                      }
                    />
                  </ul>
                </div>
                <div className={styles.rightSide}>
                  <ul>
                    <List
                      title="Top Level Domain:"
                      detail={
                        getCountry.tld ? getCountry.tld[0] : <i>no info</i>
                      }
                    />
                    <List
                      title="Currencies:"
                      detail={
                        getCountry.currencies ? (
                          Object.keys(getCountry.currencies).join(", ")
                        ) : (
                          <i>no info</i>
                        )
                      }
                    />
                    <List
                      title="Languages:"
                      detail={
                        getCountry.languages ? (
                          Object.values(getCountry.languages).join(", ")
                        ) : (
                          <i>no info</i>
                        )
                      }
                    />
                  </ul>
                </div>
              </div>
              <div className={styles.borderCountries}>
                <p className={styles.boldTitle}>Border Countries: </p>
                {borderCountries.length !== 0 ? (
                  borderCountries.map((b) => (
                    <Button key={b} link={`/${b}`} text={b} />
                  ))
                ) : (
                  <i>none</i>
                )}
              </div>
            </div>
          </div>
        )}
      </Main>
    </>
  )
}
