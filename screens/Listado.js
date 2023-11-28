import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal, Button } from 'react-native';

const Listado = ({ scannedCodes, switchToScanner, addItem, updateItem, deleteItem }) => {
  // Declaración de estados locales utilizando el hook useState
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedItem, setSelectedItem] = useState(null); // Estado para almacenar el item seleccionado
  const [itemName, setItemName] = useState(''); // Estado para almacenar el nombre del artículo

  // Función para manejar la adición de un nuevo elemento
  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      addItem({ data: 'Nuevo código', itemName }); // Agrega un nuevo elemento con datos de ejemplo
      setItemName(''); // Limpia el nombre del artículo
      setModalVisible(false); // Oculta el modal
    } else {
      setModalVisible(false); // Si el nombre del artículo está vacío, cierra el modal sin agregar el elemento
    }
  };

  // Función para manejar la actualización de un elemento existente
  const handleUpdateItem = () => {
    if (itemName.trim() !== '' && selectedItem) {
      updateItem(selectedItem, itemName); // Actualiza el nombre del artículo en el elemento seleccionado
      setItemName(''); // Limpia el nombre del artículo
      setModalVisible(false); // Oculta el modal
    }
  };

  // Función para abrir el modal con el elemento seleccionado para editar
  const openModal = (item) => {
    setSelectedItem(item); // Establece el elemento seleccionado
    setItemName(item.itemName); // Establece el nombre del artículo
    setModalVisible(true); // Muestra el modal
  };

  // Función para renderizar cada elemento en la lista
  const renderItem = ({ item }) => (
    <View style={styles.resultContainer}>
      <Text style={styles.resultText}>Código: {item.data}</Text>
      <Text style={styles.resultText}>Nombre del artículo: {item.itemName}</Text>
      {/* Aquí se muestra la fecha y hora del escaneo (scanDateTime) si está disponible */}
      <Text style={styles.resultText}>{item.scanDateTime}</Text>
      {/* Botones para modificar y eliminar el elemento */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)} // Abre el modal para modificar el elemento
        >
          <Text style={styles.actionButtonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteItem(item)} // Elimina el elemento
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
      {/* Lista de elementos escaneados */}
      <FlatList
        data={scannedCodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem} // Renderiza cada elemento en la lista
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
});

export default Listado;
