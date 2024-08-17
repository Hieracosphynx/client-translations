import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ url } : RequestEvent)
{
    return await fetch(`http://localhost:5162/api/Translations/search?${url.searchParams}`);
}

export async function POST({ url, request } : RequestEvent): Promise<Response>
{
    const formData = await request.formData();

    //fileEntries.forEach()

    const response = await fetch(`http://localhost:5162/api/Translations/upload?${url.searchParams}`, {
        method: "POST",
        body: formData
    });

    return new Response();
    //return new Response(JSON.stringify(response));
}
