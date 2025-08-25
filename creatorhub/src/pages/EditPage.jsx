import { useNavigate, useParams } from "react-router"; // ✅ make sure this is react-router-dom
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./EditPage.css";

function EditPage() {
  const { id } = useParams();
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

  async function handleSubmit(e) {
    e.preventDefault(); // ✅ prevent page reload
    const { error } = await supabase
      .from("creators")
      .update({ name, description, url, image })
      .eq("id", Number(id));

    if (error) {
      setErrorMsg(error.message);
      console.error("Update Error:", error);
      return;
    }
    navigate("/feed");
  }

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
    <div>
      <h1>Edit Post</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <p>Creator's Name:</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <p>Creator Description:</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          style={{ resize: "vertical" }}
        />

        <p>Creator URL:</p>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <p>Creator Image (URL):</p>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Upload</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default EditPage;
