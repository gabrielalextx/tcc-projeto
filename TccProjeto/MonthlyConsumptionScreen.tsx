//DailyConsumptionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { HomeScreenNavigationProp } from './App'; 
import axios from 'axios';
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

const MonthlyConsumptionScreen: React.FC<Props> = () => {
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

  /*
  const today = DateTime.now().setZone('America/Sao_Paulo');
  const currentMonth = today.month;
  console.log('Número do mês atual:', currentMonth);
  */

  const today = DateTime.now().setZone('America/Sao_Paulo');
  const startOfMonthDate = today.set({ day: 1 }).startOf('day');
  const endOfMonthDate = today.endOf('month').startOf('day');

  const filteredData = React.useMemo(() => {
    return tableData.filter(item => {
      const itemDate = DateTime.fromISO(item.data, { zone: 'America/Sao_Paulo' }).startOf('day');
      return itemDate >= startOfMonthDate && itemDate <= endOfMonthDate;
    });
  }, [tableData, startOfMonthDate, endOfMonthDate]);

  
  // Função para formatar a data no formato DD-MM-AAAA
  const formatData = (date: Date): string => {
    const luxonDate = DateTime.fromJSDate(date, { zone: 'America/Sao_Paulo' });
    return luxonDate.toFormat('dd-MM-yyyy');
  }; 

  //Função para calcular o total de consumo de cada dia da semana
  const calculateDailyConsumption = (): Map<string, number> => {
    const dailyConsumptionMap = new Map<string, number>();

    filteredData.forEach(item => {
      const itemDate = DateTime.fromISO(item.data, { zone: 'America/Sao_Paulo' }).startOf('day');
      const formattedDate = itemDate.toFormat('dd-MM-yyyy');
      
      if (dailyConsumptionMap.has(formattedDate)) {
        dailyConsumptionMap.set(formattedDate, dailyConsumptionMap.get(formattedDate)! + item.consumo);
      } else {
        dailyConsumptionMap.set(formattedDate, item.consumo);
      }
    });

    return dailyConsumptionMap;
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
          data={['Data', 'Consumo']}
          style={styles.head}
          textStyle={styles.headText}
        />
        {filteredData.map((rowData, index) => (
          <Row
            key={index}
            data={[formatData(new Date(rowData.data)), rowData.consumo.toString()]}
            style={[
              styles.row,
              index % 2 === 1 ? styles.rowAlternate : null
            ]}
            textStyle={styles.text}
          />
        ))}
        <Row
          data={['', calculateTotalConsumption()]}
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

export default MonthlyConsumptionScreen;
