import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries";

import ClientRow from "../ClientRow";
import Spinner from "../Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if(loading) return <Spinner />
  if(error) return <p>Erro ao carregar os dados</p>

  return (
    <div>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Contato</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map(client => (
               <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Clients;