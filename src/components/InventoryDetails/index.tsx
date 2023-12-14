"use client"
import Image from 'next/image';
import styles from './styles.module.css';
import TextEditor from '../TextEditor';

const InventoryDetails = (props:IInventoryDetails) => {
    // console.log("Props : ", props);
    
    return <div className={styles.container} >
        <div className={styles.headSec} >
            <div className={styles.imageCon} >
                <Image src={props.logo_url || ''} alt='inventory picture' width={120} height={120} style={{ borderRadius: 10 }} />
            </div>
            <div className={styles.textCon} >
                <div className={styles.topText} >Inventory & Specifications Deck</div>
                <div className={styles.bottomText} >
                    <div className={styles.iconTextCon} >
                        <Image src={'/images/icons/PhoneCallingRounded.svg'} alt='phone call' className={styles.iconIcon} width={22} height={22} />
                        <span className={styles.iconsText} >{props.secondary_phone_number}</span>
                    </div>
                    <div className={styles.iconTextCon} >
                        <Image src={'/images/icons/email.svg'} alt='phone call' className={styles.iconIcon} width={22} height={22} />
                        <span className={styles.iconsText} >{props.email_address}</span>
                    </div>
                    <div className={styles.iconTextCon} >
                        <Image src={'/images/icons/location.svg'} alt='phone call' className={styles.iconIcon} width={22} height={22} />
                        <span className={styles.iconsText} >Avenue 56 #67265 Austin, Texas, USA</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.detailsSec} >
           <TextEditor value={props.description} isReadOnly />
        </div>
        <div className={styles.detailsShadow} />

    </div>
}

interface IInventoryDetails {
    description: string;
    email_address: string;
    logo_url: string | undefined;
    phone_number: string;
    secondary_email_address: string;
    secondary_phone_number: string;
    workspace_id: string;
    id?: string;
  }

export default InventoryDetails;