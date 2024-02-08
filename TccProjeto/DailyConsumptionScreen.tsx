//DailyConsumptionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { HomeScreenNavigationProp } from './App'; 
import axios from 'axios';
import { Timestamp } from 'react-native-reanimated';
import { DateTime } from 'luxon';
import Config from './Config';

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface TableDataItem {
  id: number;
  data: string;
  horario: string;
  consumo: number;
}

const DailyConsumptionScreen: React.FC<Props> = () => {
  // IP do PC: 192.168.1.4 
  const [tableData, setTableData] = React.useState<TableDataItem[]>([]);
  //Mudar endereço IPv4 toda vez que for conectar ao Banco de Dados
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TableDataItem[]>(`${Config.apiServer}/dados`);
        console.log('Dados recebidos do servidor:', response.data);
        setTableData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados do banco:', error);
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchData();
  }, []);

  const timeZone = 'America/Sao_Paulo';
  const today = DateTime.now().setZone(timeZone).startOf('day');
  const startOfDayDate = today.toJSDate();
  const startOfTomorrowDate = today.plus({ days: 1 }).toJSDate();

  const filteredData = React.useMemo(() => {
    console.log('Start of Day Date:', startOfDayDate);
    console.log('Start Of Tomorrow:', startOfTomorrowDate);

    return tableData.filter(item => {
      const itemDate = DateTime.fromISO(item.data, { zone: timeZone }).toJSDate();
      console.log('Item Date:', itemDate);
      console.log('Is within range:', itemDate >= startOfDayDate && itemDate < startOfTomorrowDate);
      return itemDate >= startOfDayDate && itemDate < startOfTomorrowDate;
    });
  }, [tableData, startOfDayDate, startOfTomorrowDate]);

  // Função para formatar a data no formato DD-MM-AAAA usando luxon
  const formatData = (date: Date): string => {
    const luxonDate = DateTime.fromJSDate(date, { zone: timeZone });
    return luxonDate.toFormat('dd-MM-yyyy');
  }; 

  // Função para calcular o valor total de consumo
  const calculateTotalConsumption = (): string => {
    let total = 0;
  
    for (let i = 0; i < filteredData.length; i++) {
      const consumptionValue = typeof filteredData[i].consumo === 'string'
        ? parseFloat(filteredData[i].consumo)
        : filteredData[i].consumo;
  
      if (!isNaN(consumptionValue)) {
        total += consumptionValue;
      }
    }
  
    return total.toFixed(2) + ' kWh';
  };
  
  
  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={['Data', 'Horário', 'Consumo']}
          style={styles.head}
          textStyle={styles.headText}
        />
        {filteredData.map((rowData, index) => (
          <Row
            key={index}
            data={[formatData(new Date(rowData.data)), rowData.horario, rowData.consumo.toString()]}
            style={[
              styles.row,
              index % 2 === 1 ? styles.rowAlternate : null
            ]}
            textStyle={styles.text}
          />
        ))}
        <Row
          data={['Total', calculateTotalConsumption()]}
          style={styles.totalRow}
          textStyle={styles.totalText}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  tableBorder: { borderWidth: 1, borderColor: '#C1C0B9' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  headText: { textAlign: 'center', fontWeight: 'bold', color: 'black' },
  text: { textAlign: 'center', color: 'black' },
  row: { height: 30 },
  rowAlternate: { backgroundColor: '#f1f8ff' },
  totalRow: { height: 40, backgroundColor: '#e3ebfc' },
  totalText: { textAlign: 'center', fontWeight: 'bold', color: 'black' },
  title: { fontSize: 24, fontWeight: 'bold' },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#e3ebfc',
  },
  navigationButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#a9a9a9',
  },
  activeButton: {
    backgroundColor: '#4CAF50', // Cor de destaque para o botão ativo
  },
});

export default DailyConsumptionScreen;
