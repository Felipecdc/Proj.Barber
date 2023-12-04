import styles from './styles.module.scss'
import { Header } from "../../components/header"
import Head from "next/head"
import { Title } from '../../components/Title'
import { FiTool } from 'react-icons/fi'

export default function Services(){
    

    return(
        <>
            <Head>
                <title>Cancun - Seus Serviços</title>
            </Head>
            <div className={styles.container}>
                <Header/>
                <div className={styles.content}>
                    <Title title={"Meus Serviços"}>
                        <FiTool size={25}/>
                    </Title>
                </div>
            </div>
        </>
    )
} 