import styles from './styles.module.scss'
import { FiUsers } from "react-icons/fi"
import { Title } from "../../components/Title"
import { Header } from "../../components/header"
import Head from "next/head"

export default function Employees(){
    return(
        <>
            <Head>
                <title>Cancun - Seus Funcionários</title>
            </Head>
            <div className={styles.container}>
                <Header/>
                <div className={styles.content}>
                    <Title title={"Cadastrar Funcionários"}>
                        <FiUsers size={25}/>
                    </Title>
                </div>
            </div>
        </>
    )
}