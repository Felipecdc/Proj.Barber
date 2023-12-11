import styles from './styles.module.scss'
import { Header } from "../../components/header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Title } from '../../components/Title'
import { FiTool } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { api } from '../../services/apiClient'

export default function Services(){
    
    const [services, setServices] = useState([])
    
    useEffect(() => {

        async function fetch(){
            const response = await api.get('/services')
            const responseFetch = response.data.services;
            setServices(responseFetch)  
        }

        fetch()

    }, [services])

    async function handleCheckboxChange(serviceId) {
        console.log(serviceId)
        const response = await api.put('/services', {
            service_id: serviceId
        })
    }

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
                    <div className={styles.containerService}>
                    {services.map((value) => (
                        <div key={value.id} className={styles.services}>
                            <div className={styles.serviceContainer}>
                                <div>
                                    <h2>{value.name}</h2>
                                    <hr/>
                                    <span>{value.material}</span>
                                    <h1>R$ {value.price}</h1>
                                </div>
                                <label className={`${styles.switch} ${value.status ? 'move-right' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={value.status || false}
                                        onChange={() => handleCheckboxChange(value.id)}
                                    />
                                    <span className={styles.slider}></span>
                                </label>                          
                            </div>
                        </div>
                    ))}
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