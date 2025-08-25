import { useRoutes, Link } from "react-router";
import FeedPage from "./pages/FeedPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import './App.css';

export default function App() {
    const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/feed", element: <FeedPage /> },
    { path: "/post", element: <CreatePage /> },
    { path: "/creators/:id", element: <DetailPage /> },
    { path: "/creators/:id/edit", element: <EditPage /> },
  ];

  const element = useRoutes(routes);

  return (
    <div className="header">
      <nav>
        <h3>creatorverse</h3>
        <div>
       <Link to="/">Home</Link>  <Link to="/feed">Feed</Link> <Link to="/post">Post</Link>
       </div>
      </nav>
      {element}
    </div>
  );
}
