import logo from './logo.svg';
import './App.css';
import SearchVideos from './components/SearchVideos/Searchvideos';
import VideoDetail from './components/VideoDetail';
import FavoriteButton from './components/FavoriteButton';

function App() {
  return (
    <div className="App">
        <SearchVideos/>
       {/* <VideoDetail/>
        <FavoriteButton />*/}
    </div>
  );
}

export default App;
