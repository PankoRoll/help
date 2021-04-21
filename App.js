import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import React,{useState,useEffect} from 'react';

function App() {

  const baseUrl = 'https://localhost:44334/api/tasks';
  const [data,setData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const [selectedTask, setSelectedTask]=useState({
    id: '',
    name: '',
    done: '',
  })

  const handleChange=e=>{
    const{name,value} = e.target;
    setSelectedTask({
      ...selectedTask,
      [name]: value
    });
    console.log(selectedTask)
  }

  const toggleAddModal = () => {
    setAddModal(!addModal)
  }

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const toggleDoneModal = () => {
    setDoneModal(!doneModal)
  }

  const getRequest = async()=>{
    await axios.get(baseUrl).
    then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const postRequest = async()=>{
    delete selectedTask.id;
    delete selectedTask.done;
    await axios.post(baseUrl,selectedTask).
    then(response=>{
      setData(data.concat(response.data));
      toggleAddModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  const putRequest = async()=>{
    await axios.put(baseUrl+"/"+selectedTask.id, selectedTask).
    then(response=>{
      var res = response.data;
      var aux = data;
      aux.map(task=>{
        if(task.id===selectedTask.id){
          task.name = res.name;
        }
      })
      toggleEditModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  const doneRequest = async()=>{
    selectedTask.done = !selectedTask.done;
    console.log(selectedTask);
    await axios.put(baseUrl+"/"+selectedTask.id, selectedTask).
    then(response=>{
      var res = response.data;
      var aux = data;
      aux.map(task=>{
        if(task.id===selectedTask.id){
          task.done = res.done;
        }
      })
      toggleDoneModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  const deleteRequest = async()=>{
    await axios.delete(baseUrl+"/"+selectedTask.id, selectedTask).
    then(response=>{
      setData(data.filter(task=>task.id!==response.data))
      toggleDeleteModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  const selectTask=(task,action)=>{
    setSelectedTask(task);
    switch(action){
      case "Edit":
        toggleEditModal();
        break;
      case "Delete":
        toggleDeleteModal();
        break;
      case "Complete":
        toggleDoneModal();
        break;
    }
    
  }

  useEffect(()=>{
    getRequest();	
  },[])

  return (
    <div className="App">
      <button onClick={()=>toggleAddModal()} className='mt-3 btn btn-success'>Nueva Tarea</button>
      <table className='m-5'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Completada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(task=>(
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.done?'si':'no'}</td>
              <td>
                <button className='btn btn-success' onClick={()=>selectTask(task,"Complete")}>{task.done?'No completada':'Completada'}</button> {" "}
                <button className='btn btn-primary' onClick={()=>selectTask(task,"Edit")}>Editar</button> {" "}
                <button className='btn btn-danger' onClick={()=>selectTask(task,"Delete")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={addModal}>
        <ModalHeader>Insertar nueva tarea</ModalHeader>
        <ModalBody>
            <div className='form-group'>
              <label>Nombre: </label>
              <br/>
              <input type='text' className='form-control' name='name' onChange={handleChange}/>
            </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>postRequest()}>Agregar</button>
          <button className='btn btn-danger' onClick={()=>toggleAddModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModal}>
        <ModalHeader>Editar tarea</ModalHeader>
        <ModalBody>
            <div className='form-group'>
              <label>Nombre: </label>
              <br/>
              <input type='text' className='form-control' name='name' onChange={handleChange} value={selectedTask&&selectedTask.name}/>
            </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>putRequest()}>Guardar</button>
          <button className='btn btn-danger' onClick={()=>toggleEditModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal}>
          <ModalHeader>¿Está seguro que quiere borrar '{selectedTask&&selectedTask.name}'?</ModalHeader>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=>deleteRequest()}>Eliminar</button>
          <button className='btn btn-secondary' onClick={()=>toggleDeleteModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={doneModal}>
          <ModalHeader>¿Marcar como {selectedTask.done?'no':''} completada?</ModalHeader>
        <ModalFooter>
          <button className='btn btn-success' onClick={()=>doneRequest()}>Aceptar</button>
          <button className='btn btn-danger' onClick={()=>toggleDoneModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
