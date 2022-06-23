import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_CLIENTS } from "../../queries";
import { ADD_PROJECT } from "../../mutations";

const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {name, description, clientId, status},
    update(cache, {data: {addProject}}) {
      const {projects} = cache.readQuery({query: GET_PROJECTS});
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {projects: [...projects, addProject]}
      })
    }
  });

  const {loading, error, data} = useQuery(GET_CLIENTS);

  const createProject = (e) => {
    e.preventDefault();
    
    if(name === '' || description === '' || status === '') {
      return alert('Por favor preencha todos os campos.');
    }

    addProject(name, description, clientId, status);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if(loading) return null;
  if(error) return <p>Erro ao carregar os dados.</p>

  return (
    <div>
      {!loading && !error && (
      <>
        <button 
          type="button"
          className="btn btn-secondary" 
          data-bs-toggle="modal" 
          data-bs-target="#addProjectModal"
        >
          <div className="d-flex align-items-center">
            <FaList className='icon'/>
            <span>Adicionar Projeto</span>
          </div>
        </button>

        <div className="modal fade" id="addProjectModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Adicionar Projeto</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={createProject}>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea 
                      className="form-control" 
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      id="status" 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="new">Não Iniciado</option>
                      <option value="progress">Em Progresso</option>
                      <option value="Completed">Finalizado</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select 
                      id="clientId" 
                      className="form-select"
                      value={clientId}
                      onChange={(e)=> setClientId(e.target.value)}
                    >
                      <option value="">Selecione o cliente</option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Adicionar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default AddProjectModal;