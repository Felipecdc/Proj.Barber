import React, { useContext, useEffect, useState } from "react";
import { 
    Container, 
    AreaCalendar, 
    AreaTitle, 
    Title, 
    AreaView, 
    Scroll, 
    Text, 
    ServiceList,
    Header,
    Back,
    NameScreen,
    VerticalLine,
    TimeList,
    Send,
} from './styles';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./localeConfig";
import { AuthContext } from "../../contexts";
import { startOfDay, isAfter, format } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

import { api } from "../../services/api";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface MarkedDates {
    [date: string]: {
        selected: boolean;
        selectedColor: string;
        textColor: string;
    };
}

interface Service {
    name: string;
    price: string;
}

interface Services {
    created_at: string;
    id: string;
    material: string;
    name: string;
    price: number;
    status: boolean;
    updated_at: string;}

interface Employee {
    name: string;
}

interface Times {
    item: string
}

export default function Home() {
    const { setUser, user } = useContext(AuthContext);
    const navigation = useNavigation();

    const [screen, setScreen] = useState('calendar');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const [services, setServices] = useState<Service[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([])
    const [freehouer, serFreehouer] = useState<string[]>([]);
    
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState<MarkedDates>({});

    useEffect(() => {
        async function GetServices() {
            try {
                const response = await api.get('/services', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                const serviceInfo = response.data.services.filter((service: Services) => service.status !== false);
                setServices(serviceInfo)
            } catch (error: any) {
                console.error("Erro na chamada à API:", error.response);
            }
        }
        GetServices();
        async function GetOrders(){
            try {
                const response = await api.get('/orders', {
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                });
        
                const orders = response.data.orders;
                const startOfCurrentDay = startOfDay(new Date());
                const filteredOrders = orders.filter((order: { data: string, horario: string }) => {
                    const dateParts = order.data.split('/');
                    const day = parseInt(dateParts[0], 10);
                    const month = parseInt(dateParts[1], 10) - 1;
                    const year = parseInt(dateParts[2], 10);
                
                    const timeParts = order.horario.split(':');
                    const hours = parseInt(timeParts[0], 10);
                    const minutes = parseInt(timeParts[1], 10);
                
                    try {
                        const orderDate = new Date(Date.UTC(year, month, day, hours, minutes));

                        if (isAfter(orderDate, startOfCurrentDay)) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        console.error('Erro na criação do objeto Date:', error);
                        return false;
                    }
                });

                setFilteredOrders(filteredOrders);
            } catch (error: any) {
                console.error('Erro na chamada à API:', error.response);
            }
            
        }
        GetOrders();
        async function GetEmployee(){
            try{
                const response = await api.get('/employee', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                      },
                })
                setEmployees(response.data.employee)
            }catch(err){
                console.log(err)
            }
        }
        GetEmployee();
    }, [navigation, screen, user?.token])

    function handleSelect(date: { dateString: string }) {
        try{
            let markedDay: MarkedDates = {};
            markedDay[date.dateString] = {
                selected: true,
                selectedColor: '#00adf5',
                textColor: '#fff'
            };
            setMarkedDates(markedDay);
            
            const localeDate = new Date(`${date.dateString}T00:00:00`);
            const dateFormat = format(localeDate, 'dd/MM/yyyy');
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            if(localeDate.getDay() === 0){
                Alert.alert('Desculpe, não há horários disponíveis para Domingo!')
                return;
            }
            if (localeDate < currentDate) {
                Alert.alert("Desculpe, só é possível agendar para o dia atual ou dias seguintes.");
                return;
            }
            
            const workingHours = [];
            
            for (let hour = 6; hour <= 18; hour++) {
                workingHours.push(`${hour.toString().padStart(2, '0')}:00`);
                workingHours.push(`${hour.toString().padStart(2, '0')}:30`);
            }
            
            const busyTimesForSelectedDay = filteredOrders
            .filter((order: { data: string, horario: string }) => order.data === dateFormat)
            .map((order: { data: string, horario: string }) => order.horario);
            
            setAvailableTimes(busyTimesForSelectedDay);
            
            const hours = workingHours.filter((times) => !busyTimesForSelectedDay.includes(times))
            
            setSelectedDate(dateFormat)
            serFreehouer(hours) 
            setScreen('services');
        }catch(err){
            console.log(err)
        }
    }
    
    function handleService(item: Service){
        setScreen('time')
        setSelectedService(item.name)
    }
    
    function handleTimes(item: Times){
        setScreen('employee')
        setSelectedHour(item?.item)
    }
    
    function handleEmployee(item: Employee){
        setScreen('send')
        setSelectedEmployee(item.name)
    }
    
    function handleGoBack(){
        if(screen === 'send'){
            setScreen('calendar')
            setSelectedDate('');
            setSelectedEmployee('');
            setSelectedHour('');
            setSelectedService('');
        }
        if(screen === 'employee'){
            setScreen('time')
        }
        if(screen === 'time'){
            setScreen('services')
        }
        if(screen === 'services'){
            setScreen('calendar')
        }
        if(screen === ''){
            setScreen('calendar')
        }
    }

    async function handleSend(){
        try{

            const data = {
                name: user?.name,
                profissional: selectedEmployee,
                data: selectedDate,
                horario: selectedHour,
                services: selectedService,
            }

            const response = await api.post('/orders', data, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            })

            console.log(response.data)

            setScreen('confirm')

            setTimeout(() => {
                setScreen('calendar')
            }, 1500);

        }catch(err){
            console.log(err)
        }
    }

    return (
        <Container>
            <AreaTitle>
                {screen === 'confirm' && (
                    <Header>
                        <Icon name="checkmark-circle" size={80} color="green" />                    
                    </Header>
                )}
                {screen === 'calendar' && (
                    <Title>Escolha uma data</Title>
                )}
                {screen === 'services' && (
                    <Header onPress={handleGoBack}>
                        <Back>Voltar</Back>
                        <VerticalLine/>
                        <NameScreen>Escolha um serviço</NameScreen>
                    </Header>
                )}
                {screen === 'time' && (
                    <Header onPress={handleGoBack}>
                        <Back>Voltar</Back>
                        <VerticalLine/>
                        <NameScreen>Escolha um horario</NameScreen>
                    </Header>
                )}
                {screen === 'employee' && (
                    <Header onPress={handleGoBack}>
                        <Back>Voltar</Back>
                        <VerticalLine/>
                        <NameScreen>Selecione um Barbeiro</NameScreen>
                    </Header>
                )}
                {screen === 'send' && (
                    <Header onPress={handleGoBack}>
                        <Back>Inicio</Back>
                        <VerticalLine/>
                        <NameScreen>Cadastrar Horario</NameScreen>
                    </Header>
                )}
                {screen === '' && (
                    <Header onPress={handleGoBack}>
                        <Back>Voltar</Back>
                        <VerticalLine/>
                        <NameScreen>Tela inacabada</NameScreen>
                    </Header>
                )}
            </AreaTitle>
            <AreaCalendar>
                {screen === 'calendar' && (
                    <Calendar
                        onDayPress={handleSelect}
                        markedDates={markedDates}
                        enableSwipeMonths={true}
                        disableAllTouchEventsForDisabledDays={true}
                        theme={{
                            selectedDayBackgroundColor: "#00adf5",
                            selectedDayTextColor: "#fff"
                        }}
                        style={{
                            width: 350,
                            height: 400,
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            elevation: 8,
                        }}
                    />
                )}
                {screen === 'services' && (
                    <AreaView>
                        <Scroll>
                            {services.map((item, index) => (
                                <ServiceList key={index} onPress={() => handleService(item)}>
                                    <Text>{item.name}</Text>
                                    <Text>R$ {item.price}</Text>
                                </ServiceList>
                            ))}
                        </Scroll>
                    </AreaView>
                )}
                {screen === 'time' && (
                    <AreaView>
                        <Scroll>
                            {freehouer.map((item, index) => (
                                <TimeList key={index} onPress={() => handleTimes({item})}>
                                    <Text>{item}</Text>
                                </TimeList>
                            ))}
                        </Scroll>
                    </AreaView>
                )}
                {screen === 'employee' && (
                    <AreaView>
                        <Scroll>
                            {employees.map((item, index) => (
                                <TimeList key={index} onPress={() => handleEmployee(item)}>
                                    <Text>{item.name}</Text>
                                </TimeList>
                            ))}
                        </Scroll>
                    </AreaView>
                )}
                {screen === 'send' && (
                    <AreaView>
                        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 10}}>Dia</Text>
                        <Text style={{color: 'gray', marginTop: -8, marginLeft: 10}}>{selectedDate}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 10}}>Horario</Text>
                        <Text style={{color: 'gray', marginTop: -8, marginLeft: 10}}>{selectedHour}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 10}}>Service</Text>
                        <Text style={{color: 'gray', marginTop: -8, marginLeft: 10}}>{selectedService}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 10}}>Profissional</Text>
                        <Text style={{color: 'gray', marginTop: -8, marginLeft: 10}}>{selectedEmployee}</Text>
                        <Send onPress={handleSend}>
                            <Text 
                            style={{
                                backgroundColor: '#0c7ec9', 
                                color: 'white',
                                borderRadius: 5,
                                width: '50%',
                                height: 45,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontSize: 25,
                                fontWeight: 'bold'
                            }}>Enviar</Text>
                        </Send>
                    </AreaView>
                )}
            </AreaCalendar>
        </Container>
    );
}
