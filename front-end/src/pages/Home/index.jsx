import Clients from '../../components/Clients';
import AddClientModal from '../../components/AddClientModal';
import Projects from '../../components/Projects';
import AddProjectModal from '../../components/AddProjectModal';

const Home = () => {
  return (
    <>
      <div className='container'>
        <div className='d-flex gap-3 mb-4'>
          <AddClientModal />
          <AddProjectModal />
        </div>
        <Projects />
        <hr />
        <Clients />
      </div>  
    </>
  )
}

export default Home;