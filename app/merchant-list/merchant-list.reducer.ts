import { Ingredient } from "../shared/ingredient.model";
import { Action } from "@ngrx/store";
import * as MerchantListActions from "../merchant-list/merchant-list.actions";

const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};

export function merchantListReducer(
  state = initialState,
  action: MerchantListActions.MerchantListActions
) {
  switch (action.type) {
    case MerchantListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case MerchantListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    // case MerchantListActions.UPDATE_INGREDIENT:
    //   const ingredient = state.ingredients[action.payload.index];
    //   const updatedIngredient = {
    //     ...ingredient,
    //     ...action.payload.ingredient,
    //   };
    //   const updatedIngredients = [...state.ingredients];
    //   updatedIngredients[action.payload.index] = updatedIngredient;
    //   return {
    //     ...state,
    //     ingredients: updatedIngredients,
    //   };
    // case MerchantListActions.DELETE_INGREDIENT:
    //   return {
    //     ...state,
    //     ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
    //       return ingredientIndex !== action.payload;
    //     }),
    //   };

    default:
      return state;
  }
}
