import Image from 'next/image'
import styles from './page.module.css'
import HomeScreen from '@/components/screens/Home'
import { Button } from 'antd'

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeScreen />
    </main>
  )
}
