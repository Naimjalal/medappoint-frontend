import Nav from './components/Nav'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" />
          <Route path="/signin" />
          <Route path="/register" />
        </Routes>
      </main>
    </div>
  )
}

export default App
