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
import IsLogged from './components/IsLogged';
import CreateNewNote from './pages/CreatenewNotePage';
import NoteEditPage from './pages/NoteEditPage';
import CompletedWorkOrdersPage from './pages/CompletedWorkOrders';
import CreateNewNcrPage from './pages/CreateNcrPage';
import NcrListPage from './pages/NcrListPage';
import PrintNcrPage from './pages/PrintNcrPage';
import NcrEditPage from './pages/NcrEditPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LoginPage />}></Route>
        <Route path='/home' element={ <IsLogged><NcrListPage /></IsLogged> }></Route>
        <Route path='/dashboard' element={ <IsLogged><HomePage /></IsLogged> }></Route>
        <Route path='/orders/new' element={ <IsLogged roles={["admin", "organizer"]}><CreateNewOrdersPage /></IsLogged> }></Route>
        <Route path='/completed-orders' element={ <IsLogged roles={["admin", "organizer", "user"]}> <CompletedWorkOrdersPage /> </IsLogged> }></Route>
        <Route path='/shortages/new' element={ <IsLogged roles={["admin", "organizer"]}><CreateNewShortagesPage /></IsLogged> }></Route>
        <Route path='/order/edit/:orderId' element={ <IsLogged><OrderEditPage /></IsLogged> }></Route>
        <Route path='/shortage/edit/:shortageId' element={ <IsLogged roles={["admin", "organizer"]}><ShortageEditPage /></IsLogged> }></Route>
        <Route path='/auth/sign-up/user' element={ <IsLogged roles={["admin"]}><CreateNewUserPage /></IsLogged> }></Route>
        <Route path='/users' element={ <IsLogged><UserListPage /></IsLogged> }></Route>
        <Route path='/user/edit/:userId' element={ <IsLogged roles={["admin"]}><UserEditPage /></IsLogged> }></Route>
        <Route path='/notice/new' element={ <IsLogged roles={["admin"]}><CreateNewNote /></IsLogged> }></Route>
        <Route path='/notice/edit/:noteId' element={ <IsLogged roles={["admin"]}> <NoteEditPage /></IsLogged> }></Route>
        <Route path='ncr/new' element={ <IsLogged><CreateNewNcrPage /> </IsLogged>}> </Route>
        <Route path='/ncr' element={ <IsLogged><NcrListPage /></IsLogged> }></Route>
        <Route path='/ncr/:ncrId' element={ <IsLogged><PrintNcrPage /></IsLogged> }></Route>
        <Route path='/ncr/edit/:ncrId' element={ <IsLogged><NcrEditPage></NcrEditPage> </IsLogged> }></Route>
      </Routes>
    </div>
  );
}

export default App;