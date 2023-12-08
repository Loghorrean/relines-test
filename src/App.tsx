import styles from "./App.module.scss";
import AllUsersBlock from "@/widgets/layout/AllUsersBlock";
import SelectedUsersBlock from "@/widgets/layout/SelectedUsersBlock";
import ModalContainer from "@/shared/ui/layout/ModalContainer";
import ActionMessageContainer from "@/shared/action-messages/ui/ActionMessageContainer";

function App() {
  return (
      <>
          <main className={styles.app}>
              <AllUsersBlock />
              <SelectedUsersBlock />
          </main>
          <ModalContainer />
          <ActionMessageContainer />
      </>
  )
}

export default App
