import styles from "styles/main.module.css"

export const Main = ({ children }) => {
  return (
    <main>
      <div className={styles.fixedWidth}>{children}</div>
    </main>
  )
}
