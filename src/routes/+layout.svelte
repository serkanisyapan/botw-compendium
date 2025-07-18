<script lang="ts">
    import '../reset.css'
    import { page } from "$app/state"
    interface CategoryData {
        category_name: string,
        category_image: string
    }
    let { children } = $props();
    let selected_category = $state(page.url.pathname.split("/")[2] || null)

    const category_data:CategoryData[] = [
        {category_name: "creatures", category_image: "/creatures.png"},
        {category_name: "monsters", category_image: "/monsters.png"},
        {category_name: "materials", category_image: "/materials.png"},
        {category_name: "equipment", category_image: "/equipments.png"},
        {category_name: "treasure", category_image: "/treasure.png"},
    ]
</script>

<div class="layout">

    <aside class="sidebar">
        <a onclick={() => selected_category = null} href="/"><p class="sidebar_title">BoTW: Compendium</p></a>
        <ul class="category_list">
            {#each category_data as {category_image, category_name}}
                <a onclick={() => selected_category = category_name} aria-current={selected_category === category_name} class="category_card" href="/category/{category_name}"><img class="category_image" src="{category_image}" alt="{category_name}"/>{category_name.toUpperCase()}</a>
            {/each}
        </ul>
    </aside>

    <main class="main-content">
        {@render children()}
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
        display: flex;
        text-align: center;
        padding: 24px 60px;
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
        border-radius: 50%;
        width: 40px;
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
</style>