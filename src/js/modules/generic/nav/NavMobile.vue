<template>
    <div class="relative w-full">
        <!-- nav bar -->
        <div class="w-full bg-primary px-2 flex h-12 items-center">
            <!-- Logo img @/assets/nav-icon.png -->
            <div class="w-10 min-w-10 min-h-10 h-10 mx-2 ">
                <img src="@/assets/nav-icon.png" alt="Logo" />
            </div>

            <!-- title -->
            <div class=" w-fit">
                <button @click="$router.push({ name: 'HomePageRoute' })" class="ml-2 text-white text-xl font-semibold">
                    PQChoiceAssistant <span class="text-xs">{{$version}}</span>
                </button>
            </div>

            <!-- hamburger -->
            <div ref="myElement2" @click="is_menu_open = !is_menu_open"
                class="ml-auto flex justify-end text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </div>
        </div>

        <!-- sliding menu -->
        <div ref="myElement"
            class="fixed z-10 bg-blue-50 w-5/6 max-w-[300px] h-[calc(100vh_-_3rem)] right-0 top-12 transition-transform duration-500 ease-in-out"
            :class="{
                'translate-x-[100%]': !is_menu_open,
                'translate-x-[0%]': is_menu_open
            }">
            <div v-for="menu_item in menu_items" :key="menu_item.value">
                <button @click="handleClickNavItem(menu_item)"
                    class="w-full px-4 py-4 flex items-center gap-2 transition-colors duration-100 ease-in-out" :class="{
                        'bg-primary text-white': selected_menu_item == menu_item.value,
                        'hover:bg-gray-300 hover:text-primary': selected_menu_item !== menu_item.value
                    }">
                    {{ menu_item.label }}
                    
                    <svg v-if="menu_item.value.includes('github')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </button>
            </div>

            <!-- language buttons -->
            <div class="flex w-full justify-center gap-1 mt-4">
                <button @click="this.language.current = 'NL'" class="text-white p-1" :class="{'border rounded-full border-primary': this.language.current === 'NL'}">
                    <img src="@/assets/dutch-flag.png" alt="NL" class="w-5 h-5" />
                </button>
                <button @click="this.language.current = 'EN'" class="text-white p-1" :class="{'border rounded-full border-primary': this.language.current === 'EN'}">
                    <img src="@/assets/english-flag.png" alt="EN" class="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        menu_items: {
            type: Array,
            required: true,
        },
        selected_menu_item: {
            type: String,
            required: true,
        },
    },
    inject: ['language'],
    emits: ['handle-click-nav-item'],
    data() {
        return {
            is_menu_open: false
        }
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
        // this.toggleFullscreen();
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {

        toggleFullscreen() {
            const elem = document.documentElement; // The whole page

            if (!document.fullscreenElement) {
                // Request fullscreen
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { // Firefox
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { // IE/Edge
                    elem.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { // Firefox
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { // IE/Edge
                    document.msExitFullscreen();
                }
            }
        },
        handleClickNavItem(menu_item) {
            this.$emit('handle-click-nav-item', menu_item);
            this.is_menu_open = false;
        },
        handleClickOutside(event) {
            if (this.$refs?.myElement2?.contains(event.target)) { return; };

            const element = this.$refs.myElement;
            if (element && !element.contains(event.target)) {
                this.is_menu_open = false;
            }
        }
    }
}
</script>
