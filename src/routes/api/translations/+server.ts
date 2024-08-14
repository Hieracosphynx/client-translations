import type { ActionResult, RequestEvent } from '@sveltejs/kit';

export async function GET()
{
    const results = await fetch('http://localhost:5162/api/Translations');
    console.log(results);
    return results;
}

export async function POST(event: RequestEvent<{}, string | null>): Promise<Response>
{
    const body = await event.request.formData();
    const params = event.params;
    const files = body.get('files') as File;

    console.log({...params});

    const response = { type: "success" }/*await fetch('http://localhost:5162/api/Translations', {
        method: "POST",
        body
    })*/

    return new Response(JSON.stringify(response));
}

//export const actions = {
    //upload: async ({ cookies, request } : Actions) => 
    //{
        //console.log("No Idea");
    //}
//}
