import './HeaderStyle.css'

const Header = () => {
    return (
   <div className="section-wrapper"> 
  <header className="header">
    <div className="logo"><img src="/src/assets/el-buen-sabor.png"></img></div>
    <nav className="navbar">
     <a href="index.html">INICIO</a>
     <a href="#menu">MENU</a>
     <a href="#quienesSomos">QUIENES SOMOS</a>
     <a href="#contacto">CONTACTO</a>
    </nav>
    <div>
      <div className="dropdown">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="32" height="32" viewBox="0 0 24 24" stroke-width="1" stroke="#ffedbf" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">ADMIN</button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Mis datos personales</a></li>
          <li><a className="dropdown-item" href="ordersHistory.html">Mis pedidos</a></li>
          <li><a className="dropdown-item" href="#">Salir</a></li>
        </ul>
      </div>
    </div>
  </header>
  </div>
  
    
    )        
}
export default Header;