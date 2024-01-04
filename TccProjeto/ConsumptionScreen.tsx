// ConsumptionScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { HomeScreenNavigationProp } from './App'; 
import axios from 'axios';
import { Timestamp } from 'react-native-reanimated';
import { format } from 'date-fns';

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface TableDataItem {
  id: number;
  data: Date;
  horario: string;
  consumo: number;
}

const ConsumptionScreen: React.FC<Props> = () => {
  // IP do PC: 192.168.1.4 
  const [tableData, setTableData] = React.useState<TableDataItem[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TableDataItem[]>('http://192.168.1.4:3000/dados');
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

  // Função para formatar a data no formato DD-MM-AAAA
  const formatData = (date: Date): string => {
    return format(date, 'dd-MM-yyyy');
  }; 

  // Função para calcular o valor total de consumo
  const calculateTotalConsumption = (): string => {
    let total = 0;
  
    for (let i = 0; i < tableData.length; i++) {
      // Certifiqcar que consumptionValue é um número válido
      const consumptionValue = typeof tableData[i].consumo === 'string'
        ? parseFloat(tableData[i].consumo)
        : tableData[i].consumo;
  
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
        {tableData.slice(1).map((rowData, index) => (
          <Row
            key={index}
            data={[formatData(rowData.data), rowData.horario, rowData.consumo.toString()]}
            style={[
              styles.row,
              index % 2 === 1 ? styles.rowAlternate : null
            ]}
            textStyle={styles.text}
          />
        ))}
        <Row
          data={['', '', calculateTotalConsumption()]}
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
});

export default ConsumptionScreen;
