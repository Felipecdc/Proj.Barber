import styles from './styles.module.scss'
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../../components/header"
import { Title } from "../../components/Title"
import { FiBarChart2 } from "react-icons/fi"

export default function Dashboard(){
    return(
        <>
            <Head>
                <title>Cancun - Dashboard</title>
            </Head>
            <div className={styles.container}>
                <Header/>
                <div className={styles.content}>
                    <Title title={"Minha Agenda"}>
                        <FiBarChart2 size={25}/>
                    </Title>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})