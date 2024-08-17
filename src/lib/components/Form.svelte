<script lang="ts">
import "../../app.css";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { browser } from "$app/environment";
import { enhance } from "$app/forms";
import { LanguageCode } from "$lib/enum/language.enum";
import type{ LocalizedTextType, LocalizedTextSearchParams } from "$lib/types/localizedText.types";

const getLanguageCode = (value: number): string => LanguageCode[value];

const ltSearchParams: LocalizedTextSearchParams = { gameFranchise: "", gameName: "" }
let localizedTexts: Array<LocalizedTextType> = [];
let files: FileList;

$: { 
    for(const [key, value] of Object.entries(ltSearchParams))
    {
        $page.url.searchParams.set(key, value);
        if($page.url.searchParams.get(key) == "") { $page.url.searchParams.delete(key); }
    }
    if(browser) { goto(`?${$page.url.searchParams}`, { keepFocus: true, replaceState: false })};
}; 

const onClick = async () => 
{ 
    const response = await fetch(`/api/translations?${$page.url.searchParams}`);
    localizedTexts = await response.json();
}

const onUpload = async (): Promise<Response> =>
{
    const formData = new FormData();

    for(let fileIndex = 0; fileIndex < files.length; fileIndex++)
    {
        const file = files.item(fileIndex);
        if(file) { formData.append('fileEntries', file); }
    }

    const response = await fetch(`/api/translations?${$page.url.searchParams}`, 
        {
            method: "POST",
            body: formData
        });

    console.log(response);
    return response;
}

</script>

<div class="w-full h-full flex flex-1 flex-col justify-items-center items-center">
    <div>
        <label>
            <h6>Game Franchise</h6>
            <input type="text" class="border-gray-800 rounded-md border-2" bind:value={ltSearchParams.gameFranchise} />
        </label>
        <label>
            <h6>Game Name</h6>
            <input type="text" class="border-gray-800 rounded-md border-2" bind:value={ltSearchParams.gameName} />
        </label>
        <label>
            <h6>Text</h6>
            <textarea class="border-2 rounded-md border-gray-600" />
        </label>
    </div>
    <form on:submit|preventDefault={onUpload}>
        <label>
            <h6>Files:</h6>
            <input bind:files multiple type="file" class="border-2 rounded-sm border-gray-600"/>
        </label>
        <div>
            <!-- Might as well as put the styling to a css folder -->
            <button type="submit" class="border-2 rounded-sm border-gray-600">Upload</button>
        </div>
    </form>
    <button class="border-2 rounded-sm border-gray-600" on:click|preventDefault={onClick}>Submit</button>

    {#if localizedTexts.length > 0}
        <table class="table-auto border-separate border-spacing-2">
            <tr class="border border-solid border-slate-500">
                <th class="border border-solid border-slate-500">Game Franchise</th>
                <th class="border border-solid border-slate-500">Game Name</th>
                <th class="border border-solid border-slate-500">Language</th>
                <th class="border border-solid border-slate-500">Text</th>
            </tr>
            {#each localizedTexts as localizedText}
                <tr>
                    <td class="border border-solid border-slate-500">{localizedText.gameFranchise}</td>
                    <td class="border border-solid border-slate-500">{localizedText.gameName}</td>
                    <td class="border border-solid border-slate-500">{getLanguageCode(localizedText.language)}</td>
                    <td class="border border-solid border-slate-500">{localizedText.text}</td>
                </tr>
            {/each}
        </table>
    {/if}
</div>