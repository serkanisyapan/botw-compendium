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
    let search_entry_error = $state(data.error || "")
    let entry_data: EntryData | null = $state(data.entry_data || null)
    let loading_entry = $state(false)

    const category_data:CategoryData[] = [
        {category_name: "creatures", category_image: "/creatures.png"},
        {category_name: "monsters", category_image: "/monsters.png"},
        {category_name: "materials", category_image: "/materials.png"},
        {category_name: "equipment", category_image: "/equipments.png"},
        {category_name: "treasure", category_image: "/treasure.png"},
    ]

    async function fetch_entry(search_entry: string) {
        if (Number(search_entry) === entry_data?.id || search_entry === entry_data?.name) return;
        loading_entry = true;
        let entry_endpoint = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${search_entry}`)
        let { data } = await entry_endpoint.json();

        if (Object.keys(data).length === 0) {
            loading_entry = false;
            search_entry_error = "This entry does not exist."
            let error_timeout = setTimeout(() => {
                search_entry_error = ""
                loading_entry = false;
                clearTimeout(error_timeout);
            }, 2000);
            return;
        }
        entry_data = data
        search_entry_error = ""
        loading_entry = false
    }

    function handle_search_entry(event: Event) {
        event.preventDefault();
        fetch_entry(search_entry);
        goto(`/?search_entry=${search_entry}`, { replaceState: true });
        search_entry = "";
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

        <form onsubmit={handle_search_entry} class="search_section">
            <input disabled={loading_entry} id="search_entry" placeholder="search entry by id or name" bind:value={search_entry}/>
            <button type="submit" disabled={loading_entry} name="search_entry">Search</button>
            {#if search_entry_error}
                <p style="margin-left: 40px;">{search_entry_error}</p>
            {/if}
        </form>
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
