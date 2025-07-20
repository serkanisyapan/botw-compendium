<script lang="ts">
	import Info from "./Info.svelte";
	import CookableInfo from "./CookableInfo.svelte";
	import EquipmentInfo from "./EquipmentInfo.svelte";

    let { common_locations, drops, cooking_effect, category, hearts_recovered, edible, properties } = $props();
</script>

<section class="item_info">
    <div class="shared_info">
        <Info info_title="COMMON LOCATIONS" info_data={common_locations}/>
        {#if category === "materials" || edible}
        <CookableInfo info_title="COOKING EFFECT" info_data={cooking_effect}/>
        {:else if category === "equipment"}
        <EquipmentInfo attack={properties.attack} defense={properties.defense} />
        {:else}
        <Info info_title="DROPS" info_data={drops}/>
        {/if}
    </div>
    {#if category === "materials" || edible} 
    <CookableInfo info_title="HEARTS RECOVERED" info_data={hearts_recovered}/>
    {/if}
</section>

<style>
    .item_info {
        display: flex;
        flex-direction: column;
        padding: 15px;
        height: 80%;
        gap: 15px;
        font-size: 16px;
        color: #555;
    }
    .shared_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
    }
</style>