import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import CreateNewOrdersPage from './pages/CreateNewOrdersPage';
import CreateNewShortagesPage from './pages/CreateNewShortagesPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LoginPage />}></Route>
        <Route path='/home' element={ <HomePage /> }></Route>
        <Route path='/orders/new' element={ <CreateNewOrdersPage /> }></Route>
        <Route path='/shortages/new' element={ <CreateNewShortagesPage /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
