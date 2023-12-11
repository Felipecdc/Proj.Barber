import styles from './styles.module.scss'
import { FiUsers } from "react-icons/fi"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Title } from "../../components/Title"
import { Header } from "../../components/header"
import Head from "next/head"
import { useEffect, useState } from 'react'
import { api } from '../../services/apiClient'

export default function Employees(){

    const [name, serName] = useState('');
    const [email, serEmail] = useState('');
    const [contato, setContato] = useState('');
    const [password, setPassword] = useState('');
    const [listEmployee, setListEmployee] = useState([])

    useEffect(() => {

        async function fetch(){
            const response = await api.get('employee')
            setListEmployee(response.data.employee)
        }

        fetch()

    }, [])

    async function handleCreateEmployee(){
        try{
            // const response = await api.put('')
        }catch(err){
            console.log(err)
        }
    }

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
                    <div className={styles.containerEmployee}>
                        <form className={styles.createEmployee} onSubmit={handleCreateEmployee}>
                            <h2>Cadastrar novo Funcionários</h2>
                            <hr/>
                            <h3>Nome</h3>
                            <input type='text'
                            placeholder='Nome do Funcionários'
                            value={null}
                            onChange={null}
                            />
                            <h3>Email</h3>
                            <input type='text'
                            placeholder='email@email.com'
                            value={null}
                            onChange={null}
                            />
                            <h3>Contato</h3>
                            <input type='text'
                            placeholder='00000000000'
                            value={null}
                            onChange={null}
                            />
                            <h3>Senha</h3>
                            <input type='password'
                            placeholder='**********'
                            value={null}
                            onChange={null}
                            />
                            <button>Cadastrar</button>
                        </form>
                        <div className={styles.listEmployee}>
                            <h2>Seus Funcionários</h2>
                            <hr/>
                            <div className={styles.listContainer}>
                            {listEmployee.map((v) => (
                                <div className={styles.info} key={v.id}>
                                    <span><strong>Nome: </strong>{v.name}</span>
                                    <span><strong>Email: </strong>{v.email}</span>
                                    <span><strong>Contato: </strong>{v.contato}</span>
                                    <span><strong>Porcentagem: </strong>{v.percentage}%</span>
                                    <hr/>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
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