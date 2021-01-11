<template>
    <div id="Frame">
        <div id="Inf">
            <slot name="inf"></slot>
        </div>
        <div id="other">
            <slot name="other"></slot>
        </div>
        <div id="Button">
            <slot name="button"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Frame"
    }
</script>

<style scoped>
#Button{
    height: 49px;
}
#other{
    height: 49px;
}
</style>