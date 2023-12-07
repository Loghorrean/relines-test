import styles from "./App.module.scss";
import AllUsersBlock from "@/widgets/layout/AllUsersBlock";
import SelectedUsersBlock from "@/widgets/layout/SelectedUsersBlock";

function App() {
  return (
      <main className={styles.app}>
          <AllUsersBlock />
          <SelectedUsersBlock />
      </main>
  )
}

export default App
