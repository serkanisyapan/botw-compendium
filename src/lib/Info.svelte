<script>
   let { info_title, info_data } = $props();
</script>

<article class="info">
    <p class="info_title">{info_title}</p>
    <ul>
        {#each info_data as data}
        <li>{data}</li>
        {:else}
        <b>-</b>
        {/each}
    </ul>
</article>

<style>
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.info_title {
    font-weight: bold;
}
ul {
    list-style-type: none; 
    padding: 0;
    margin: 0;
}
</style>