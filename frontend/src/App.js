import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import VehicleListScreen from './screens/VehicleListScreen'
import VehicleEditScreen from './screens/VehicleEditScreen'



function App() {
  return (
    <Router>
      <Header />
      <main className="py-3 d-flex flex-column min-vh-100">
        <Container>
          <Routes>
            <Route path='/' element={<VehicleListScreen/>} exact />
            <Route path='/vehiclelist' element={<VehicleListScreen/>} />
            <Route path='/vehicle/:id/edit' element={<VehicleEditScreen/>} />
            <Route path='/vehicle/edit' element={<VehicleEditScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
