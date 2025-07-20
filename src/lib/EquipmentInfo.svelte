<script lang="ts">
    let { attack, defense } = $props();
</script>

<div class="equipment_info">
    <p>PROPERTIES</p>
    <span><img src="/sword.png" alt="sword_image"/>{attack}</span>
    <span><img src="/shield.png" alt="shield_image"/>{defense}</span>
</div>

<style>
    .equipment_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    p {
        font-weight: bold;
    }
    span {
        display: flex;
        align-items: center;
    }
    img {
        width: 36px;
        height: 36px;
    }
</style>
