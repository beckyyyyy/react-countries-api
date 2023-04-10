import styles from "styles/inputBox.module.css"
import { ReactComponent as Search } from "icons/search.svg"

export const InputBox = ({ inputValue, onChange }) => {
  return (
    <div className={styles.inputBox}>
      <Search />
      <input
        className={styles.inputStyle}
        type="text"
        placeholder="Search for a country..."
        value={inputValue}
        onChange={(e) => {
          onChange?.(e.target.value)
        }}
      />
    </div>
  )
}
