import styles from '../../styles/SchoolCard.module.css';

export default function SchoolCard({ school }) {
  return (
    <div className={`card ${styles.schoolCard}`}>
      <div className={styles.imageContainer}>
        <img 
          src={school.image || '/school-placeholder.jpg'} 
          alt={school.name}
          className={styles.image}
          onError={(e) => {
            e.target.src = '/school-placeholder.jpg';
          }}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.schoolName}>{school.name}</h3>
        <p className={styles.schoolAddress}>{school.address}</p>
        <p className={styles.schoolCity}>{school.city}</p>
      </div>
    </div>
  );
}