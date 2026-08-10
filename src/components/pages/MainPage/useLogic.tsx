import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecipes, getSharedRecipes, LIMIT } from 'src/api';
import { Tag } from 'src/types/domain';
import { useAppearObserver } from 'src/utils';

export const useLogic = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [query, setQuery] = useState('');

  const recipesQuery = useInfiniteQuery({
    queryKey: ['recipes', tags, query],
    queryFn: ({ pageParam }) =>
      getRecipes(
        tags.map((tag) => tag.id),
        LIMIT,
        pageParam,
        query,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const limit = lastPage.limit || LIMIT;
      const count = (lastPage.content || []).length;
      return count < limit ? undefined : lastPage.offset + limit;
    },
    getPreviousPageParam: (firstPage) =>
      firstPage.offset <= 0
        ? undefined
        : Math.max(0, firstPage.offset - (firstPage.limit || LIMIT)),
    select: (data) => data.pages.flatMap((page) => page.content || []),
  });

  const sharedRecipesQuery = useInfiniteQuery({
    queryKey: ['recipes', 'shared', tags, query],
    queryFn: ({ pageParam }) =>
      getSharedRecipes(
        tags.map((tag) => tag.id),
        LIMIT,
        pageParam,
        query,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const limit = lastPage.limit || LIMIT;
      const count = (lastPage.content || []).length;
      return count < limit ? undefined : lastPage.offset + limit;
    },
    getPreviousPageParam: (firstPage) =>
      firstPage.offset <= 0
        ? undefined
        : Math.max(0, firstPage.offset - (firstPage.limit || LIMIT)),
    select: (data) => data.pages.flatMap((page) => page.content || []),
  });

  const recipes = recipesQuery.data || [];
  const sharedRecipes = sharedRecipesQuery.data || [];

  return {
    recipes,
    sharedRecipes,
    query,
    setQuery,
    isLoading: recipesQuery.isLoading,
    isSharedLoading: sharedRecipesQuery.isLoading,
    recipesObserver: useAppearObserver(recipesQuery),
    sharedRecipesObserver: useAppearObserver(sharedRecipesQuery),
    tags,
    setTags: (tag: Tag) =>
      setTags((prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t.id !== tag.id)
          : [...prev, tag],
      ),
  };
};
