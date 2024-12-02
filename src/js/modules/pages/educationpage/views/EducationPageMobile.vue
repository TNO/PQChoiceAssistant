<template>
    <div class="w-full relative flex flex-col items-center mt-8">
        <div class="text-2xl font-semibold text-secondary mb-6 text-center">
            <template v-if="language.current == 'EN'">
                Overview of PQC algorithms
            </template>
            <template v-else-if="language.current == 'NL'">
                Overzicht van PQC-algoritmen
            </template>
        </div>

        <div class="w-fit flex justify-center gap-4 mb-4">
            <button @click="handleChangeTab('kem')"
                class="px-3 py-2 leading-none font-semibold rounded cursor-pointer text-base" :class="{
                    'bg-secondary text-white': tab == 'kem',
                    'bg-white text-secondary border border-secondary': tab != 'kem',
                }">
                <template v-if="language.current == 'EN'">
                    Encapsulation
                </template>
                <template v-else-if="language.current == 'NL'">
                    Sleutelinkapseling
                </template>
            </button>
            <button @click="handleChangeTab('dss')"
                class="px-3 py-2 leading-none font-semibold rounded cursor-pointer text-base" :class="{
                    'bg-quadrinary text-white': tab == 'dss',
                    'bg-white text-quadrinary border border-quadrinary': tab != 'dss',
                }">
                <template v-if="language.current == 'EN'">
                    Signatures
                </template>
                <template v-else-if="language.current == 'NL'">
                    Handtekeningen
                </template>
            </button>
        </div>

        <div class="w-fit flex justify-center gap-4 flex-wrap">
            <!-- dropdown (select) between characteristic -->
            <template v-if="data_view == 'table'">
                <select v-model="selected_table_characteristic"
                    class="border border-secondary text-secondary rounded-md px-3 py-1 focus:outline-none">
                    <!-- <option disabled value="">Select Characteristic</option> -->
                    <option v-for="characteristic in selectable_table_characteristics" :key="characteristic"
                        :value="characteristic.value">
                        {{ characteristic.label }}
                    </option>
                </select>
            </template>
            <template v-else-if="data_view == 'graph'">
                <select v-model="selected_graph_characteristic"
                    class="border border-secondary text-secondary rounded-md px-3 py-1 focus:outline-none">
                    <!-- <option disabled value="">Select Characteristic</option> -->
                    <option v-for="(characteristic, i) in selectable_graph_characteristics" :key="characteristic" :value="i">
                        {{ characteristic }}
                    </option>
                </select>
            </template>

            <!-- div with buttons to table view or graph view (small round) -->
            <div class="flex gap-2">
                <button @click="data_view = 'table'" alt-text="Show table"
                    class="w-8 h-8 leading-none font-semibold rounded-full  border cursor-pointer flex items-center justify-center"
                    :class="{
                        'bg-secondary text-white': data_view == 'table',
                        'bg-white text-secondary border border-secondary': data_view != 'table',
                    }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                        <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
                    </svg>
                </button>
                <button @click="data_view = 'graph'" alt-text="Show graphs"
                    class="w-8 h-8 leading-none font-semibold rounded-full  border cursor-pointer flex items-center justify-center"
                    :class="{
                        'bg-secondary text-white': data_view == 'graph',
                        'bg-white text-secondary border border-secondary': data_view != 'graph',
                    }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                        <path
                            d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="mt-8 w-full max-w-[600px]">
            <template v-if="tab == 'kem'">
                <template v-if="data_view == 'table'">
                    <div v-for="algo in kem_algorithms" class="p-4 w-full border-b border-gray-200">
                        <div class="font-bold text-primary text-xl">{{ algo }}</div>
                        <p class="text-gray-600 text-sm">{{
                            kem_education_table?.[selected_table_characteristic]?.content?.[algo]?.[language.current] }}</p>
                    </div>
                </template>
                <template v-else-if="data_view == 'graph'">
                    <div class="w-full p-4">
                        <div class="font-semibold text-lg ">
                            {{ kem_education_graph[selected_graph_characteristic].category[language.current ?? 'EN'] }}
                        </div>
                        <!-- Each of the graphs -->
                        <div v-for="(graph, j) in kem_education_graph[selected_graph_characteristic].content"
                            class="mb-8">
                            <div class="font-semibold text-lg">
                                {{ graph.text[language.current ?? 'EN'] }}
                            </div>
                            <table class="w-full">
                                <tbody>
                                    <tr
                                        v-for="(algo, k) in Object.keys(graph.values)">
                                        <!-- 'Algo' Column -->
                                        <td class="whitespace-nowrap pr-2.5 text-primary font-bold">
                                            {{ algo }}
                                        </td>
                                        <!-- 'Score' Column -->
                                        <td class="whitespace-nowrap pr-2.5 font-thin text-primary text-right">
                                            <div class="w-20 font-mono">
                                            {{
                                                graph.values[algo].score
                                            }}
                                            </div>
                                        </td>
                                        <!-- 'Bar' Column -->
                                        <td class="w-full">
                                            <div class="relative w-full h-5 bg-[#e0e0e0]">
                                                <div class="h-full bg-primary"
                                                    :style="`width: ${graph.values[algo].scaled_percentage_for_log_graph}%;`">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <template v-if="data_view == 'table'">
                    <div v-for="algo in dss_algorithms" class="p-4 w-full  border-b border-gray-200">
                        <div class="font-bold text-primary text-xl">{{ algo }}</div>
                        <p class="text-gray-600 text-sm">
                            {{ dss_education_table?.[selected_table_characteristic]?.content?.[algo]?.[language.current] }}</p>
                    </div>
                </template>
                <template v-else-if="data_view == 'graph'">
                    <div class="w-full p-4">
                        <div class="font-semibold text-lg ">
                            {{ dss_education_graph[selected_graph_characteristic].category[language.current ?? 'EN'] }}
                        </div>
                        <!-- Each of the graphs -->
                        <div v-for="(graph, j) in dss_education_graph[selected_graph_characteristic].content"
                            class="mb-8">
                            <div class="font-semibold text-lg">
                                {{ graph.text[language.current ?? 'EN'] }}
                            </div>
                            <table class="w-full">
                                <tbody>
                                    <tr
                                        v-for="(algo, k) in Object.keys(graph.values)">
                                        <!-- 'Algo' Column -->
                                        <td class="whitespace-nowrap pr-2.5 text-primary font-bold">
                                            {{ algo }}
                                        </td>
                                        <!-- 'Score' Column -->
                                        <td class="whitespace-nowrap pr-2.5 font-thin text-primary text-right">
                                            <div class="w-20 font-mono">
                                            {{
                                                graph.values[algo].score
                                            }}
                                            </div>
                                        </td>
                                        <!-- 'Bar' Column -->
                                        <td class="w-full">
                                            <div class="relative w-full h-5 bg-[#e0e0e0]">
                                                <div class="h-full bg-primary"
                                                    :style="`width: ${graph.values[algo].scaled_percentage_for_log_graph}%;`">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "EducationPageMobile",
    props: {
        kem_education_table: {
            type: Object,
            default: {},
        },
        dss_education_table: {
            type: Object,
            default: {},
        },

        kem_education_graph: {
            type: Object,
            default: {},
        },
        dss_education_graph: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            tab: "kem",
            data_view: "table",

            selected_table_characteristic: 0,
            selected_graph_characteristic: 0,
        }
    },
    inject: ['language'],
    mounted() {
        // set the selected characteristic to the first avaible in the table
        if (this.tab == "kem") {
            this.selected_table_characteristic = 0;
        } else {
            this.selected_table_characteristic = 0;
        }

        // set the selected characteristic to the first avaible in the graph
        if (this.tab == "kem") {
            this.selected_graph_characteristic = 0;
        } else {
            this.selected_graph_characteristic = 0;
        }
    },
    watch: {
        tab() {
            // set the selected characteristic to the first avaible in the table
            if (this.tab == "kem") {
                this.selected_table_characteristic = 0;
            } else {
                this.selected_table_characteristic = 0;
            }

            // set the selected characteristic to the first avaible in the graph
            if (this.tab == "kem") {
                this.selected_graph_characteristic = 0;
            } else {
                this.selected_graph_characteristic = 0;
            }
        }
    },
    methods: {
        get_info_text(algo) {
            // check if all keys exist
            if (Object.keys(this.kem_education_table)?.length === 0
                && Object.keys(this.kem_education_table).includes(this.selected_table_characteristic)
                && Object.keys(this.kem_education_table[this.selected_table_characteristic]).includes(algo)
            ) {
                return this.kem_education_table[this.selected_table_characteristic][algo][this.language.current]
            }
            return "";
        },
        handleChangeTab(tab) {
            this.tab = tab;

            // reset selected characteristic get set to first avaible in the table
            if (this.tab == "kem") {
                this.selected_table_characteristic = Object.keys(this.kem_education_table)[0];
            } else {
                this.selected_table_characteristic = Object.keys(this.dss_education_table)[0];
            }
        }
    },
    computed: {
        kem_algorithms() {
            const algos = [];

            if (!this.kem_education_table || !Object.keys(this.kem_education_table).length) {
                return algos;
            }

            this.kem_education_table.forEach(characteristic_data => {
                Object.keys(characteristic_data.content).forEach(algo => {
                    if (!algos.includes(algo)) {
                        algos.push(algo)
                    }
                });
            });

            return algos;
        },
        dss_algorithms() {
            const algos = [];

            if (!this.dss_education_table || !Object.keys(this.dss_education_table).length) {
                return algos;
            }
            
            this.dss_education_table.forEach(characteristic_data => {
                Object.keys(characteristic_data.content).forEach(algo => {
                    if (!algos.includes(algo)) {
                        algos.push(algo)
                    }
                });
            });

            return algos;
        },

        selectable_table_characteristics() {
            if (this.tab == "kem") {
                return this.kem_education_table?.map((characteristic, i) => {return {value: i, label: characteristic.category[this.language.current ?? 'EN']}});
            } else {
                return this.dss_education_table?.map((characteristic, i) => {return {value: i, label: characteristic.category[this.language.current ?? 'EN']}});
            }
        },
        selectable_graph_characteristics() {
            if (this.tab == "kem") {
                return this.kem_education_graph.map((characteristic, i) => characteristic.category[this.language.current ?? 'EN']);
            } else {
                return this.dss_education_graph.map((characteristic, i) => characteristic.category[this.language.current ?? 'EN']);
            }
        }
    },
}
</script>