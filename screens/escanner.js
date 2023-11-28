import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';
import Listado from './Listado';

export default function Escanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Aún no escaneado');
  const [itemName, setItemName] = useState('');
  const [scanDateTime, setScanDateTime] = useState('');
  const [scannedCodes, setScannedCodes] = useState([]);
  const [showScanner, setShowScanner] = useState(true);
  const [warehouseName, setWarehouseName] = useState('');

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    setItemName('');
    setScanDateTime('Fecha y hora: ' + new Date().toLocaleString());

    setScannedCodes(prevCodes => [...prevCodes, { data, itemName, scanDateTime }]);

    console.log('Type: ' + type + '\nDatos: ' + data + '\nNombre del artículo: ' + itemName);
    saveToFile(data, itemName);
  };

  const saveToFile = async (data, itemName) => {
    try {
      const currentDate = new Date();
      const fileName = `barcode_data_${itemName}_${currentDate.toISOString()}.txt`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(filePath, data);
      console.log(`Datos guardados en: ${filePath}`);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  const handleWarehouseScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    setWarehouseName('');

    setScannedCodes(prevCodes => [...prevCodes, { data, itemName: warehouseName, scanDateTime, type: 'Bodega' }]);

    console.log('Type: ' + type + '\nDatos: ' + data + '\nNombre de la bodega: ' + warehouseName);
    saveToFile(data, warehouseName);

    if (type === BarCodeScanner.Constants.BarCodeType.qr) {
      alert('¡Se ha escaneado un código de Bodega!');
    } else {
      alert('¡Se ha escaneado un código de Bodega de otro tipo!');
    }
  };

  const renderWarehouseScanner = () => {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la bodega"
          onChangeText={(text) => setWarehouseName(text)}
          value={warehouseName}
        />
        <Button title={'Escanear Bodega'} onPress={() => setScanned(false)} color="cyan" />
      </View>
    );
  };

  const switchToScanner = () => {
    setScanned(false);
    setShowScanner(true);
  };

  const addItem = (item) => {
    setScannedCodes([...scannedCodes, item]);
  };
  const updateItem = (selectedItem, newItemName) => {
    const updatedCodes = scannedCodes.map((item) =>
      item === selectedItem ? { ...item, itemName: newItemName } : item
    );
    setScannedCodes(updatedCodes);
  };

  const deleteItem = (itemToDelete) => {
    const updatedCodes = scannedCodes.filter((item) => item !== itemToDelete);
    setScannedCodes(updatedCodes);
  };

  return (
    <View style={styles.container}>
      {showScanner ? (
        <View style={styles.scannerContainer}>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 600 }}
            />
          </View>
          <Text style={styles.maintext}>{text}</Text>
          <Text style={styles.maintext}>{scanDateTime}</Text>
          {renderWarehouseScanner()}
          <TextInput
            style={styles.input}
            placeholder="Nombre del artículo"
            onChangeText={(text) => setItemName(text)}
            value={itemName}
          />
          <Button title={'Escanear de nuevo'} onPress={switchToScanner} color='cyan' />
          <Button title={'Ver Lista'} onPress={() => setShowScanner(false)} color='green' />
        </View>
      ) : (
        <Listado
          scannedCodes={scannedCodes}
          switchToScanner={() => setShowScanner(true)}
          addItem={addItem}
          updateItem={updateItem}
           deleteItem={deleteItem}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  // Estilos omitidos por brevedad

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'cyan',
    marginBottom: 20,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: 200,
  },
  listHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});