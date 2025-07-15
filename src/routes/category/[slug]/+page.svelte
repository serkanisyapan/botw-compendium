<script lang="ts">
    interface Data {
        data: PageData
    }

    interface PageData {
        category_data: CategoryData[],
        current_slug: string
    }

    interface CategoryData {
        category: string,
        common_locations: string[],
        description: string,
        image: string,
        name: string,
        dlc: string,
        id: number,
        drops: string[],
        edible?: boolean,
    }
    let { data }: Data = $props();
</script>

<div class="category_page">
    <h1 class="category_title">{data.current_slug.toUpperCase()}</h1>
    <section class="category_items">
        {#each data.category_data as {category, common_locations, description, image, name, dlc, id, drops, edible}}
            <article class="category_item">
                <img class="category_item_image" src="{image}" alt="{name}"/>
                <p>{name}</p>
            </article>
        {/each}
    </section>
</div>

<style>
    .category_items{
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        gap: 3em;
    }
    .category_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
    }
    .category_item_image {
        width: 60%;
    }
</style>