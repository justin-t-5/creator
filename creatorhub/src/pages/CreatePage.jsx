import {useState} from "react";
import {supabase} from "../supabaseClient";
import {useNavigate} from "react-router";
import "./CreatePage.css";

function CreatePage(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");

    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    
  const NAME_LIMIT = 25;
  const DESC_LIMIT = 200;

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg(null);

        const {data,error} = await supabase.from("creators").insert([{name, description, url, image}])

        if(error){
            setErrorMsg(error.message);
            console.error("Fetch Error:", error);
            return;
        }

        navigate("/feed");
    }

    return(
        <div>
            <h1>Upload Post</h1>
        <form onSubmit = {handleSubmit}>
        <p>Creator's Name: ({name.length}/{NAME_LIMIT})</p>
        <input 
        value = {name}
        onChange={(e) => setName(e.target.value)}
           maxLength={NAME_LIMIT}
        required/>
        <p>Creator Description: ({description.length}/{DESC_LIMIT})</p>
             <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            maxLength={DESC_LIMIT}
          required
          rows={5}
          style={{ resize: "vertical" }}
        />
      
        <p>Creator URL:</p>
        <input
        value = {url}
        onChange= {(e) => setUrl(e.target.value)}
        required/>
      
        <p>Creator Image(URL):</p>
        <input
        value ={image}
        onChange = {(e) => setImage(e.target.value)}/>

        <button type ="submit">
            Upload
        </button>


        </form>
        </div>
    )
}

export default CreatePage;