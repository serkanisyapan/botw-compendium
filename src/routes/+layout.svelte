<script lang="ts">
    import '../reset.css'
    import { page } from "$app/state"
    import type { CategoryData as EntryData } from "../routes/category/[slug]/category.d.ts"
	import CardBox from '$lib/CardBox.svelte';

    interface CategoryData {
        category_name: string,
        category_image: string
    }

    let { children } = $props();
    let selected_category = $state(page.url.pathname.split("/")[2] || null)
    let search_entry = $state("") 
    let search_entry_error = $state("")
    let entry_data: EntryData | null = $state(null)

    const category_data:CategoryData[] = [
        {category_name: "creatures", category_image: "/creatures.png"},
        {category_name: "monsters", category_image: "/monsters.png"},
        {category_name: "materials", category_image: "/materials.png"},
        {category_name: "equipment", category_image: "/equipments.png"},
        {category_name: "treasure", category_image: "/treasure.png"},
    ]

    async function fetch_entry(search_entry: string) {
        let entry_endpoint = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${search_entry}`)
        let { data } = await entry_endpoint.json();

        if (Object.keys(data).length === 0) {
            search_entry_error = "This entry does not exist."
            return;
        }
        entry_data = data

    }
</script>

<div class="layout">

    <aside class="sidebar">
        <a onclick={() => {
            selected_category = null
            entry_data = null
            search_entry = ""
        }} href="/"><p class="sidebar_title">BoTW: Compendium</p></a>
        <ul class="category_list">
            {#each category_data as {category_image, category_name}}
                <a 
                onclick={() => {
                    selected_category = category_name
                    entry_data = null
                    search_entry = ""
                }} 
                aria-current={selected_category === category_name} 
                class="category_card" 
                href="/category/{category_name}"
                >
                    <img class="category_image" src="{category_image}" alt="{category_name}"/>{category_name.toUpperCase()}
                </a>
            {/each}
        </ul>

        <section class="search_section">
            <input id="search_entry" name="search_entry" type="text" placeholder="search entry by id or name" bind:value={search_entry}/>
            <button onclick={() => {
                fetch_entry(search_entry)
                search_entry = ""
            }} aria-label="search_entry" name="search_entry" id="search_entry">Search</button>
        </section>
    </aside>

    <main class="main-content">
        {#if entry_data?.id}
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
        {:else}
            {@render children()}
        {/if}
    </main>
</div>

<style>
    .layout {
        display: flex;
        background-color: #e6e0d4;
    }
    .sidebar {
        min-width: 250px;
        flex-shrink: 0;
    }
    .main-content {
        flex: 1;
        text-align: center;
        padding: 24px 55px;
    }
    .sidebar_title {
        margin-left: 40px;
        font-size: 1.5em;
        font-weight: bold;
        color: black;
    }
    .category_list {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        gap:15px;
    }
    .category_card {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .category_image {
        width: 35px;
        height: 35px;
    }
    .search_section {
        margin-top: 30px;
    }
    a {
        text-decoration: none;
        color: black;
    }
    a[aria-current="true"] {
        color: #3c352f;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.2s ease-in-out;
    }
    input {
        box-sizing: border-box;
        margin-left: 40px;
        padding: 5px;
    }
    button {
        padding: 5px;
    }
</style>