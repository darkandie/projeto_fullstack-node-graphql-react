import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries";
import ClientInfo from "../../components/ClientInfo";
import DeleteProjectButton from "../../components/DeleteProjectButton";
import EditProjectForm from "../../components/EditProjectForm";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {id}
  });

  if(loading) return <Spinner />;
  if(error) return <p>Erro ao carregar os dados</p>;

  return (
    <div>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Voltar</Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Status do projeto</h5>
          <p className="lead">{data.project.status}</p>
          <ClientInfo client={data.project.client}/>

          <DeleteProjectButton projectId={data.project.id}/>

          <EditProjectForm project={data.project} />
        </div>
      )}
    </div>
  )
}

export default Project;