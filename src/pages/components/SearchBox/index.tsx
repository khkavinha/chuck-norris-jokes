import { useRef, useEffect, useState } from 'react';
import { useClickOutside } from '../../../helpers/useClickOutside';
import styles from './SearchBox.module.css';

type SearchBoxType = {
  addPills: (currentSelectedCategory?: string) => void;
  chuckNorrisCategories: string[];
  chuckNorrisCategoriesIsLoading: boolean;
  chuckNorrisCategoriesError: string;
  searchText: string;
  setSearchText: (value: string) => void;
  setSelectedCategory: (value: string) => void;
};

export const SearchBox = ({
  addPills,
  chuckNorrisCategories,
  chuckNorrisCategoriesIsLoading: isLoading,
  chuckNorrisCategoriesError: error,
  searchText,
  setSearchText,
  setSelectedCategory,
}: SearchBoxType) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = () => setIsInputFocused(false);
  const ref = useClickOutside(handleClickOutside);

  // const filterCategory = chuckNorrisCategories?.filter(
  //   (category) =>
  //     (category.toLowerCase().includes(searchText.toLowerCase()) && category !== '') ||
  //     selectedCategoryMap?.has(category)
  // );

  // const renderCategory = filterCategory || chuckNorrisCategories;

  useEffect(() => {
    const handleFocus = () => setIsInputFocused(true);

    const currentInputRef = inputRef?.current;

    if (currentInputRef) {
      currentInputRef.addEventListener('focus', handleFocus);
    }

    return () => {
      if (currentInputRef) {
        currentInputRef.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  const onClickItem = (item: string) => {
    setSelectedCategory(item);
    addPills(item);
    setIsInputFocused(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder={'Search for a Chuck Norris Joke by Category'}
          value={searchText}
          ref={inputRef}
          onChange={(event) => {
            const currentText = event.target.value;
            setSearchText(currentText);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              if (!chuckNorrisCategories.includes(searchText)) return;
              addPills();
            }
          }}
        />
        {/* {isInputFocused && (
          <div
            className={styles.searchResultsContainer}
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            {isLoading && !error && <div>Results are loading</div>}
            {error && <div>Failed to display results</div>}
            {!isLoading && !error && (
              <ul className={styles.searchResultsList}>
                {renderCategory.length === 0 && (
                  <li className={styles.searchItems}>Cannot find your result</li>
                )}
                {renderCategory.map((item, index) => (
                  <li
                    className={styles.searchItems}
                    key={index}
                    onClick={() => {
                      onClickItem(item);
                      const getItemIndexInArray = chuckNorrisCategories.indexOf(item);
                      chuckNorrisCategories[getItemIndexInArray] = '';
                      const newMap = new Map(selectedCategoryMap);
                      newMap.set(item, getItemIndexInArray);
                      setSelectedCategoryMap(newMap);
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      background: hoveredIndex === index ? 'lightgray' : 'white',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};
