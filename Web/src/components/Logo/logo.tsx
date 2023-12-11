import styles from './styles.module.scss'
import { FaCut } from 'react-icons/fa';

export default function LogoLogin() {
  return (

      <div className={styles.container}>
        <div className={styles.areaLogo}>
          <div className={styles.barArea}>
            <div className={styles.barWhite}/>
            <div className={styles.barBlue}/>
          </div>
          <div className={styles.logo}>
            <h1>CANCUN</h1>
            <h3>BARBEARIA</h3>
          </div>
          <div className={styles.barArea}>
            <div className={styles.barWhite}/>
            <div className={styles.barBlue}/>
          </div>
        </div>
      </div>
  )
}