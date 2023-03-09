import {Route, Routes} from 'react-router-dom'
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { LocalBookshelf } from './pages/LocalBookshelfPage';
import { LoginPage } from './pages/LoginPage';
import { PublicBookshelf } from './pages/PublicBookshelfPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    
    <Routes>
      <Route path='/' element={ <HomePage/> } />        
      <Route path='/about/:id' element={ <AboutPage /> } />
      <Route path='/localbookshelf' element={ <LocalBookshelf /> } />
      <Route path='/publicbookshelf' element={ <PublicBookshelf /> } />    
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/register' element={ <RegisterPage /> } />
    </Routes>      
    
  );
}

export default App;
