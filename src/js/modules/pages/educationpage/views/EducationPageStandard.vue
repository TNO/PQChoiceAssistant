<template>
    <div class="w-full relative flex justify-center mt-8">
        <div class="w-full max-w-7xl">
            <!-- Top Row -->
            <div class="w-full flex justify-between items-end">
                <!-- buttons left -->
                <div class="flex gap-4 items-center">
                    <button @click="tab = 'kem'"
                        class="px-4 py-3 leading-none font-semibold rounded-md cursor-pointer text-xl" :class="{
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
                    <button @click="tab = 'dss'"
                        class="px-4 py-3 leading-none font-semibold rounded-md cursor-pointer text-xl" :class="{
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

                <!-- data_view type button right -->
                <div class="flex gap-4 items-center">
                    <button @click="changeView('table')" alt-text="Show table"
                        class="w-10 h-10 leading-none font-semibold rounded-md cursor-pointer flex items-center justify-center"
                        :class="{
                            'bg-primary text-white': data_view == 'table',
                            'bg-white text-primary border border-primary': data_view != 'table',
                        }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-list-ol" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                            <path
                                d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                        </svg>
                    </button>
                    <button @click="changeView('graph')" alt-text="Show graphs"
                        class="w-10 h-10  leading-none font-semibold rounded-md cursor-pointer flex items-center justify-center"
                        :class="{
                            'bg-primary text-white': data_view == 'graph',
                            'bg-white text-primary border border-primary': data_view != 'graph',
                        }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-bar-graph-fill" viewBox="0 0 16 16">
                            <path
                                d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                        </svg>
                    </button>
                </div>
            </div><!-- Introduction descriptions -->
            <div class="mt-8">
                <template v-if="data_view == 'table'">
                    <template v-if="language.current == 'EN'">
                        <div class="font-semibold text-lg mb-2">Information table</div>
                        <p class="text-base leading-relaxed">
                            See below a table with general information on the available PQC algorithms.
                            This page can be used in combination with the questionnaires to gain greater insight into
                            the different PQC options.
                            You can use the buttons at the top to switch between encryption (encapsulation) algorithms
                            and signature algorithms,
                            and also to switch to a visual comparison between the algorithms.
                        </p>
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        <div class="font-semibold text-lg mb-2">Informatietabel</div>
                        <p class="text-base leading-relaxed">
                            Zie hier een tabel met algemene informatie over de beschikbare PQC-algoritmen.
                            Deze pagina kan samen met de vragenlijsten gebruikt worden om meer inzicht te krijgen in de
                            verschillende PQC-opties.
                            U kunt de knoppen bovenaan gebruiken om te wisselen tussen encryptie- en
                            handtekeningalgoritmen,
                            en ook om te wisselen naar een visuele vergelijking tussen de algoritmen.
                        </p>
                    </template>
                </template>
                <template v-else-if="data_view == 'graph'">
                    <template v-if="language.current == 'EN'">
                        <div class="font-semibold text-lg mb-2">Information graphs</div>
                        <p class="text-base leading-relaxed">
                            See below various graphs with some data about the available PQC algorithms.
                            This page is meant to give insight into some of the more objective characteristics, by
                            comparing benchmark values.
                            You can use the buttons at the top to switch between encryption (encapsulation) algorithms
                            and signature algorithms,
                            and also to switch to a table with general information on the algorithms.
                        </p>
                        <br>
                        <p class="text-base leading-relaxed">
                            <span class="font-semibold">Note:</span> The graphs all use a logarithmic scale. This gives
                            a better overview, but might distort the values to those not used to this scale.
                            The numbers next to each graph are the actual values for reference.
                            The quantities measured are performance in cycles and size in bytes — both cases where lower
                            values are better.
                            All values are based on the NIST content versions of the algorithms.
                        </p>
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        <div class="font-semibold text-lg mb-2">Informatiegrafieken</div>
                        <p class="text-base leading-relaxed">
                            Zie hier verschillende grafieken met data over de beschikbare PQC-algoritmen.
                            Deze pagina is bedoeld om u inzicht te geven in enkele objectieve karacteristieken, door
                            benchmarkwaardes te vergelijken.
                            U kunt de knoppen bovenaan gebruiken om te wisselen tussen encryptie- en
                            handtekeningalgoritmen,
                            en ook om te wisselen naar een tabel met algemene informatie over de algoritmen.
                        </p>
                        <br>
                        <p class="text-base leading-relaxed">
                            <span class="font-semibold">Let op:</span> De grafieken gebruiken allemaal een logaritmische
                            schaal. Dit geeft een beter overzicht, maar kan een verkeerd beeld geven aan mensen die niet
                            gewend zijn aan deze schaal.
                            De getallen naast elke grafiek zijn de echte waarden ter referentie.
                            De gemeten grootheden zijn performance in cycles en grootte in bytes — in beide gevallen
                            betekent een lagere waarde een beter resultaat.
                            Alle waarden zijn gebaseerd op de versies van de algoritmes die vallen onder NIST niveau 5.
                        </p>
                    </template>
                </template>
            </div>


            <!-- kem tab -->
            <template v-if="tab == 'kem'">
                <!-- table -->
                <table v-if="data_view == 'table'" class="w-full mt-16">
                    <thead>
                        <tr class="text-primary font-bold text-lg">
                            <th class="py-4">
                                <template v-if="language.current == 'EN'">
                                    Characteristic
                                </template>
                                <template v-else-if="language.current == 'NL'">
                                    Kenmerk
                                </template>
                            </th>
                            <th v-for="algo in kem_algorithms"
                                class="py-4 text-center border-l border-l-1 border-primary">
                                {{ algo }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(characteristic_data, i) in kem_education_table" class="text-secondary" :class="{
                            'bg-tertiary': i % 2 == 0,
                            'bg-white': i % 2 != 0,
                        }">
                            <td>
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-10 h-10 min-h-10 min-w-10 bg-secondary rounded-full text-white flex leading-none items-center justify-center font-bold text-lg">
                                        {{ i + 1 }}
                                    </div>
                                    <div class="font-semibold text-lg leading-none pr-2">
                                        {{ characteristic_data.category[this.language?.current ?? 'EN'] }}
                                    </div>
                                </div>
                            </td>
                            <td v-for="(algo, j) in kem_algorithms"
                                class="text-center leading-snug text-black border-l border-l-1 border-primary px-2 py-2">
                                {{ kem_education_table[i].content[algo][this.language?.current ?? 'EN'] }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- charts/graphs -->
                <div v-else-if="data_view == 'graph'" class="w-full mt-16 flex justify-center gap-16">
                    <!-- graph column per characteristic -->
                    <div v-for="(characteristic, i) in kem_education_graph" class="w-[500px]">
                        <div class="font-semibold text-lg ">
                            {{ characteristic.category[this.language?.current ?? 'EN'] }}
                        </div>
                        <!-- Each of the graphs -->
                        <div v-for="(graph, j) in characteristic['content']"
                            class="mb-8">
                            <div class="font-semibold text-lg">
                                {{ graph.text[this.language?.current ?? 'EN'] }}
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
                                            <div class=" w-20 font-mono">
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
                </div>
            </template>
            <!-- dss tag -->
            <template v-else-if="tab == 'dss'">
                <!-- table -->
                <table v-if="data_view == 'table'" class="w-full mt-16">
                    <thead>
                        <tr class="text-primary font-bold text-lg">
                            <th class="py-4">
                                <template v-if="language.current == 'EN'">
                                    Characteristic
                                </template>
                                <template v-else-if="language.current == 'NL'">
                                    Kenmerk
                                </template>
                            </th>
                            <th v-for="algo in dss_algorithms"
                                class="py-4 text-center border-l border-l-1 border-primary">
                                {{ algo }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(characteristic_data, i) in dss_education_table" class="text-secondary" :class="{
                            'bg-tertiary': i % 2 == 0,
                            'bg-white': i % 2 != 0,
                        }">
                            <td>
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-10 h-10 min-h-10 min-w-10 bg-secondary rounded-full text-white flex leading-none items-center justify-center font-bold text-lg">
                                        {{ i + 1 }}
                                    </div>
                                    <div class="font-semibold text-lg leading-none pr-2">
                                        {{ characteristic_data.category[this.language?.current ?? 'EN'] }}
                                    </div>
                                </div>
                            </td>
                            <td v-for="(algo, j) in dss_algorithms"
                                class="text-center leading-snug text-black border-l border-l-1 border-primary px-2 py-2">
                                {{ dss_education_table[i].content[algo][this.language?.current ?? 'EN'] }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- charts/graphs -->
                <div v-else-if="data_view == 'graph'" class="w-full mt-16 flex justify-center gap-16">
                    <!-- graph column per characteristic -->
                    <div v-for="(characteristic, i) in dss_education_graph" class="w-[500px]">
                        <div class="font-semibold text-lg ">
                            {{ characteristic.category[this.language?.current ?? 'EN'] }}
                        </div>
                        <!-- Each of the graphs -->
                        <div v-for="(graph, j) in characteristic['content']"
                            class="mb-8">
                            <div class="font-semibold text-lg">
                                {{ graph.text[this.language?.current ?? 'EN'] }}
                            </div>
                            <table class="w-full">
                                <tbody>
                                    <tr v-for="(algo, k) in Object.keys(graph.values)">
                                        <!-- 'Algo' Column -->
                                        <td class="whitespace-nowrap pr-2.5 text-primary font-bold">
                                            {{ algo }}
                                        </td>
                                        <!-- 'Score' Column -->
                                        <td class="whitespace-nowrap pr-2.5 font-thin text-primary text-right">
                                            <div class="w-28 font-mono">
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
                </div>

            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "EducationPageStandard",
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
            tab: "kem", // kem or dss
            data_view: "table", // table or graph
        }
    },
    inject: ['language'],
    methods: {
        changeTab(tab) {
            this.tab = tab;
        },
        changeView(data_view) {
            console.log(data_view)
            this.data_view = data_view;
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
        }
    }
}
</script>