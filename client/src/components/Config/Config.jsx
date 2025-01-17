import React, { useEffect, useRef, useState } from "react";
import css from "../../styles/ProfileUser/Config.module.css";
import BtnUserProfile from "../Buttons/BtnUserProfile";
import { useNavigate } from "react-router-dom";
import { deleteUser, modifyUser, userClean } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import { FaRegEdit } from "react-icons/fa";
import { GiTrashCan } from "react-icons/gi";
import Swal from "sweetalert2";
import VerifyMail from "../Mail/VerifyMail";
import { changeModal, successAction } from "../../redux/actions/sendMail";
import TransactionsUser from "./TransactionsUser";

export default function Config({ user }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const email1 = useRef(null);
  const modal = useSelector((state) => state.sendMailReducer.modal);
  const successAction1 = useSelector(
    (state) => state.sendMailReducer.successAction
  );
  const [input, setInput] = useState(true);

  function deleteAccount() {
    Swal.fire({
      background:
        "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
      color: "white",
      title: `Confirm`,
      text: `Are you sure you want to delete your account? This action is permanently`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(deleteUser(user.id));
        dispatch(userClean());
        Swal.fire({
          background:
            "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
          color: "white",
          title: "Removed",
          text: "User Removed",
          icon: "success",
        });
        navigateTo("/");
      }
    });
  }

  function modifyMail() {
    dispatch(changeModal(true));
  }

  useEffect(() => {
    if (!modal && successAction1) {
      setInput(!input);
    }
  }, [successAction1]);

  function sendMail(e) {
    e.preventDefault();
    let email = email1.current.value;
    if (email.length > 7) {
      dispatch(modifyUser(user.id, { email: email }));
      setInput(!input);
      dispatch(successAction());
    }
  }

  function closed(e) {
    setInput(true);
    dispatch(successAction());
  }

  function changeMail() {
    return (
      <div className={css.mail}>
        <form onSubmit={(e) => sendMail(e)}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            placeholder="Enter new Email..."
            ref={email1}
          />
          <button className={css.button} type="submit">
            Confirm
          </button>
          <button onClick={(e) => closed(e)}>X</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <section className={css.containerFiftyFifty}>
        <div className={css.container}>
          <div className={css.config}>
            <div className={css.configUser}>
              <span className={css.userSpan}>USERNAME : {user.username}</span>
              <span>
                <BtnUserProfile user={user} property="username" />
              </span>
            </div>

            <div className={css.configUser}>
              <span className={css.userSpan}>PASSWORD</span>
              {!user.loginGoogle && (
                <div className={css.modal}>
                  <BtnUserProfile user={user} property="password" />
                </div>
              )}
            </div>

            <div className={css.configUser}>
              {input ? (
                <>
                  <span className={css.userSpan}>EMAIL : {user.email}</span>
                  <span className={css.userSpans} onClick={modifyMail}>
                    Edit
                    <FaRegEdit size={30} />
                  </span>
                </>
              ) : (
                changeMail()
              )}
            </div>

            <div className={css.configUser}>
              <span className={css.userSpan}>DELETE ACCOUNT</span>
              <span className={css.userSpans} onClick={deleteAccount}>
                Delete <GiTrashCan size={30} />
              </span>
            </div>
          </div>
        </div>
        <TransactionsUser userId={user.id} />
      </section>

      {modal ? <VerifyMail user={user} /> : ""}
    </>
  );
}
