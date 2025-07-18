<script lang="ts">
	import Info from "./Info.svelte";
	import MaterialsInfo from "./MaterialsInfo.svelte";

    let { common_locations, drops, cooking_effect, category } = $props();
</script>

<section class="item_info">
    <Info info_title="COMMON LOCATIONS" info_data={common_locations}/>
    {#if category === "materials"}
    <MaterialsInfo info_title="COOKING EFFECT" info_data={cooking_effect}/>
    {:else}
    <Info info_title="DROPS" info_data={drops}/>
    {/if}
</section>

<style>
    .item_info {
        display: flex;
        padding: 15px;
        height: 80%;
        gap: 30px;
        font-size: 18px;
        color: #555;
    }
</style>