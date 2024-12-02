<template>
    <div class="w-full px-8 pt-8">
        <div class="flex w-full justify-center">
            <h1 class="text-2xl font-semibold text-secondary">
                {{ title_text }}
            </h1>
        </div>
        <div class="flex w-full justify-center mt-2 mb-8">
            <h1 class="text-primary flex items-end gap-8">
                <template v-if="language.current == 'EN'">
                    Results
                </template>
                <template v-else-if="language.current == 'NL'">
                    Resultaten
                </template>

                <div @click="generatePDF" class="text-sm text-white py-1 px-2 bg-secondary rounded-md cursor-pointer">
                    export</div>
            </h1>
        </div>

        <div class="w-full">
            <div v-for="scoring_key in scoring_keys_by_score" class="flex flex-col justify-center mt-4">
                <div class="text-primary font-bold text-lg">{{ scoring_key }}</div>
                <div class="flex items-center">
                    <div class="pr-2 text-left font-semibold text-lg w-8 max-w-8 min-w-8">{{
                        scores?.scores[scoring_key].toFixed(0) }}
                    </div>
                    <div class="flex-1 flex items-center">
                        <!-- filled bar -->
                        <div v-if="scores?.scores[scoring_key]" class="bg-primary h-7"
                            :style="`width: ${scores?.scores[scoring_key]}%;`" />
                        <div v-else class="bg-primary h-7" :style="`width: 1%;`" />


                        <!-- rest of bar as line -->
                        <div class="bg-primary h-[2px] flex-1" />
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <div class="pl-8 flex-1 flex items-center justify-between text-primary font-semibold">
                    <div>
                        0
                    </div>

                    <div>
                        100
                    </div>
                </div>
            </div>
        </div>

        <!-- Show the excluded algorithms -->
        <div v-if="scores.excluded_algorithms && scores.excluded_algorithms?.length > 0" class="mt-4">
            <h2 class="text-quadrinary font-bold text-xl">
                <template v-if="language.current == 'EN'">
                    Excluded Algorithms
                </template>
                <template v-else-if="language.current == 'NL'">
                    Uitgesloten Algoritmen
                </template>
            </h2>
            <div class="flex flex-col gap-4 mt-2 mb-8">
                <div v-for="excluded in scores.excluded_algorithms" :key="excluded.algorithm" class="flex flex-col">
                    <div class="text-quadrinary font-semibold text-lg">
                        {{ excluded.algorithm }}
                    </div>
                    <div class="text-black">
                        <template v-if="excluded.customer_message">
                            {{ excluded.customer_message }}
                        </template>
                        <template v-else>
                            <template v-if="language.current == 'EN'">
                                Excluded due to the answer "{{ excluded.answer_text }}" to the question "{{
                                    excluded.question_text }}"
                            </template>
                            <template v-else-if="language.current == 'NL'">
                                Uitgesloten vanwege het antwoord "{{ excluded.answer_text }}" op de vraag "{{
                                    excluded.question_text }}"
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full  flex justify-between text-lg text-secondary font-semibold mb-16">
            <div @click="handleBackToImportance" class="flex gap-1 items-center  cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
                <div>
                    <template v-if="language.current == 'EN'">
                        Back to importance
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Terug naar belangrijkheid
                    </template>
                </div>
            </div>
            <div />
        </div>

    </div>
    <!-- prev &  next question button -->


    <!-- Comparison Sliding Window -->
    <div class="fixed z-10 bottom-0 w-[100vw] h-2/4 flex flex-col transition-transform duration-500 ease-in-out" :class="{
        'translate-y-0': comparisons_expanded,
        'translate-y-[calc(50vh_-_2.5rem)]': !comparisons_expanded,
    }">
        <!-- Header Bar -->
        <div @click="comparisons_expanded = !comparisons_expanded"
            class="w-full flex items-center bg-primary text-white h-10 min-h-10 max-h-10 px-2 cursor-pointer transition-all duration-300 ease-in-out">
            <!-- Left Side -->
            <div class="flex-1 text-sm">
                <template v-if="language.current == 'EN'">
                    <span v-if="comparisons_expanded">Hide explanations</span>
                    <span v-else>Show explanations</span>
                </template>
                <template v-else-if="language.current == 'NL'">
                    <span v-if="comparisons_expanded">Verberg uitleg</span>
                    <span v-else>Toon uitleg</span>
                </template>
            </div>

            <!-- Icon -->
            <div>
                <svg :class="{ 'rotate-180': comparisons_expanded, 'rotate-0': !comparisons_expanded }"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-chevron-up transition-all duration-500 ease-in-out" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                </svg>
            </div>

            <!-- Right Side (Empty for Alignment) -->
            <div class="flex-1"></div>
        </div>


        <div class="w-full px-4 pt-4 pb-2 bg-white text-justify flex-1 overflow-y-auto text-sm">
            <!-- personalized advices -->
            <div v-if="scores?.personolized_advices?.length == 0" class=" pt-4 mb-4">
                <div class="text-secondary font-semibold text-lg leading-none">
                    <template v-if="language.current == 'EN'">
                        No personalized advice available.
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Geen persoonlijk advies beschikbaar.
                    </template>
                </div>
            </div>
            <div v-else class="pt-4  mb-4">
                <!-- header -->
                <div class="text-secondary font-bold text-xl leading-none">
                    <template v-if="language.current == 'EN'">
                        Personalized advice
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Persoonlijk advies
                    </template>
                </div>

                <!-- advice -->
                <div class="flex flex-col gap-4 mt-4">
                    <div v-for="advice in scores?.personolized_advices" :key="advice.question" class="flex flex-col">
                        <div class="text-primary font-semibold text-lg">
                            {{ advice.question }}
                        </div>
                        <div class="text-black flex flex-col gap-1">
                            <div v-for="pair in advice.answer_message_pairs" :key="pair.answer">
                                <div class="">
                                    <span class="text-quadrinary font-semibold">{{ pair.answer }}:</span> <span>{{
                                        pair.message
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- close call comparisons -->
            <div v-if="algorithm_comparisons_to_show.length === 0">
                <div class="text-quaternary font-semibold text-lg leading-none">
                    <template v-if="language.current == 'EN'">
                        No explanation since there is a clear winner.
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Geen uitleg nodig omdat er een duidelijke winnaar is.
                    </template>
                </div>
            </div>
            <div v-else class="flex flex-col gap-4">
                <!-- header -->
                <div class="text-secondary font-bold text-xl leading-none">
                    <template v-if="language.current == 'EN'">
                        Algorithm comparisons
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Algoritme vergelijkingen
                    </template>
                </div>

                <!-- comp -->
                <div v-for="comparison in algorithm_comparisons_to_show" :key="comparison.algorithms.join('-')"
                    class="flex flex-col">
                    <div class="text-primary font-semibold text-lg">
                        {{ comparison.algorithms[0] }} vs {{ comparison.algorithms[1] }}
                    </div>
                    <div class="text-black">
                        {{ comparison.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChoiceAssistantMobileResults',
    props: {
        title_text: {
            type: String,
            default: '',
        },
        questions: {
            type: Object,
            default: [],
        },
        algorithm_comparisons_to_show: {
            type: Array,
            default: [],
        },
        scores: {
            type: Object,
            default: {},
        },

    },
    inject: ['language', 'generatePDF'], // generatePDF comes from the ChoiceAssitance.vue component
    emits: ['handle-back-to-importance'],
    data() {
        return {
            comparisons_expanded: false,
        }
    },
    methods: {
        handleBackToImportance() {
            this.$emit('handle-back-to-importance')
        },
        handlePrintPage() {
            window.print();
        },
    },
    computed: {
        scoring_keys_by_score() {
            return Object.keys(this.scores.scores).sort((a, b) => this.scores.scores[b] - this.scores.scores[a]);
        }
    }

}
</script>