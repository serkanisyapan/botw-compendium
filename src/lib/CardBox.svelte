<script lang="ts">
import ItemInfo from "./ItemInfo.svelte";

let { description, category, common_locations, image, name, id, drops, cooking_effect, hearts_recovered, edible, properties } = $props();
let selected_card = $state(0);

function toggle_card_flip(card_id: number) {
    if (selected_card === card_id) {
        selected_card = 0
        return;
    }
    selected_card = card_id
}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={() => toggle_card_flip(id)} class="card_box">
    <div class="card_box_inner {selected_card === id ? "show_back" : ""}">
        <div class="card_box_front card">
            <figure>
                <img loading="lazy" src="{image}" alt="{name}"/>
                <figcaption>{name} ({id})</figcaption>
            </figure>
            <ItemInfo {common_locations} {drops} {category} {cooking_effect} {hearts_recovered} {edible} {properties}/>
        </div>

        <div class="card_box_back">
            <p class="description_title">DESCRIPTION</p>
            <p class="description_text">{description}</p>
        </div>
    </div>
</div>

<style>
    .card_box {
		background-color: transparent;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
        cursor: pointer;
        flex: 0 1 320px;
        max-width: 320px
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
        width: 200px;
    }

    figcaption {
        background-color: #222222de;
        color: #fff;
        font: italic smaller sans-serif;
        padding: 3px;
        text-align: center;
    }
</style>