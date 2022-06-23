import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../../mutations";
import { GET_CLIENTS } from "../../queries";

const AddClientModal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {name, email, phone},
    update(cache, { data: {addClient}}) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {clients: [...clients, addClient]}
      })
    }
  });

  const createClient = (e) => {
    e.preventDefault();
    
    if(name === '' || email === '' || phone === '') {
      return alert('Por favor preencha todos os campos.');
    }

    addClient(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <button 
        type="button"
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className='icon'/>
          <span>Adicionar Cliente</span>
        </div>
      </button>

      <div className="modal fade" id="addClientModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Adicionar Cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={createClient}>
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
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Telefone</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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
    </div>
  )
}

export default AddClientModal;