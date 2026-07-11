import styles from './CardSkeleton.module.css';

const CardSkeleton = ({ aspectRatio = '3 / 4', withSubtitle = true, withTags = true }) => (
  <div className={styles.card} aria-hidden="true">
    <div className={styles.image} style={{ aspectRatio }} />
    <div className={styles.info}>
      <div className={`${styles.line} ${styles.lineTitle}`} />
      {withSubtitle && <div className={`${styles.line} ${styles.lineSubtitle}`} />}
      {withTags && (
        <div className={styles.tags}>
          <div className={styles.tag} />
          <div className={styles.tag} />
        </div>
      )}
    </div>
  </div>
);

export default CardSkeleton;
