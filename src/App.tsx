import {Route, Routes} from 'react-router-dom'
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { LocalBookshelf } from './pages/LocalBookshelfPage';
import { PublicBookshelf } from './pages/PublicBookshelfPage';

function App() {
  return (
    
    <Routes>
      <Route path='/' element={ <HomePage/> } />        
      <Route path='/about/:id' element={ <AboutPage /> } />
      <Route path='/localbookshelf' element={ <LocalBookshelf /> } />
      <Route path='/publicbookshelf' element={ <PublicBookshelf /> } />    

    </Routes>      
    
  );
}

export default App;
