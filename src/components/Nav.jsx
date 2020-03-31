import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import AddCharacter from '../components/Modal/AddCharacter';
import axios from 'axios'
import { auth } from '../helpers/urlFor'
import Framehameha from '../assets/framehameha.svg'
import Menu from '../assets/menu.svg'
import Freeza from '../assets/freeza.svg'
import CharData from '../assets/charData.svg'
import Down from '../assets/down.svg'
import Universal from '../assets/universal.svg'
import KameHouse from '../assets/KameHouse.svg'
import Login from '../assets/login.svg'

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
    }

  }

  toggleModal = () => {
    let { isOpen } = this.state
    this.setState({isOpen: !isOpen})
  }

  toggleMenu = () => {
    const isMobile = window.innerWidth < 768;
    const changeDiv = document.getElementById("navbarSupportedContent")

    isMobile ? changeDiv.classList.remove('show') : console.log()
  }

  logoutClick = () => {
    axios.delete(auth("logout"), {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
    })
    .catch(error => console.log(error))
  }

  render() {
  const { characters, user } = this.props
  const { isOpen } = this.state

  const selections = characters.map((character, index) => {

      return (
        <li key={index} >
          <Link to={"/characters/" + character.id } onClick={() => this.toggleMenu()} >
            <img src={character.icon.url} className="dropdown-item" alt="character-icon" ></img>
          </Link>
        </li>

      );

    });

    return (
      // This is the navbar
      <div>
        <nav className="navbar navbar-expand-md navbar-light">
          <Link to="/">
            <img className='freezaHome' src={Freeza} alt='home' />
          </Link>
          <img className='framehameha' src={Framehameha} alt='name'/>
          <img className='menu' src={Menu} alt='menu' data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"/>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <div className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                  <div className='menuItemContain'>
                    <img className='menuIcon' src={CharData} alt='charDataIcon' />
                    <div>Character Data</div>
                    <img className='downIcon' src={Down} alt='down' />
                  </div>
                </div>
                <div className="dropdown-menu scrollable-menu" aria-labelledby="navbarDropdown">
                  <ul className="character-selector">
                    {selections}
                  </ul>
                  {this.props.user && this.props.user.admin ? <button className="nav-link btn" onClick={this.toggleModal}>Add Character +</button> : null}
                </div>
              </li>
              <li className="nav-item">
                <Link to="/universal" onClick={() => this.toggleMenu()} className="nav-link">
                  <div className='menuItemContain'>
                    <img className='menuIcon' src={Universal} alt='charDataIcon' />
                    <div>Universal Data</div>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/learning" onClick={() => this.toggleMenu()} className="nav-link">
                  <div className='menuItemContain'>
                    <img className='menuIcon' src={KameHouse} alt='charDataIcon' />
                    <div>KameHouse</div>
                  </div>
                </Link>
              </li>
            </ul>
            <div className="nav-item">
              {
                this.props.loggedInStatus
                ?
                <div>
                  Welcome, {user.username}!
                  <button type="button" onClick={this.logoutClick} className="btn btn-link">Logout</button>
                </div>
                :
                <Link to='/login' className="loginLink" onClick={() => this.toggleMenu()}>
                  <div className='menuItemContain'>
                    <img className='menuIcon' src={Login} alt='charDataIcon' />
                    <div>Login</div>
                  </div>
                </Link>
              }
            </div>
          </div>
        </nav>
        <Modal show={isOpen} size='lg' >
          <Modal.Header>
            <button className="btn btn-primary float-right" onClick={this.toggleModal}>cancel</button>
          </Modal.Header>
          <AddCharacter />
        </Modal>
      </div>
    );
  }
}

export default Nav;
