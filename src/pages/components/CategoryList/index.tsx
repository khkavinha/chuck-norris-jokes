import { useState } from 'react';
import styles from './CategoryList.module.css';

type CategoryListTypes = {
  addPills: (currentSelectedCategory?: string) => void;
  chuckNorrisCategories: string[];
  chuckNorrisCategoriesIsLoading: boolean;
  chuckNorrisCategoriesError: string;
  setSelectedCategory: (value: string) => void;
};

export const CategoryList = ({
  addPills,
  chuckNorrisCategories,
  chuckNorrisCategoriesIsLoading: isLoading,
  chuckNorrisCategoriesError: error,
  setSelectedCategory,
}: CategoryListTypes) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const onClickItem = (item: string, index: number) => {
    setSelectedCategory(item);
    setSelectedIndex(index);
    addPills(item);
  };

  return (
    <div className={styles.main}>
      {isLoading && !error && <div>Results are loading</div>}
      {error && <div>Failed to display results</div>}
      {!isLoading && !error && (
        <ol className={styles.searchResultsList}>
          {chuckNorrisCategories.length === 0 && (
            <li className={styles.error}>Cannot find your result</li>
          )}
          {chuckNorrisCategories.map((item, index) => (
            <li
              className={styles.categoryItem}
              key={index}
              onClick={() => {
                onClickItem(item, index);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background:
                  hoveredIndex === index || selectedIndex === index ? 'lightgray' : 'white',
              }}
            >
              {item}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
