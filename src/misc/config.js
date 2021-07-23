const API_BASE='https://api.tvmaze.com';

export async function apiGet(queryString)
{
    const response=await fetch(`${API_BASE}${queryString}`).then(res=>res.json())
    return response
}