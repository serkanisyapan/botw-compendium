<script lang="ts">
	import ItemInfo from "$lib/ItemInfo.svelte";
    import type { Data } from "./category.d.ts"

    let { data }: Data = $props();
    let show_card_description = $state(false);
    let selected_card = $state(0);

    function toggle_card_flip(card_id: number) {
        if (selected_card === 0) {
            selected_card = card_id
            show_card_description = !show_card_description
        } else if (card_id !== selected_card) {
            selected_card = card_id
            show_card_description = true
        } else {
            show_card_description = !show_card_description
        }
    }
</script>

<div class="category_page">
    <section class="category_items">
        <!-- giving (id) to the each loop fixes the stale data between page change -->
        {#each data.category_data as {description, category, common_locations, image, name, id, drops, cooking_effect, hearts_recovered, edible, properties} (id)}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <article
            onclick={() => toggle_card_flip(id)}
            class="category_item {selected_card === id ? "show_description": ""}">
                {#if !show_card_description || selected_card !==id} 
                <span class="item_id">{id}</span>
                <figure>
                    <img loading="lazy" src="{image}" alt="{name}"/>
                    <figcaption>{name}</figcaption>
                </figure>
                <ItemInfo {common_locations} {drops} {category} {cooking_effect} {hearts_recovered} {edible} {properties}/>
                {:else if show_card_description && selected_card===id}
                <div class="item_description">
                    <p class="description_title">DESCRIPTION</p>
                    <p>{description}</p>
                </div>
                {/if}
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
        user-select: none;
        position: relative;
    }
    .item_id {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        padding: 0.1rem 0.4rem;
        font-size: 0.8rem;
    }
    .item_description {
        padding: 20px;
    }
    .description_title {
        font-weight: bold;
        font-size: 18px;
    }
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