<div class="modul-background">
    <div class="modul">
        <slot />
    </div>
</div>

<style>
    .modul-background {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        display: grid;
        place-items: center;
        align-items: center;
        z-index: 100;
    }
    .modul {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 2em;
    }
</style>