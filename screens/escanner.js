
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';
import Listado from './Listado';

export default function Escanner({ navigation, route }) {
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Aún no escaneado');
  const [itemName, setItemName] = useState('');
  const [scanDateTime, setScanDateTime] = useState('');
  const [scannedCodes, setScannedCodes] = useState([]);
  const [showScanner, setShowScanner] = useState(true);
  const [warehouseName, setWarehouseName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [warehouseCode, setWarehouseCode] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [scanType, setScanType] = useState(null);

  const openScanner = (type) => {
    setScanned(false);
    setScanType(type);
    setModalVisible(true);
  };

  const closeScanner = () => {
    setModalVisible(false);
  };

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    const { email } = route.params || {}; // Recibimos el email del usuario
    setResponsible(email); // Establecemos el email del usuario como el responsable
  }, [route]);

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    setScanDateTime('Fecha y hora: ' + new Date().toLocaleString());
    if (!responsible) {
      alert('Por favor, establece el responsable antes de escanear.');
      return;
    }

    // Verificar si el código ya ha sido escaneado
    const isCodeAlreadyScanned = scannedCodes.some(code => code.data === data);

    if (isCodeAlreadyScanned) {
      alert('Este código ya ha sido escaneado. Por favor, escanea un código diferente.');
      return;
    }

    if (warehouseName && !warehouseCode) {
      // Escaneo de código de bodega
      setWarehouseCode(data);
      alert('¡Se ha escaneado un código de Bodega!');
    } else if (warehouseName && warehouseCode && itemName) {
      // Verificar si el código del artículo es el mismo que el de la bodega
    if (data === warehouseCode) {
      alert('No se puede repetir el código escaneado, intenta de nuevo');
      return;
    }
      // Escaneo de artículo
      const newScannedCode = { data, itemName, scanDateTime, warehouseCode, responsible };
      setScannedCodes(prevCodes => [...prevCodes, newScannedCode]);
      saveToFile(data, itemName);
      alert('¡Se ha escaneado un artículo!');
      setItemName(''); // Limpiar el nombre del artículo después de escanear
      setWarehouseName(''); // Limpiar el nombre de la bodega después de escanear
      setWarehouseCode(''); // Limpiar el código de la bodega después de escanear
      setShowScanner(false); // Cerrar el escáner después de escanear
    }
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
  
    const warehouseScanDateTime = 'Fecha y hora: ' + new Date().toLocaleString();
    setScannedCodes(prevCodes => [...prevCodes, { data, itemName: 'Bodega', scanDateTime: warehouseScanDateTime, type: 'Bodega' }]);
  
    console.log('Type: ' + type + '\nDatos: ' + data + '\nNombre de la bodega: ' + 'Bodega');
    saveToFile(data, 'Bodega');
  
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeScanner}
      >
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />
          <Button title={'Cerrar Escáner'} onPress={closeScanner} color='red' />
        </View>
      </Modal>
      {showScanner ? (
        <View style={styles.scannerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la bodega"
            onChangeText={(text) => setWarehouseName(text)}
            value={warehouseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del artículo"
            onChangeText={(text) => setItemName(text)}
            value={itemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del responsable"
            onChangeText={(text) => setResponsible(text)}
            value={responsible}
          />
          <View style={styles.buttonContainer}>
          <Button title={'Escanear Bodega'} onPress={() => setScanned(false)} color="cyan" />
          <Button title={'Escanear Artículo'} onPress={() => setScanned(false)} color="cyan" />
          </View>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 600 }}
            />
          </View>
          <Text style={styles.maintext}>{text}</Text>
          <Text style={styles.maintext}>{scanDateTime}</Text>
          <Button title={'Ver Lista'} onPress={() => setShowScanner(false)} color='green' />
        </View>
      ) : (
        <Listado
          scannedCodes={scannedCodes.filter(code => code.type !== 'Bodega')} // Filtra los códigos que no son de bodega
          scannedWarehouses={scannedCodes.filter(code => code.type === 'Bodega')} // Filtra los códigos que son de bodega
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Cambiado de 'space-between' a 'space-evenly'
    width: '100%',
    paddingHorizontal: 10,
  },
});