 import {Route, Routes} from 'react-router-dom'
import { useAuth } from './hooks/use-auth';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { LocalBookshelf } from './pages/LocalBookshelfPage';
import { LoginPage } from './pages/LoginPage';
import { PublicBookshelf } from './pages/PublicBookshelfPage';

function App() {
  const {isAuth} = useAuth()

  if (isAuth) {
    return(
      <Routes>
        <Route path='/' element={ <HomePage/> } />        
        <Route path='/about/:id' element={ <AboutPage /> } />
        <Route path='/localbookshelf' element={ <LocalBookshelf /> } />
        {/* <Route path='/publicbookshelf' element={ <PublicBookshelf /> } />  */}
      </Routes>
    )
  }
  return (    
    <LoginPage />    
  )
}

export default App;
