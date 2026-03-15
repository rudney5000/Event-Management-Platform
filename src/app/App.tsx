import { Outlet } from "react-router"
import { Header } from "../shared/ui/header"

function App() {

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
