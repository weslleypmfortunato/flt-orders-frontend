import './App.css';
import './styles/build.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import CreateNewOrdersPage from './pages/CreateNewOrdersPage';
import CreateNewShortagesPage from './pages/CreateNewShortagesPage';
import OrderEditPage from './pages/OrderEditPage';
import ShortageEditPage from './pages/ShortageEditPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LoginPage />}></Route>
        <Route path='/home' element={ <HomePage /> }></Route>
        <Route path='/orders/new' element={ <CreateNewOrdersPage /> }></Route>
        <Route path='/shortages/new' element={ <CreateNewShortagesPage /> }></Route>
        <Route path='/order/edit/:orderId' element={ <OrderEditPage /> }></Route>
        <Route path='/shortage/edit/:shortageId' element={ <ShortageEditPage /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
