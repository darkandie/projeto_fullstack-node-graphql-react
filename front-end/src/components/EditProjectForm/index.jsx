import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../queries";
import { UPDATE_PROJECT } from "../../mutations";

const EditProjectForm = ({project}) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('')

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {id: project.id, name, description, status},
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id}}],
  });

  const submit = (e) => {
    e.preventDefault();

    if(!name || !description || !status) {
      return alert('Por favor preencha todos os campos');
    }

    updateProject(name, description,status);
  };

  return (
    <div className="mt-5">
      <h3>Editar Projeto</h3>
      <form onSubmit={submit}>
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
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Atualizar
        </button>        
      </form>
    </div>
  )
}

export default EditProjectForm;