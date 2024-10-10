import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

 export const fetchImagesWithSearch = async (search, page) =>{
    const params = new URLSearchParams({
        page: page,
        per_page: 12,
        client_id: `T31VWBehIM8_kPudOUvk38a2UoodCWp8aYGGrQqf2zY`,
        query: search,
    })

    const response = await axios.get(`/search/photos?${params}`);
    return {
        results: response.data.results,
        total: response.data.total,
    }
}

