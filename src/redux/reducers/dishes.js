import { DISHES } from "../../shared/dishes";

// Default State is DISHES
export const Dishes = (state = DISHES, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
