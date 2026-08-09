import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Panel from './components/Panel'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <Navbar />
      <Panel counter={counter} setCounter={setCounter} />
      <Footer />
    </>
  )
}

export default App
