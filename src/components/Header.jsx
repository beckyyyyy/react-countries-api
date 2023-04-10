import styles from "styles/header.module.css"
import { Link } from "react-router-dom"
import { useCountry } from "context/CountryContext"

export const Header = () => {
  const { onModeChange } = useCountry()
  return (
    <header>
      <nav>
        <Link to="/">
          <h1 className={styles.navTitle}>Where in the world?</h1>
        </Link>
        <div className={styles.modeControl} onClick={onModeChange}>
          <img className={styles.modeIcon} alt="night-mode-icon" />
          <p>Dark Mode</p>
        </div>
      </nav>
    </header>
  )
}
