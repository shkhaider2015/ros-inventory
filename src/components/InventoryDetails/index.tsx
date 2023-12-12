"use client"
import Image from 'next/image';
import styles from './styles.module.css';
import { Image_URL_Base } from '@/lib/constants';

const InventoryDetails = (props:IInventoryDetails) => {
    console.log("Props : ", props);
    
    return <div className={styles.container} >
        <div className={styles.headSec} >
            <div className={styles.imageCon} >
                <Image src={Image_URL_Base+ props.logo_url} alt='inventory picture' width={120} height={120} />
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

interface IInventoryDetails {
    description: string;
    email_address: string;
    logo_url: Blob | string | undefined;
    phone_number: string;
    secondary_email_address: string;
    secondary_phone_number: string;
    workspace_id: string;
    id?: string;
  }

export default InventoryDetails;