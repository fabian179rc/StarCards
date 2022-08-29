import { GET_ALL_CARDS } from "./../actions/cards/getAllCards";
import { FILTER_CARDS } from "./../actions/cards/filterCards";
import { SORT_CARDS } from "./../actions/cards/sortCards";
import { SEARCH_CARD } from "./../actions/cards/searchCard";
import {
  GET_USER_CARDS,
  FILTER_USER_CARDS,
  SORT_USER_CARDS,
  SEARCH_USER_CARD,
  SALE_CARD,
} from "../actions/cards/userCards";

const initialState = {
  cards: [],
  filteredCards: [],
  userCards: [],
  filteredUserCards: [],
  userCardsForSale: []
};

export default function inventory(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS:
      return { ...state, cards: payload, filteredCards: payload };
    case FILTER_CARDS:
      return { ...state, filteredCards: payload };
    case SORT_CARDS:
      return { ...state, filteredCards: payload };
    case SEARCH_CARD:
      return { ...state, filteredCards: payload };
    case GET_USER_CARDS:
      return {
        ...state,
        userCards: payload.userCards,
        userCardsForSale: payload.forSaleCards,
        // userCardsNotRepeated: payload.notRepeated,
      };
    case FILTER_USER_CARDS:
      return { ...state, filteredUserCards: payload };
    case SORT_USER_CARDS:
      return { ...state, filteredUserCards: payload };
    case SEARCH_USER_CARD:
      return { ...state, filteredUserCards: payload };
    case SALE_CARD:
      const actualCard = state.userCards.find(card => card.id === payload[0].CardId);

      if (actualCard.repeat - payload.length === 0) {
        const newFilteredUserCards = state.userCards.filter(card => card.id !== payload[0].CardId);
        return { ...state, filteredUserCards: newFilteredUserCards }
      }
      actualCard.repeat = actualCard.repeat - payload.length;
      return { ...state, filteredUserCards: [...state.filteredUserCards] }
    default:
      return state;
  }
}
