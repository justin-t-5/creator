import {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";
import Card from "../components/Card.jsx";
import "./FeedPage.css";

function FeedPage(){
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetchPosts();
    },[]);
    
    async function fetchPosts(){
        const{data, error} = await supabase
            .from("creators")
            .select("*")
            .order("created_at", {ascending:false});
        if (error){
            setError(error.message);
            console.error("Fetch Error:", error)
            return;
        }
        setPosts(data);
    }

    return(
        <>
        <div className="feedtop">
        <h2>Creator Posts</h2>
        <p>Check out who people are loving right now.   Click their names to find out more about them!</p>
        </div>
        <ul className="posts">
     {posts.map((c) =>(
        <Card key = {c.id} id = {c.id} name ={c.name} url ={c.url} description = {c.description} image = {c.image} />
        ))}
        </ul>
        </>
    )
}

export default FeedPage;