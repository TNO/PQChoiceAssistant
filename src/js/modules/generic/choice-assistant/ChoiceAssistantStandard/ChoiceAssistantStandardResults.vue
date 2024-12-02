<template>
    <div class="w-full max-w-7xl mt-8">
        <div class="w-full flex justify-between">
            <h1 class="text-primary font-bold text-2xl ml-2">
                <!-- {{ title_text }} -->
            </h1>
            <div class="flex gap-2 items-center">
                <button @click="handleBackToQuestions" class="px-4 py-2 bg-primary text-white font-semibold rounded-md">
                    <template v-if="language.current == 'EN'">
                        Back to questions
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Terug naar vragen
                    </template>
                </button>
                <!-- <button @click="handlePrintPage" class="px-4 py-2 bg-primary text-white font-semibold rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                    </svg>
                </button> -->
            </div>
        </div>

        <div class="w-full flex gap-4 min-h-[70vh]">
            <!-- important topics -->
            <div class="flex-1 flex flex-col">
                <h1 class="text-primary font-bold text-lg">
                    <template v-if="language.current == 'EN'">
                        Indicate which topics are most important to you.
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Geef aan welke onderwerpen het belangrijkste zijn voor u.
                    </template>
                </h1>

                <div class="w-full flex flex-col gap-4 mt-12">
                    <div v-if="!answered_questions || answered_questions.length == 0" class="mb-16 -mt-8">
                        <div class="text-quadrinary font-semibold text-lg leading-none">
                            <template v-if="language.current == 'EN'">
                                Please answer at least one question to see the results.
                            </template>
                            <template v-else-if="language.current == 'NL'">
                                Beantwoord meer dan één vraag om de resultaten te zien.
                            </template>
                        </div>
                    </div>
                    <div v-for="answered_question in answered_questions" class="w-full flex gap-4">
                        <!-- checkbox & expert symbol -->
                        <div class="flex flex-col items-center">
                            <!-- checkbox -->
                            <ChoiceAssistantCheckbox
                                :checked="questions[answered_question.index[0]].content[answered_question.index[1]].marked_as_important"
                                @handle-click="questions[answered_question.index[0]].content[answered_question.index[1]].marked_as_important = !questions[answered_question.index[0]].content[answered_question.index[1]].marked_as_important" />

                            <!-- expert symbol if needed -->
                            <div class="text-primary">
                                <svg v-if="answered_question.expert_level" xmlns="http://www.w3.org/2000/svg" width="12"
                                    height="12" fill="currentColor" class="mt-2 bi bi-mortarboard" viewBox="0 0 16 16">
                                    <path
                                        d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                                    <path
                                        d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                                </svg>
                            </div>
                        </div>

                        <!-- questions and answer -->
                        <div class="flex-1">
                            <div class="text-secondary font-semibold text-lg leading-none">
                                {{ answered_question.category }}</div>
                            <div class="text-secondary font-semibold text-lg leading-none">
                                {{ answered_question.question }}</div>
                            <div class="text-black font-semibold text-lg leading-none">Answer(s):
                                {{ answered_question.answers.join(', ') }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-[1px] flex-grow-0 bg-primary" />

            <!-- scoring -->
            <div class="flex-1">
                <h1 class="text-primary font-bold text-3xl flex items-end justify-between">
                    <template v-if="language?.current == 'EN'">
                        Results
                    </template>
                    <template v-else>
                        Resultaten
                    </template>

                    <div @click="generatePDF"
                        class="text-sm text-white py-1 px-2 bg-secondary rounded-md cursor-pointer">export
                    </div>
                </h1>

                <!-- expand info -->
                <div class="flex items-center gap-2 cursor-pointer">
                    <!-- icon -->
                    <div class="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-down-fill" :class="{ 'rotate-180': show_comparisons }" viewBox="0 0 16 16">
                            <path
                                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </div>

                    <!-- text -->
                    <div @click="show_comparisons = !show_comparisons" class="text-primary opacity-80">
                        <template v-if="language.current == 'EN'">
                            <span v-if="show_comparisons">Hide explanations</span>
                            <span v-else>Show explanations</span>
                        </template>
                        <template v-else-if="language.current == 'NL'">
                            <span v-if="show_comparisons">Verberg uitleg</span>
                            <span v-else>Toon uitleg</span>
                        </template>
                    </div>
                </div>

                <!-- The scoring chart -->
                <div class="flex flex-col gap-4 mt-4">
                    <div v-for="scoring_key in scoring_keys_by_score" class="flex items-center">
                        <div class="text-primary font-bold text-lg w-32 max-w-32 min-w-32 truncate">{{ scoring_key }}
                        </div>
                        <div class=" pl-2 pr-2 text-right font-semibold text-lg w-12 max-w-12 min-w-12 truncate">
                            {{ scores?.scores[scoring_key].toFixed(0) }}</div>
                        <div class="flex-1 flex items-center">
                            <!-- filled bar -->
                            <div class="bg-primary h-7 transition-all duration-300 ease-in-out"
                                :style="`width: ${scores?.scores[scoring_key]}%;`" />

                            <!-- rest of bar as line -->
                            <div class="bg-primary h-[2px] flex-1" />
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-primary font-bold text-lg w-32 max-w-32 min-w-32 truncate"></div>
                        <div class=" pl-2 pr-2 text-right font-semibold text-lg w-12 max-w-12 min-w-12 truncate"></div>
                        <div class="flex-1 flex items-center justify-between text-primary font-semibold">
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
                    <div class="flex flex-col gap-4 mt-2">
                        <div v-for="excluded in scores.excluded_algorithms" :key="excluded.algorithm"
                            class="flex flex-col">
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

                <!-- comparison -->
                <div v-if="show_comparisons" class="mt-4">

                    <!-- personalized advices -->
                    <div v-if="scores?.personolized_advices?.length == 0" class="mb-4">
                        <div class="text-secondary font-bold text-xl leading-none">
                            <template v-if="language.current == 'EN'">
                                No personalized advice available.
                            </template>
                            <template v-else-if="language.current == 'NL'">
                                Geen persoonlijk advies beschikbaar.
                            </template>
                        </div>
                    </div>
                    <div v-else class="mb-4">
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
                            <div v-for="advice in scores?.personolized_advices" :key="advice.question"
                                class="flex flex-col">
                                <div class="text-primary font-semibold text-lg">
                                    {{ advice.question }}
                                </div>
                                <div class="text-black flex flex-col gap-1">
                                    <div v-for="pair in advice.answer_message_pairs" :key="pair.answer">
                                        <div class="">
                                            <span class="text-quadrinary font-semibold">{{ pair.answer }}:</span> <span>{{ pair.message }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- close calls comparisons -->
                    <div v-if="algorithm_comparisons_to_show.length == 0">
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
                                Close score comparisons
                            </template>
                            <template v-else-if="language.current == 'NL'">
                                Vergelijkingen met een kleine scoreverschil
                            </template>
                        </div>

                        <!-- comparisons -->
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
        </div>
    </div>
</template>

<script>
import ChoiceAssistantCheckbox from '../ChoiceAssistantCheckbox.vue';

export default {
    name: 'ChoiceAssistantStandardResults',
    components: {
        ChoiceAssistantCheckbox,
    },
    inject: ['language', 'generatePDF'], // generatePDF comes from the ChoiceAssitance.vue component
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
        answered_questions: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            show_comparisons: false,
        }
    },
    emits: ['handle-back-to-questions'],
    methods: {
        handleBackToQuestions() {
            this.$emit('handle-back-to-questions')
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