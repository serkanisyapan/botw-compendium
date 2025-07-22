<script lang="ts">
    let { attack, defense } = $props();
</script>

<div>
    <p class="title">PROPERTIES</p>
    <div class="equipment_info">
        <div class="equipment_images">
            <img src="/sword.png" alt="sword_image"/>
            <img src="/shield.png" alt="shield_image"/>
        </div>
        <div class="equipment_values">
            <span>{attack}</span>
            <span>{defense}</span>
        </div>
    </div>
</div>

<style>
    .equipment_info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
    .equipment_images {
        display: flex;
        flex-direction: column;
    }
    .equipment_values {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }
    .title {
        font-weight: bold;
    }
    img {
        width: 36px;
        height: 36px;
    }
</style>
