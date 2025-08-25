import {Outlet, Link, useNavigate} from "react-router";
import { supabase } from "../supabaseClient";
import "./Card.css";

function Card({ id, name, url, description, image }) {
      const navigate = useNavigate();
    async function handleDelete() {
      const { error } = await supabase
        .from("creators")
        .delete()
        .eq("id", Number(id));
  
      if (error) {
        setErrorMsg(error.message);
        console.error("Delete Error:", error);
        return;
      }
      navigate("/feed");
    }

  return (
      <li>
    <div className="card">
        <div className="image">
      <img src={image} alt={name} />
      </div>
    <div className="info">
    <Link className="name" to={`/creators/${id}`}><h2>{name}</h2></Link>
    <div className="card-buttons">
    <a href={url} target="_blank" rel="noopener noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-app-white-icon.png"></img></a>
    <Link className="edit" to={`/creators/${id}/edit`}><img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/edit-white-icon.png"/>
    </Link>
    <button type="button" onClick={handleDelete}>
    <img src="https://www.pngkey.com/png/full/904-9042662_nl-fr-white-delete-icon-png.png"/>
    </button>
    </div>
    </div>
    <p>{description}</p>
    <Outlet/>
    </div>
    </li>

  )
}

export default Card;