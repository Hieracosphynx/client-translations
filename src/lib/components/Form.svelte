<script lang="ts">
import "../../app.css";
import { enhance } from "$app/forms";

type LocalizedText =
{
    id: string;
    gameFranchise: string;
    gameName: string;
    language: number;
    text: string;
}

let gameFranchise = "";
let gameName = "";
let localizedTexts: Array<LocalizedText> = [];

const onClick = async () => 
{ 
    const response = await fetch('/api/translations');
    localizedTexts = await response.json();
}

</script>

<div class="w-full h-full flex flex-1 flex-col justify-items-center items-center">
    <div>
        <label>
            <h6>Game Franchise</h6>
            <input type="text" class="border-gray-800 rounded-md border-2" bind:value={gameFranchise} />
        </label>
        <label>
            <h6>Game Name</h6>
            <input type="text" class="border-gray-800 rounded-md border-2" bind:value={gameName} />
        </label>
        <label>
            <h6>Text</h6>
            <textarea class="border-2 rounded-md border-gray-600" />
        </label>
    </div>
    <form method="POST" use:enhance>
        <label>
            <h6>Files:</h6>
            <input type="file" class="border-2 rounded-sm border-gray-600" />
        </label>
        <div>
            <!-- Might as well as put the styling to a css folder -->
            <button type="submit" class="border-2 rounded-sm border-gray-600" on:click|preventDefault={onClick}>Submit</button>
            <button type="submit" class="border-2 rounded-sm border-gray-600" on:click|preventDefault>Upload</button>
        </div>
    </form>
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
                    <td class="border border-solid border-slate-500">{localizedText.language}</td>
                    <td class="border border-solid border-slate-500">{localizedText.text}</td>
                </tr>
            {/each}
        </table>
    {/if}
</div>