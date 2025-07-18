<script lang="ts">
	import ItemInfo from "$lib/ItemInfo.svelte";
    import type { Data } from "./category.d.ts"
    let { data }: Data = $props();
</script>

<div class="category_page">
    <section class="category_items">
        {#each data.category_data as {category, common_locations, image, name, id, drops, cooking_effect}}
            <article class="category_item">
                <span class="item_id">{id}</span>
                <figure>
                    <img loading="lazy" src="{image}" alt="{name}"/>
                    <figcaption>{name}</figcaption>
                </figure>
                <ItemInfo {common_locations} {drops} {category} {cooking_effect}/>
            </article>
        {/each}
    </section>
</div>

<style>
    .category_items{
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        gap: 2em;
    }
    .category_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f8f5f0;
        border-radius: 16px;
        box-shadow: 0 6px 12px rgba(80, 70, 60, 0.25);
        cursor: pointer;
        border: 1px solid #d1c7b7; /* Subtle border */
        position: relative;
    }
    .category_item:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 20px rgba(60, 50, 40, 0.4);
    }
    .item_id {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        padding: 0.1rem 0.4rem;
        font-size: 0.8rem;
    }
    /*.item_description {
        width: 70%;
        height: 80%;
        font-size: 18px;
        color: #555;
    }*/
    figure {
        display: flex;
        flex-flow: column;
    }
    img {
        width: 250px;
    }
    figcaption {
        background-color: #222222de;
        color: #fff;
        font: italic smaller sans-serif;
        padding: 3px;
        text-align: center;
    }
</style>