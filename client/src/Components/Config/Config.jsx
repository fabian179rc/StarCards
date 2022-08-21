import React from 'react'
import style from '../../styles/ProfileUser/Config.module.css'
import BtnUserProfile from '../Buttons/BtnUserProfile'
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';

export default function Config({ user }) {
  const dispatch = useDispatch()
  const navigateTo = useNavigate();

  function deleteAccount() {
    dispatch(deleteUser(user.id))
    navigateTo('/')
  }

  return (
    <div className={style.container}>
      <div className={style.config}>
        <h3>Informacion Personal</h3>
        <div className={style.modal}><span>Username: {user.username} ({user.RolId !== 'user' ? user.RolId : ''})</span><BtnUserProfile user={user} property='username' /></div>
        <div className={style.modal}><span >Password </span><BtnUserProfile user={user} property='password' /></div>
        <div><span>Email: {user.email}</span></div>
        <div><span>Score: {user.score}</span></div>
        <div><span>Deck:{user.DeckId}</span></div>
        <div><span>Account Status: {user.StatusId}</span> <button className={style.bdelete} onClick={deleteAccount} >Delete Account</button></div>
      </div>
    </div>

  )
}