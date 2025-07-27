<script lang="ts">
	import CardBox from "$lib/CardBox.svelte";
    import type { Data } from "./category.d.ts"

    let { data }: Data = $props();

</script>

<div class="category_page">
    <section class="category_items">
        <!-- giving (id) to the each loop fixes the stale data between page change -->
        {#each data.category_data as {description, category, common_locations, image, name, drops, id, cooking_effect, hearts_recovered, edible, properties} (id)}
            <CardBox 
                {category} 
                {common_locations} 
                {cooking_effect} 
                {description} 
                {drops} 
                {edible} 
                {hearts_recovered} 
                {id} 
                {image} 
                {name} 
                {properties}
            />
        {/each}
    </section>
</div>

<style>
    .category_items{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
</style>