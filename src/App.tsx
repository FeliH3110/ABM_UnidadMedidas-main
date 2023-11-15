import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const Header = React.lazy(() => import('./components/Header/Header'));
const Admin = React.lazy(() => import('./pages/admin/Admin'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {
  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      <BrowserRouter>
        <Header />
        <Admin />
        <Footer/>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
