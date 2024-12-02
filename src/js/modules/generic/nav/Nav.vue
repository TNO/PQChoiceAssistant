<template>
    <NavStandard class="hidden platform-viewport-breakpoint:block" 
        :selected_menu_item="selected_menu_item"
        :menu_items="menu_items"

        @handle-click-nav-item="handleClickNavItem"
    />
    <NavMobile class="block platform-viewport-breakpoint:hidden" 
        :selected_menu_item="selected_menu_item"
        :menu_items="menu_items"

        @handle-click-nav-item="handleClickNavItem"
    />
</template>

<script>
    import NavStandard from './NavStandard.vue';
    import NavMobile from './NavMobile.vue';
    
    export default {
        name: 'Nav',
        components: {
            NavStandard,
            NavMobile
        },
        inject: ['language'],
        data(){
            return {
                selected_menu_item: 'home',
                menu_items: [
                    {
                        value: this.$router.resolve({name: 'HomePageRoute'}).href.split('/').pop(),
                        label: 'Home',
                        route_name: 'HomePageRoute'
                    },
                    {
                        value: this.$router.resolve({name: 'KEMPageRoute'}).href.split('/').pop(),
                        label: this.language.current == 'EN' ? 'Encapsulation' : 'Sleutelinkapseling',
                        route_name: 'KEMPageRoute',
                    },
                    {
                        value: this.$router.resolve({name: 'DSSPageRoute'}).href.split('/').pop(),
                        label: this.language.current == 'EN' ? 'Signatures' : 'Handtekeningen',
                        route_name: 'DSSPageRoute'
                    },
                    {
                        value: 'ext:algorithm-overview',
                        // value: this.$router.resolve({name: 'AlgorithmOverviewPageRoute'}).href.split('/').pop(),
                        label: this.language.current == 'EN' ? 'Overview of PQC algorithms' : 'Overzicht van PQC-algoritmen',
                        // route_name: 'AlgorithmOverviewPageRoute'
                        action: () => window.open(this.$router.resolve({name: 'AlgorithmOverviewPageRoute'}).href, '_blank')

                    },
                    {
                        value: this.$router.resolve({name: 'AboutPageRoute'}).href.split('/').pop(),
                        label: this.language.current == 'EN' ? 'About' : 'Over',
                        route_name: 'AboutPageRoute'
                    },
                    {
                        value: 'ext:github',
                        label: 'GitHub',
                        action: () => window.open('https://github.com/basvdl97/PQChoiceAssistant/tree/main', '_blank')
                    }
                ]
            }
        },
        methods:{
            handleClickNavItem(menu_item){
                if(menu_item.value.startsWith('ext:')){
                    menu_item.action();
                } else {
                    this.$router.push({name: menu_item.route_name});
                }
            }
        },
        watch: {
            $route(to, from) {
                this.selected_menu_item = to.path.split('/').pop();
            },
            'language.current': function(newVal, oldVal){
                this.menu_items[1].label = newVal == 'EN' ? 'Encapsulation' : 'Sleutelinkapseling';
                this.menu_items[2].label = newVal == 'EN' ? 'Signatures' : 'Handtekeningen';
                this.menu_items[3].label = newVal == 'EN' ? 'Overview of PQC algorithms' : 'Overzicht van PQC-algoritmen';
                this.menu_items[4].label = newVal == 'EN' ? 'About' : 'Over';
            }
        }
    }
</script>