
import Sidebar from '../components/Sidebar';
import PublicPhotos from '../components/PublicPhotos';
import NavBar from '../components/NavBar';


const HomePage = () => {
    

    return (
        <div>
            <NavBar />
            <div className="flex">
                <Sidebar />
                <PublicPhotos />
            </div>
        </div>
    );
};

export default HomePage;
