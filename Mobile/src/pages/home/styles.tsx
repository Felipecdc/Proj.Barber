import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 5px; 
`;

export const AreaTitle = styled.View`
    background-color: #fff;
    width: 350px;
    height: 100px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    elevation: 5;
`;

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #000;
    text-align: center;
    alignSelf: center;
`;

export const Header = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    padding-horizontal: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const VerticalLine = styled.View`
    height: 100%;
    width: 1px;
    background-color: #c9c9c9;
    margin-horizontal: 10px;
`;

export const NameScreen = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #000;
    text-align: center;
    alignSelf: center;
`;

export const Back = styled.Text`
    font-size: 20px;
    text-align: center;
    alignSelf: center;
    padding-right:10px
`;

export const AreaCalendar = styled.View`
    margin-top: 50px
`;


export const AreaView = styled.View`
    width: 350px;
    height: 400px;
    border-radius: 10px;
    background-color: white;
    elevation: 5;
`;

export const Scroll = styled.ScrollView`
    padding: 20px;
`;

export const ServiceList = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    margin-vertical: 10px;
    border-radius: 5px;
    border: 1px solid #ceddf2;
    background-color: #dce7f7;
    elevation: 2;
`;

export const Text = styled.Text`
    color: #000;
    font-size: 20px;
    padding: 5px 10px 5px 10px
`;

export const TimeList = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    margin-vertical: 10px;
    border-radius: 5px;
    border: 1px solid #ceddf2;
    background-color: #dce7f7;
    elevation: 2;

`;

export const Send = styled.TouchableOpacity`
    height: 45px;
    justify-content: center;
    align-items: center;
    padding: 45px 0
`;
