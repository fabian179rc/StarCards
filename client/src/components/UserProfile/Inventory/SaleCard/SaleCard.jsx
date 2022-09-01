import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSaleCard } from "../../../../redux/actions/cards/userCards";

import css from "./SaleCard.module.css";

export default function SaleCard({ handleViewCard, card }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  // const [currentUserCards, setCurrentUserCards] = useState(null);

  const [sale, setSale] = useState({ quantity: 0, price: 0 });

  function handleChange(e) {
    setSale({ ...sale, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (sale.quantity > card.userCards.length) setSale({ ...sale, quantity: card.userCards.length });
  }, [sale]);

  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  }

  function handleSubmit(e, status) {
    e.preventDefault();
    if (!sale.quantity || !sale.price) return;
    const userCardsIdsToUpdate = [];

    for (let i = 0; i < sale.quantity; i++) {
      userCardsIdsToUpdate.push(card.userCards[i].id);
    }
    dispatch(handleSaleCard({ userId: user.id, userCardsIdsToUpdate, status, price: sale.price }));
  }

  return (
    <div className={css.SaleCard} onClick={handleViewCard}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <h1>{card.name}</h1>
        <img src={card.image} alt="" />
        <form onSubmit={(e) => handleSubmit(e, 'onSale')}>
          <div className="">
            <label htmlFor="quantity">Cantidad</label>
            <input type="number" name="quantity" id="quantity" min="1" max={card?.userCards?.length} onKeyPress={dontAllowLeters} value={sale.quantity} placeholder="quantity" onChange={handleChange} />
          </div>
          <div className="">
            <label htmlFor="price">Precio</label>
            <input type="number" name="price" id="price" value={sale.price} placeholder="price" onKeyPress={dontAllowLeters} onChange={handleChange} />
          </div>
          <input type="submit" value="Sale" />
        </form>
      </div>
    </div>
  );
}