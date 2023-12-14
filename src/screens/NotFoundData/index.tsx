import React from "react";
import styles from './styles.module.css';


const NotFoundData = () => {
    return <div className={styles.container} >
        <div className={styles.itemContainer} >
            <div className={styles.title} >Not a valid URL !</div>
            <div className={styles.desc} >Please contact your administrator</div>
        </div>
    </div>
}

export default NotFoundData;