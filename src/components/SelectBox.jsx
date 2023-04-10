import styles from "styles/selectBox.module.css"

export const SelectBox = ({ onRegionChange }) => {
  return (
    <div className={styles.selectBox}>
      <select
        name="region"
        onChange={(e) => {
          onRegionChange?.(e.target.value)
        }}
      >
        <option className={styles.optionStyle} value="">
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  )
}
