<script lang="ts">
import { enhance } from "$app/forms";

let gameFranchise = "";
let gameName = "";

</script>

<div>
    <div class="flex-1 flex-col">
        <div class="flex-1 flex-col">
            <p>Game Franchise:</p>
            <input class="rounded border-red-800 border-2" type="text" bind:value={gameFranchise}/>
        </div>
        <div class="flex-1 flex-col">
            <p>Game Name:</p>
            <input class="rounded border-red-800 border-2" type="text" bind:value={gameName} />
        </div>
    </div>

    <form method="POST" use:enhance>
        <button on:click|preventDefault={()=>{ console.log("TOLD TO") }}>SUBMIT</button>
    </form>
</div>
