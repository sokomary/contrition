import { Recipe } from './Recipe';
import { User } from './User';

export type FriendRecipes = {
  friend: User;
  recipes: Recipe[];
};
