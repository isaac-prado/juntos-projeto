import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",   // o ideal seria colocar no .ENN -> porém o foco é mais na usabilidade do que na segurança
});