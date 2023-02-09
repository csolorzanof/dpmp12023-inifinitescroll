import { BASE_URL, API_KEY } from "../config";

export const gamesApi = {
    getTodosLosJuegos: ({pageParam = 1})=>fetch(`${BASE_URL}/games?key=${API_KEY}&page=${pageParam}`)
        .then(res => {            
            return res.json();
        })
    
}