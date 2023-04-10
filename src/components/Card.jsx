import styles from "styles/card.module.css"

export const Card = ({
  onClick,
  img,
  country,
  population,
  region,
  capital,
}) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.imageBox}>
        <img src={img} alt="country's flag" />
      </div>
      <div className={styles.textBox}>
        <h4>{country}</h4>
        <p>
          <span className={styles.boldText}>Population: </span>
          {population}
        </p>
        <p>
          <span className={styles.boldText}>Region: </span>
          {region}
        </p>
        <p>
          <span className={styles.boldText}>Capital: </span>
          {capital}
        </p>
      </div>
    </div>
  )
}
