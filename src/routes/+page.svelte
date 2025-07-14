<script lang="ts">
    interface CategoryData {
        category_name: string,
        category_image: string
    }
    const category_data:CategoryData[] = [
        {category_name: "creatures", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/horse/image"},
        {category_name: "equipment", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/master_sword/image"},
        {category_name: "materials", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/apple/image"},
        {category_name: "monsters", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/chuchu/image"},
        {category_name: "treasure", category_image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/treasure_chest/image"},
    ]
</script>

<h1 class="compendium_title">The Legend of Zelda: Breath of the Wild Compendium</h1>
<ul class="category_list">
    {#each category_data as {category_image, category_name}}
        <a class="category_card" href="/category/{category_name}"><li><img class="category_image" src="{category_image}" alt="{category_name}"/></li>{category_name}</a>
    {/each}
</ul>

<style>
    .category_list {
        display: flex;
        justify-content: space-evenly;
        list-style-type: none;
    }
    .category_card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        font-size:24px
    }
    .category_image {
        border-radius: 50%;
        width: 150px;
    }
    .compendium_title {
        padding: 10px;
    }
</style>