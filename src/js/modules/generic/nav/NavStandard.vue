<template>
    <div class="relative w-full">
        <div class="w-full bg-primary px-8 py-4 flex justify-between items-end">
            <!-- Logo img @/assets/nav-icon.png -->
            <div class="absolute w-24 h-24 bg-white rounded-full border-[3px] border-white top-5">
                <img src="@/assets/nav-icon.png" alt="Logo" />
            </div>

            <!-- title -->
            <div class="ml-28 w-fit">
                <button @click="$router.push({ name: 'HomePageRoute' })" class="text-white">
                    <h1 class="text-2xl font-bold">PQChoiceAssistant <span class="text-xs">{{$version}}</span></h1>
                </button>
            </div>

            <!-- menu items -->
            <div class="flex w-fit gap-6 mr-2">
                <div v-for="menu_item in menu_items" :key="menu_item.value">
                    <button @click="handleClickNavItem(menu_item)" class="text-white flex items-center gap-2">
                        <h2 :class="{'font-bold underline': selected_menu_item === menu_item.value}">
                            {{ menu_item.label }}
                        </h2>
                        <svg v-if="menu_item.value.includes('github')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                        </svg>
                    </button>
                </div>

                <!-- language buttons -->
                <div class="flex  gap-1">
                    <button @click="this.language.current = 'NL'" class="text-white p-1" :class="{'border rounded-full border-white': this.language.current === 'NL'}">
                        <img src="@/assets/dutch-flag.png" alt="NL" class="w-4 h-4" />
                    </button>
                    <button @click="this.language.current = 'EN'" class="text-white p-1" :class="{'border rounded-full border-white': this.language.current === 'EN'}">
                        <img src="@/assets/english-flag.png" alt="EN" class="w-4 h-4" />
                    </button>
                </div>
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
    emits: ['handle-click-nav-item'],
    methods: {
        handleClickNavItem(menu_item) {
            this.$emit('handle-click-nav-item', menu_item);
        },
    },
    inject: ['language'],
}
</script>
