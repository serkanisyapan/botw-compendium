<script lang="ts">
	import ItemInfo from "$lib/ItemInfo.svelte";
    import type { Data } from "./category.d.ts"

    let { data }: Data = $props();
    let selected_card = $state(0);

    function toggle_card_flip(card_id: number) {
        if (selected_card === 0) {
            selected_card = card_id
        } else if (card_id !== selected_card) {
            selected_card = card_id
        } else {
            selected_card = 0
        }
    }
</script>

<div class="category_page">
    <section class="category_items">
        <!-- giving (id) to the each loop fixes the stale data between page change -->
        {#each data.category_data as {description, category, common_locations, image, name, id, drops, cooking_effect, hearts_recovered, edible, properties} (id)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div onclick={() => toggle_card_flip(id)} class="card_box">
			<div class="card_box_inner {selected_card === id ? "show_back" : ""}">
				<div class="card_box_front card">
                    <span class="item_id">{id}</span>
                    <figure>
                        <img loading="lazy" src="{image}" alt="{name}"/>
                        <figcaption>{name}</figcaption>
                    </figure>
                    <ItemInfo {common_locations} {drops} {category} {cooking_effect} {hearts_recovered} {edible} {properties}/>
				</div>

				<div class="card_box_back">
                    <p class="description_title">DESCRIPTION</p>
                    <p class="description_text">{description}</p>
				</div>
            </div>
        </div>
        {/each}
    </section>
</div>

<style>
    .card_box {
		background-color: transparent;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
        cursor: pointer;
	}
	.card_box_inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}
	.show_back {
		transform: rotateY(180deg);
	}
	.card_box_front, .card_box_back {
		position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f8f5f0;
        border-radius: 16px;
        box-shadow: 0 6px 12px rgba(80, 70, 60, 0.25);
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
        user-select: none;
	}
	.card_box_front {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #d1c7b7; /* Subtle border */
        position: relative;
        
	}
	.card_box_back {
        background-color: white;
		transform: rotateY(180deg)
	}
    .category_items{
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        gap: 2em;
    }
    .item_id {
        position: absolute;
        top: 0.4rem;
        right: 0.4rem;
        padding: 0.1rem 0.4rem;
        font-size: 0.8rem;
    }
    .description_title {
        font-weight: bold;
        font-size: 24px;
    }
    .description_text {
        padding: 15px;
        font-size: 18px
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