/** @type {import('./$types').RequestHandler} */
import { json } from '@sveltejs/kit';

export async function GET()
{
    const results = await fetch('http://localhost:5162/api/Translations');
    console.log(results);
    return results;
}