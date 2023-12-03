import Image from 'next/image';
import styles from './styles.module.css';

const InventoryDetails = () => {
    return <div className={styles.container} >
        <div className={styles.headSec} >
            <div className={styles.imageCon} >
                <Image src={'/images/dummy/Group1171276348.png'} alt='inventory picture' width={120} height={120} />
            </div>
            <div className={styles.textCon} >
                <div className={styles.topText} >Inventory & Specifications Deck</div>
                <div className={styles.bottomText} >
                    <div className={styles.iconTextCon} >
                        <Image src={'/images/icons/PhoneCallingRounded.svg'} alt='phone call' className={styles.iconIcon} width={22} height={22} />
                        <span className={styles.iconsText} >+1562375364</span>
                    </div>
                    <div className={styles.iconTextCon} >
                        <Image src={'/images/icons/email.svg'} alt='phone call' className={styles.iconIcon} width={22} height={22} />
                        <span className={styles.iconsText} >example@gmail.com</span>
                    </div>
                    <div className={styles.iconTextCon} >
                        <Image src={'/images/icons/location.svg'} alt='phone call' className={styles.iconIcon} width={22} height={22} />
                        <span className={styles.iconsText} >Avenue 56 #67265 Austin, Texas, USA</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.detailsSec} >
            {details.split('\n').map((item, index) => <>{item}<br key={index}/></>)}
           
        </div>
        <div className={styles.detailsShadow} />

    </div>
}

const details = `
it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur. it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.\n
it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.\n
it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.\n
it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.\n


`

export default InventoryDetails;