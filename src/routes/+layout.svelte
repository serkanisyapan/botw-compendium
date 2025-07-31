<script lang="ts">
    import '../reset.css'
    import '../main_layout.css'
    import { page } from "$app/state"
	import { goto } from '$app/navigation';
    import type { CategoryData as EntryData } from "../routes/category/[slug]/category.d.ts"
	import CardBox from '$lib/CardBox.svelte';

    interface CategoryData {
        category_name: string,
        category_image: string
    }

    let { data, children } = $props();
    let selected_category = $state(page.url.pathname.split("/")[2] || null)
    let search_entry = $state("")
    // using $derived instead of $state fixes re-render issue of search input not refreshing the state 
    let search_entry_error = $derived(data.error || "")
    let search_entry_game = $derived(data.entry_game || "botw")
    let entry_data: EntryData | null = $derived(data.entry_data || null)
    let loading_entry = $state(false)

    const category_data:CategoryData[] = [
        {category_name: "creatures", category_image: "/creatures.png"},
        {category_name: "monsters", category_image: "/monsters.png"},
        {category_name: "materials", category_image: "/materials.png"},
        {category_name: "equipment", category_image: "/equipments.png"},
        {category_name: "treasure", category_image: "/treasure.png"},
    ]

    function handle_search_entry(event: Event) {
        event.preventDefault();
        loading_entry = true
        goto(`/?search_entry=${search_entry}&game=${search_entry_game}`, { replaceState: true }).finally(() => loading_entry = false)
        search_entry = "";
    }

</script>

{#snippet category_list(name: string, game:string, list:CategoryData[])}
    <details name="game_type">
        <summary>{name}</summary>
        <ul class="category_list">
            {#each list as {category_image, category_name}}
                <a 
                onclick={() => {
                    selected_category = category_name
                    entry_data = null
                    search_entry = ""
                }} 
                aria-current={game === page.url.search.split('=')[1] && selected_category === category_name} 
                class="category_card" 
                href="/category/{category_name+"?game="+game}"
                >
                    <img class="category_image" src="{category_image}" alt="{category_name}"/>{category_name.toUpperCase()}
                </a>
            {/each}
        </ul>
    </details>
{/snippet}

<div class="layout">
    <aside class="sidebar">
        <a onclick={() => {
            selected_category = null
            entry_data = null
            search_entry = ""
        }} href="/"
        >
            <p class="sidebar_title">ZELDA: Compendium</p>
        </a>

        {@render category_list("Breath of The Wild", "botw", category_data)}
        {@render category_list("Tears of The Kingdom", "totk", category_data)}

        <form onsubmit={handle_search_entry} class="search_section">
            <div class="input_wrapper">
                <input disabled={loading_entry} id="search_entry" placeholder="search entry" bind:value={search_entry}/>
                <select bind:value={search_entry_game} disabled={loading_entry}>
                    <option value="botw">botw</option>
                    <option value="totk">totk</option>
                </select>
            </div>
            <button type="submit" disabled={loading_entry} name="search_entry">Search</button>
        </form>
        {#if search_entry_error}
            <p style="margin-left: 40px;">{search_entry_error}</p>
        {/if}

    </aside>

    <main class="main-content">
        {#if entry_data?.id}
            <!-- wrapping compenent in key block fixes stale state issue if ids of the items are the same (ex. heart recovered value stays same (id:66)) -->
            {#key entry_data}
                <CardBox 
                    category={entry_data.category} 
                    common_locations={entry_data.common_locations} 
                    cooking_effect={entry_data.cooking_effect}
                    description={entry_data.description} 
                    drops={entry_data.drops} 
                    edible={entry_data.edible}
                    hearts_recovered={entry_data.hearts_recovered}
                    image={entry_data.image}
                    id={entry_data.id}
                    name={entry_data.name}
                    properties={entry_data.properties}
                />
            {/key}
        {:else}
            {@render children()}
        {/if}
    </main>
</div>