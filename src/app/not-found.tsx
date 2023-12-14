import styles from './notFound.module.css';

export default function NotFound() {
    return <div className={styles.container} >
       <div className={styles.dataCon} >
        <div className={styles.code} >404</div>
        <div className={styles.vrLine} />
        <div className={styles.msg}>Page Not Found</div>
       </div>
    </div>
}