import styles from './styles.module.scss'
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"

import { api } from '../../services/apiClient'

import { Header } from "../../components/header"
import { Title } from "../../components/Title"
import { FiBarChart2, FiCheck } from "react-icons/fi"
import { useEffect, useState } from 'react'

interface Order {
    id: string;
    name: string;
    services: string;
    valor: number;
    profissional: string;
    data: string;
    horario: string;
    status: boolean;
  }
  
export default function Dashboard(){

    const [employee, setEmployee] = useState([])
    const [clientes, setClientes] = useState([])
    const [orders, setOrders] = useState<Order[]>([]);
    const [lucro, setLucro] = useState([])
    const [refresh, setrefresh] = useState(0)

    useEffect(() => {
        async function fetchInfo() {
          const responseEmployee = await api.get('/employee');
          const responseUsers = await api.get('users/list');
          const responseOrders = await api.get('orders');
    
          const employee = responseEmployee.data.employee;
          const users = responseUsers.data.users;
          const orders = responseOrders.data.orders;
    
          const filterstatus = orders.filter((order) => order.status === false);
          const sortedOrders = filterstatus.sort((a, b) => {
            const dateA = new Date(`${a.data} ${a.horario}`);
            const dateB = new Date(`${b.data} ${b.horario}`);
            return dateB.getTime() - dateA.getTime();
          });
        
          const idEmployee = employee.map((funcionario) => funcionario.id);
          const idUsers = users.map((users) => users.id);
          const valorSemana = orders.map((semana) => semana.valor);
    
          const soma = valorSemana.reduce((acc, value) => acc + value, 0);
          const formatValue = soma.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
    
          setEmployee(idEmployee);
          setClientes(idUsers);
          setOrders(sortedOrders);
          setLucro(formatValue);
          console.log(refresh);
        }
    
        fetchInfo();
      }, [refresh]);

      async function handleDelete(order_id: string) {
        try {
            const response = await api.put('/order/send', { order_id });
            // Handle the successful response
            setrefresh( refresh + 1)
        } catch (error) {
            // Handle the error, e.g., log the error message
            console.error("Error deleting order:", error.message);
        }
    }
    
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
                    <div className={styles.dash}>
                        <div className={styles.card}>
                            <h2>Clientes</h2>
                            <h1>{clientes ? clientes.length : 'Erro'}</h1>
                        </div>
                        <div className={styles.card}>
                            <h2>Semana</h2>
                            <h1>{lucro ? lucro : 'Erro'}</h1>
                        </div>
                        <div className={styles.card}>
                            <h2>Funcionários</h2>
                            <h1>{employee ? employee.length : 'Erro'}</h1>
                        </div>
                    </div>
                    <div className={styles.containerTable}>
                    <table className={styles.containerList}>
                        <thead>
                            <tr>
                                <th scope='col'>Cliente</th>
                                <th scope='col'>Service</th>
                                <th scope='col'>Valor</th>
                                <th scope='col'>Profissional</th>
                                <th scope='col'>Data</th>
                                <th scope='col'>Horario</th>
                                <th scope='col'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td data-label="Cliente">{order.name}</td>
                                    <td data-label="Service">{order.services}</td>
                                    <td data-label="Valor">R$ {order.valor}</td>
                                    <td data-label="Profissional">{order.profissional}</td>
                                    <td data-label="Data">{order.data}</td>
                                    <td data-label="Horario">{order.horario}</td>
                                    <td data-label="#">
                                        <button className={styles.buttonList} onClick={ () => handleDelete(order.id)}>
                                            <span></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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