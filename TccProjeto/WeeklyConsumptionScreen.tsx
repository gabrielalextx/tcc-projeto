//DailyConsumptionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

const WeeklyConsumptionScreen: React.FC<Props> = () => {
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
  const startOfWeekDate = DateTime.now().setZone(timeZone).startOf('week').startOf('day');
  const endOfWeekDate = DateTime.now().setZone(timeZone).endOf('week').startOf('day');

  const filteredData = React.useMemo(() => {
    return tableData.filter(item => {
      const itemDate = DateTime.fromISO(item.data, { zone: timeZone }).startOf('day');
      return itemDate >= startOfWeekDate && itemDate <= endOfWeekDate;
    });
  }, [tableData, startOfWeekDate, endOfWeekDate]);

  
  // Função para formatar a data no formato DD-MM-AAAA
  const formatData = (date: Date): string => {
    const luxonDate = DateTime.fromJSDate(date, { zone: timeZone });
    return luxonDate.toFormat('dd-MM-yyyy');
  }; 

  //Função para calcular o valor de consumo de cada dia da semana
  const calculateDailyTotal = (date: DateTime): string => {
    const dailyData = filteredData.filter(item => {
      const itemDate = DateTime.fromISO(item.data, {zone: timeZone}).startOf('day');
      return itemDate.hasSame(date, 'day');
    });

    let total = 0;

    for (let i = 0; i < dailyData.length; i++) {
      const consumptionValue = typeof dailyData[i].consumo === 'string'
        ? parseFloat(dailyData[i].consumo)
        : dailyData[i].consumo;

      if (!isNaN(consumptionValue)) {
        total += consumptionValue / 1000;
      }
    }

    return total.toFixed(4) + ' kWh';
  };

  // Função para calcular o valor total de consumo
  const calculateTotalConsumption = (): string => {
    let total = 0;
  
    for (let i = 0; i < filteredData.length; i++) {
      const consumptionValue = typeof filteredData[i].consumo === 'string'
        ? parseFloat(filteredData[i].consumo)
        : filteredData[i].consumo;
  
      if (!isNaN(consumptionValue)) {
        total += consumptionValue / 1000;
      }
    }
  
    return total.toFixed(4) + ' kWh';
  };
  
  const calculateCost = (totalConsumption: number): string => {
    const tariff = 0.693; // Valor da tarifa em reais por kWh
    const cost = totalConsumption * tariff;
    return `R$ ${cost.toFixed(2)}`;
  };
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={['Dia','Consumo']}
            style={styles.head}
            textStyle={styles.headText}
          />
          {Array.from({ length: 7 }, (_, index) => {
              const dayDate = startOfWeekDate.plus({ days: index });
              return (
                <Row
                  key={index}
                  data={[formatData(dayDate.toJSDate()), calculateDailyTotal(dayDate)]}
                  style={[
                    styles.row,
                    index % 2 === 1 ? styles.rowAlternate : null
                  ]}
                  textStyle={styles.text}
                />
              );
            })}
          <Row
            data={['Total', calculateTotalConsumption(), calculateCost(parseFloat(calculateTotalConsumption()))]}
            style={styles.totalRow}
            textStyle={styles.totalText}
          />
        </Table>
      </View>
    </ScrollView>
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

export default WeeklyConsumptionScreen;
