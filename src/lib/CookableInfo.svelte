<script lang="ts"> 
   let { info_title, info_data } = $props();
   let full_heart_count = Math.floor(info_data)
   let check_half_heart = info_data - full_heart_count;
</script>

<article>
    <p class="info_title">{info_title}</p>
    {#if info_title === "HEARTS RECOVERED"}
        <div class="heart_container">
            {#if info_data === 0}
                <img src="/empty_heart.png" alt="Empty Heart" />
            {:else}
                {#if full_heart_count > 0}
                    {#each Array(full_heart_count) as _}
                        <img src="/heart.png" alt="Full Heart" />
                    {/each}
                {/if}
                {#if check_half_heart === 0.5}
                    <img src="/half_heart.png" alt="Half Heart" />
                {/if}
            {/if}
        </div>
    {:else}
    <p>{info_data}</p>
    {/if}
</article>

<style>
    .info_title {
        font-weight: bold;
    }
    .heart_container {
        display: flex;
        justify-content: center;
    }
    img {
        width: 20px;
        height: 20px;
    }
</style>