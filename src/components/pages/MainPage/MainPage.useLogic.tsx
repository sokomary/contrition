import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from 'src/api';
import { useRouteModal } from 'src/router';
import { Tag } from 'src/types/domain';

export const useLogic = () => {
  const { isOpen: isMenuOpen } = useRouteModal({ key: 'menu' });

  const [tags, setTags] = useState<Tag[]>([]);
  const [query, setQuery] = useState('');

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', tags],
    queryFn: () => getRecipes(tags.map((tag) => tag.id)),
  });

  const filteredRecipes =
    useMemo(
      () =>
        query?.length
          ? recipes?.filter((r) =>
              r.name.toLowerCase().includes(query.toLowerCase())
            )
          : recipes,
      [query, recipes]
    ) || [];

  return {
    isMenuOpen,
    filteredRecipes,
    query,
    setQuery,
    isLoading,
    tags,
    setTags: (tag: Tag) =>
      setTags((prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t.id !== tag.id)
          : [...prev, tag]
      ),
  };
};
