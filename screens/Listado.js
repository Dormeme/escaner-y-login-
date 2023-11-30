import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal, Button } from 'react-native';

const Listado = ({ scannedCodes, scannedWarehouses, switchToScanner, addItem, updateItem, deleteItem }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [responsible, setResponsible] = useState(''); // Nuevo estado para el nombre del responsable

  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      addItem({ data: 'Nuevo código', itemName, responsible, scanDateTime: new Date().toLocaleString() });
      setItemName('');
      setResponsible('');
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  };

  const handleUpdateItem = () => {
    if (itemName.trim() !== '' && selectedItem && responsible.trim() !== '') {
      updateItem(selectedItem, itemName, responsible, new Date().toLocaleString());
      setItemName('');
      setResponsible('');
      setModalVisible(false);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setItemName(item.itemName);
    setResponsible(item.responsible || '');
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultContainer}>
      <Text style={styles.resultText}>Código de Bodega: {item.warehouseCode}</Text>
      <Text style={styles.resultText}>Código de Artículo: {item.data}</Text>
      <Text style={styles.resultText}>Nombre del Artículo: {item.itemName}</Text>
      <Text style={styles.resultText}>Responsable: {item.responsible}</Text>
      <Text style={styles.resultText}>{item.scanDateTime}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteItem(item)}
        >
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  // Retorno del componente Listado
  return (
    <View style={styles.container}>
      {/* Encabezado de la lista */}
      <Text style={styles.listHeading}>Lista de códigos escaneados:</Text>
      {/* Lista de códigos de artículo */}
      <Text>Códigos escaneados:</Text>
      <FlatList
        data={scannedCodes}
        keyExtractor={(item) => item.data}
        renderItem={renderItem}
      />
      {/* Botón para agregar un nuevo elemento */}
      <TouchableOpacity style={styles.scanButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.scanButtonText}>Agregar Nuevo</Text>
      </TouchableOpacity>
      {/* Botón para volver a la página de escaneo */}
      <TouchableOpacity style={styles.scanButton} onPress={switchToScanner}>
        <Text style={styles.scanButtonText}>Volver a Escanear</Text>
      </TouchableOpacity>
  
      {/* Modal para agregar o modificar elementos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Cierra el modal al presionar fuera de él
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del artículo */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del artículo"
              onChangeText={(text) => setItemName(text)} // Actualiza el nombre del artículo
              value={itemName} // Valor del campo de entrada
            />
            {/* Campo de entrada para el nombre del responsable */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del responsable"
              onChangeText={(text) => setResponsible(text)} // Actualiza el nombre del responsable
              value={responsible} // Valor del campo de entrada
            />
            {/* Botón para agregar o actualizar el elemento */}
            {selectedItem ? (
              <Button title="Actualizar" onPress={handleUpdateItem} />
            ) : (
              <Button title="Agregar" onPress={handleAddItem} />
            )}
            {/* Botón para cancelar y cerrar el modal */}
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  listHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
  scanButton: {
    marginTop: 20,
    marginBottom: 20, // Agregamos un margen inferior
    backgroundColor: 'cyan',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: 200,
  },
});

export default Listado;
