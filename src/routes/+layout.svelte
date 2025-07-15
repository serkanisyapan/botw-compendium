<script lang="ts">
    import '../main.css'
    interface CategoryData {
        category_name: string,
        category_image: string
    }
    let { children } = $props();
    const category_data:CategoryData[] = [
        {category_name: "creatures", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/horse/image"},
        {category_name: "equipments", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/master_sword/image"},
        {category_name: "materials", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/apple/image"},
        {category_name: "monsters", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/chuchu/image"},
        {category_name: "treasure", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/treasure_chest/image"},
    ]
</script>

<div class="layout">

    <aside class="category_sidebar">
        <a href="/"><p class="sidebar_title">BoTW: Compendium</p></a>
        <ul class="category_list">
            {#each category_data as {category_image, category_name}}
                <a class="category_card" href="/category/{category_name}"><img class="category_image" src="{category_image}" alt="{category_name}"/>{category_name.toUpperCase()}</a>
            {/each}
        </ul>
    </aside>

    <main>
        {@render children()}
    </main>
</div>

<style>
    .layout {
        height: 100vh;
        display: grid;
        gap: 5em;
        grid-template-columns: 16em 1fr;
    }
    .sidebar_title {
        margin-left: 40px;
        font-size: 1.5em;
        font-weight: bold;
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
    }
</style>