import styles from "styles/button.module.css"
import { useNavigate } from "react-router-dom"

export const Button = ({ link, img, text }) => {
  const navigate = useNavigate()
  return (
    <button
      className={styles.btnStyle}
      onClick={() => {
        navigate(link)
      }}
    >
      {img}
      {text}
    </button>
  )
}
