import styles from "styles/footer.module.css"
import { ReactComponent as More } from "icons/more.svg"
import { useCountry } from "context/CountryContext"

export const Footer = () => {
  const { onMoreClick, isLastPage } = useCountry()
  return (
    <footer>
      <div className={styles.moreContainer}>
        {isLastPage ? (
          ""
        ) : (
          <>
            {" "}
            <h3 onClick={onMoreClick}>more</h3>
            <More />
          </>
        )}
      </div>
    </footer>
  )
}
