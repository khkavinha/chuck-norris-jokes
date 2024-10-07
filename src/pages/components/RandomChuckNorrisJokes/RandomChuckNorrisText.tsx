import styles from './RandomChuckNorrisJokeText.module.css';

type RandomChuckNorrisJokeTextType = {
  chuckNorrisJoke: string | undefined;
  isChuckNorrisJokeLoading: boolean;
};

export const RandomChuckNorrisText = ({
  chuckNorrisJoke,
  isChuckNorrisJokeLoading,
}: RandomChuckNorrisJokeTextType) => {
  const currentText = isChuckNorrisJokeLoading ? 'Loading...' : chuckNorrisJoke;
  return (
    <div className={styles.RandomChuckNorrisJokeContainer}>
      <div className={styles.HeaderText}>
        Chuck Norris Joke of the Day! Search for specific one in the search box
      </div>
      <div className={styles.RandomChuckNorrisJokeText}>{currentText}</div>
    </div>
  );
};
