import { useNavigate, useParams } from "react-router"; // ✅ make sure this is react-router-dom
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
        <div>
        <div>
        {image && <img src={image} alt={name} />}
        <a href={url} target="_blank" rel="noopener noreferrer">Check Them Out!</a>
        </div>
        <div>
        <h1>{name}</h1>
        <p>{description}</p>
        </div>
        </div>
    )
}

export default DetailPage;