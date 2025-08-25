import { useNavigate, useParams,Outlet, Link } from "react-router"; // ✅ make sure this is react-router-dom
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./DetailPage.css";

function DetailPage(){
    const{id} = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);

      useEffect(() => {
    if (id) getPost();
  }, [id]);
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

  async function getPost() {
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .eq("id", Number(id)) // ✅ ensure it's numeric
      .single();

    if (error) {
      setErrorMsg(error.message);
      console.error("Fetch Error:", error);
      return;
    }

    setName(data.name);
    setDescription(data.description);
    setUrl(data.url);
    setImage(data.image);
  }

    return(
        <div className="detail-container">
        <div className="detail1">
        {image && <img src={image} alt={name} />}
        </div>
        <div className="detail2">
          <div className="detail-title">
        <h1>{name}</h1>
            <div className="detail-buttons">
    <a href={url} target="_blank" rel="noopener noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-app-white-icon.png"></img></a>
    <Link className="edit" to={`/creators/${id}/edit`}><img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/edit-white-icon.png"/>
    </Link>
    <button type="button" onClick={handleDelete}>
    <img src="https://www.pngkey.com/png/full/904-9042662_nl-fr-white-delete-icon-png.png"/>
    </button>
    </div>
    </div>
        <p>{description}</p>
        </div>
        <Outlet/>
        </div>
      
    )
}

export default DetailPage;