import styles from "./App.module.scss";
import AllUsersBlock from "@/widgets/layout/AllUsersBlock";
import SelectedUsersBlock from "@/widgets/layout/SelectedUsersBlock";
import ModalContainer from "@/shared/ui/layout/ModalContainer";
import ActionMessageContainer from "@/shared/action-messages/ui/ActionMessageContainer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
      <>
          <main className={styles.app}>
              <AllUsersBlock />
              <SelectedUsersBlock />
          </main>
          <ModalContainer />
          <ActionMessageContainer />
          {/*<ReactQueryDevtools />*/}
      </>
  )
}

export default App
