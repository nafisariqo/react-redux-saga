import axios from "axios";

const YOUR_APP_ID = "809442d7";
const YOUR_APP_KEY = "3729db1600eb3c67f119a325cb6d7a8b";

export const getRecipes = async (query) => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await axios.get(url);
};