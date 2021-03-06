import Spinner from '../Spinner';
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from '../../queries';
import ProjectCard from '../ProjectCard';

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  console.log(data, 'data')

  if(loading) return <Spinner />;
  if(error) return <p>Erro ao carregar as informações</p>

  return (
    <>
      {data.projects.length > 0 ? (
        <div className='row mt-4'>
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project}/>
          ))}
        </div>
      ) : (<p>Sem projectos listados</p>)}
    </>
  )
}

export default Projects;