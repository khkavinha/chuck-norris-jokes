'use client';
import styles from './index.module.css';
import useSWR from 'swr';
import { fetchListOfCategories, fetchRandomJokeFromCategory } from '../route/api';
import { useCallback, useEffect, useState } from 'react';
import { RandomChuckNorrisText } from './components/RandomChuckNorrisJokes';
import { SearchBox } from './components/SearchBox';
import { SelectedCategories } from './components/SelectedCategories';
import { CategoryList } from './components/CategoryList';

export default function Home() {
  const [pills, setPills] = useState<Array<{
    searchText: string;
    count: number;
    indices: Record<number, string>;
  }> | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [chuckNorrisJoke, setChuckNorrisJoke] = useState<string>();
  const [isChuckNorrisJokeLoading, setChuckNorrisJokeLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');

  const {
    data: chuckNorrisCategories,
    error: chuckNorrisCategoriesError,
    isLoading: chuckNorrisCategoriesIsLoading,
  } = useSWR('jokes/categories', fetchListOfCategories) as {
    data: string[];
    error: string;
    isLoading: boolean;
  };

  const hasDuplicateResults = pills?.find((pill) => pill.searchText === searchText);

  const isDisabled = searchText === '' || !!hasDuplicateResults;

  useEffect(() => {
    const fetchData = async () => {
      setChuckNorrisJokeLoading(true);
      await fetchRandomJokeFromCategory(selectedCategory)
        .then((response) => {
          return response.json();
        })
        .then((response: { value: string }) => {
          setChuckNorrisJoke(response.value);
          setChuckNorrisJokeLoading(false);
        });
    };
    if (selectedCategory) fetchData().catch((error) => console.log(error));
  }, [selectedCategory]);

  const addPills = useCallback(
    (currentSelectedCategory?: string) => {
      if (isDisabled && !currentSelectedCategory) {
        return;
      }

      const currentText = currentSelectedCategory ?? searchText;

      const indices = {} as Record<number, string>;

      // const matchedCategories = chuckNorrisCategories.filter((category, index) => {
      //   const isElementMatched = category === currentText;
      //   if (isElementMatched) {
      //     indices[index] = category;
      //   }
      //   return isElementMatched;
      // });

      if (pills) {
        setPills([
          ...pills,
          {
            searchText: currentText,
            count: chuckNorrisCategories.length,
            indices,
          },
        ]);
      } else {
        setPills([
          {
            searchText: currentText,
            count: chuckNorrisCategories.length,
            indices,
          },
        ]);
      }
      setSearchText('');
    },
    [chuckNorrisCategories, pills, isDisabled, searchText]
  );

  return (
    <div className={styles.Root}>
      <h1> What would Chuck Norris say today? </h1>
      <RandomChuckNorrisText
        chuckNorrisJoke={chuckNorrisJoke}
        isChuckNorrisJokeLoading={isChuckNorrisJokeLoading}
      />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <CategoryList
          addPills={addPills}
          chuckNorrisCategories={chuckNorrisCategories}
          chuckNorrisCategoriesError={chuckNorrisCategoriesError}
          chuckNorrisCategoriesIsLoading={chuckNorrisCategoriesIsLoading}
          setSelectedCategory={setSelectedCategory}
        />
        <SearchBox
          addPills={addPills}
          chuckNorrisCategories={chuckNorrisCategories}
          chuckNorrisCategoriesIsLoading={chuckNorrisCategoriesIsLoading}
          chuckNorrisCategoriesError={chuckNorrisCategoriesError}
          searchText={searchText}
          setSearchText={setSearchText}
          setSelectedCategory={setSelectedCategory}
        />
        {/* <SelectedCategories
          chuckNorrisCategories={chuckNorrisCategories}
          pills={pills}
          setSelectedCategoryMap={setSelectedCategoryMap}
          selectedCategoryMap={selectedCategoryMap}
          setPills={setPills}
        /> */}
      </div>
    </div>
  );
}
