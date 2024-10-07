import styles from './SelectedCategories.module.css';

type SelectedCategoriesProps = {
  chuckNorrisCategories: string[];
  pills: Array<{
    searchText: string;
    count: number;
    indices: Record<number, string>;
  }> | null;
  setSelectedCategoryMap: React.Dispatch<React.SetStateAction<Map<string, number> | undefined>>;
  selectedCategoryMap: Map<string, number> | undefined;

  setPills: React.Dispatch<
    React.SetStateAction<
      { searchText: string; count: number; indices: Record<number, string> }[] | null
    >
  >;
};

export const SelectedCategories = ({
  chuckNorrisCategories,
  pills,
  selectedCategoryMap,
  setPills,
  setSelectedCategoryMap,
}: SelectedCategoriesProps) => {
  return (
    <div className={styles.resultsContainer}>
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            margin: '25px 0 0 0',
          }}
        >
          {!!pills &&
            pills
              .sort((a, b) => (a.count > b.count ? -1 : 1))
              .map((pill, index) => {
                return (
                  <div className={styles.pill} key={index}>
                    <span className={styles.selectedPill}>{pill.searchText}</span>
                    <span>{pill.count}</span>
                    <button
                      onClick={() => {
                        const pillsArray = [...pills];
                        pillsArray.splice(index, 1);
                        setPills(pillsArray);
                        if (selectedCategoryMap?.has(pill.searchText)) {
                          const getCategoryIndex = selectedCategoryMap.get(pill.searchText) ?? 0;
                          chuckNorrisCategories[getCategoryIndex] = pill.searchText;
                        }
                        setSelectedCategoryMap((prevMap) => {
                          prevMap?.delete(pill.searchText);
                          return prevMap;
                        });
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
