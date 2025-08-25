import{Outlet, Link} from 'react-router';
import './HomePage.css';
function HomePage(){
    return(
        <div className="home-container">
            <p className="heading">creatorverse</p>
            <p>Share your favorite creators and influencers on here and let everyone know who to be on the lookout for!</p>
            <div className="home-buttons">
            <Link to="/feed">Posted Creators</Link>
            <Link to="/post">Upload A Post</Link>
            <Outlet/>
            </div>
        </div>
    )
}

export default HomePage;