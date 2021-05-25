import React from 'react';

import useFirestore from '../hooks/useFirestore';

const DataContext = React.createContext({});

const DataContextProvider = ({ children }) => {
  const [posts, setPosts] = React.useState([]);
  const [allPosts, setAllPosts] = React.useState([]);
  const [fetchingPosts, setFetchingPosts] = React.useState(true);

  const { getPosts } = useFirestore();

  const fetchPosts = React.useCallback(async () => {
    try {
      const data = await getPosts();

      setPosts(data);
      setAllPosts(data);

      setFetchingPosts(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const filterPosts = React.useCallback(
    (sortComparator, filterPredicate, speciesPredicate) => {
      let data = allPosts;

      if (filterPredicate) data = data.filter(filterPredicate);
      if (speciesPredicate) data = data.filter(speciesPredicate);
      if (sortComparator) data.sort(sortComparator);

      setPosts(data);
    },
    [allPosts]
  );

  const dataContext = React.useMemo(
    () => ({
      posts,
      setPosts,
      filterPosts,
      fetchPosts,
      fetchingPosts,
      removePost: post => setPosts(prev => prev.filter(p => p !== post))
    }),
    [posts, fetchingPosts, filterPosts]
  );

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
