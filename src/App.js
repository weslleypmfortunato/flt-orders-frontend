import './App.css';
import './styles/build.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import CreateNewOrdersPage from './pages/CreateNewOrdersPage';
import CreateNewShortagesPage from './pages/CreateNewShortagesPage';
import OrderEditPage from './pages/OrderEditPage';
import ShortageEditPage from './pages/ShortageEditPage';
import CreateNewUserPage from './pages/CreateNewUser';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';

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
        <Route path='/auth/sign-up/user' element={ <CreateNewUserPage /> }></Route>
        <Route path='/users' element={ <UserListPage /> }></Route>
        <Route path='/user/edit/:userId' element={ <UserEditPage /> }></Route>
      </Routes>
      
    </div>
  );
}

export default App;


// adicionar um campo de Due para shortage material **
// Em add new user precisa que o Level e Department sejam um select que mostre as opções pre definidas
// EM add new user precisa que o Starting Date e o DOB abram um callendar
// Em ordens, adicionar um status com um select **