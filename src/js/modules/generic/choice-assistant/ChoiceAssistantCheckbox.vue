<template>
    <div 
        class="w-5 h-5 min-w-5 min-h-5 max-w-5 max-h-5 border bg-white flex items-center justify-center cursor-pointer" 
        :class="{
            ' border-secondary': checked,
            ' border-gray-400': !checked,
        }"
        
        @click="handleClick"
    >
        <!-- inner circle that indicates selection -->
        <div v-if="checked" class="bg-secondary w-3 h-3"/>
    </div>
</template>

<script>
    export default {
        props: {
            checked: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['handle-click'],
        methods: {
            handleClick(){
                this.$emit('handle-click')
            }
        }
    }
</script>