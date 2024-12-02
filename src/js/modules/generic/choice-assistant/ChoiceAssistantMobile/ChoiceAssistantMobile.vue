<template>
    <template v-if="tab == 'choice-assistant'">
        <div class="w-full relative flex flex-col items-center mt-8">
            <!-- Title -->
            <h1 class="text-2xl font-medium text-secondary mb-12">{{ title_text }}</h1>

            <!-- Stepper -->
            <ChoiceAssistantMobileStepper :questions="questions" :current_question="current_question" />

            <!-- Current Question -->
            <div class="w-full max-w-[500px] mt-12 px-8">
                <!-- Question text -->
                <div class="w-full max-w-[400px]">
                    <div v-if="current_question_object?.expert_level"
                        class="text-primary font-bold text-lg flex items-center gap-3 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-mortarboard" viewBox="0 0 16 16">
                            <path
                                d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                            <path
                                d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                        </svg>
                        <template v-if="language?.current == 'EN'">
                            Expert-level question
                        </template>
                        <template v-else>
                            Expertvraag
                        </template>
                    </div>
                    <h2 class="text-secondary text-xl font-semibold leading-none relative">
                        {{ current_question_object?.question[language?.current ?? 'EN'] }}
                    </h2>
                </div>

                <!-- Multiple choice -->
                <div class="w-full flex flex-col gap-1 mt-4">
                    <div v-for="answer, k in current_question_object?.answers" :key="k" class="flex gap-4 items-center">
                        <ChoiceAssistantRadio v-if="current_question_object.max_selectable_answers <= 1"
                            :checked="current_question_object?.selected_answers?.includes(k)"
                            @handle-click="handleSelectAnswer(current_question_object, k)"
                            :id="`question-${current_question[0]}-answer-${k}`" />
                        <ChoiceAssistantCheckbox v-else
                            :checked="current_question_object?.selected_answers?.includes(k)"
                            @handle-click="handleSelectAnswer(current_question_object, k)"
                            :id="`question-${current_question[0]}-answer-${k}`" />
                        <label :for="`question-${current_question[0]}-answer-${k}`"
                            class="text-black font-semibold text-md cursor-pointer"
                            @click="handleSelectAnswer(current_question_object, k)">
                            {{ answer.text[language?.current ?? 'EN'] }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- prev &  next question button -->
        <div class="fixed bottom-16 w-[100vw] flex justify-center">
            <div class="w-full max-w-[500px] flex justify-between sm:text-lg text-sm text-secondary font-semibold px-4">
                <div @click="gotoPreviousQuestion" class="flex gap-1 items-center "
                    :class="{ 'text-gray-300 cursor-not-allowed': current_question[0] == 0 && current_question[1] == 0, 'cursor-pointer': !(current_question[0] == 0 && current_question[1] == 0) }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                    <div>
                        <template v-if="language.current == 'EN'">
                            Previous Question
                        </template>
                        <template v-if="language.current == 'NL'">
                            Vorige Vraag
                        </template>
                    </div>
                </div>
                <div @click="gotoNextQuestion" class="flex gap-1 items-center cursor-pointer">
                    <div>
                        <template
                            v-if="current_question[0] == questions.length - 1 && current_question[1] == questions[current_question[0]].content.length - 1">
                            <template v-if="language.current == 'EN'">
                                Importance
                            </template>
                            <template v-if="language.current == 'NL'">
                                Belangrijkheid
                            </template>
                        </template>
                        <template v-else>
                            <template v-if="language.current == 'EN'">
                                Next Question
                            </template>
                            <template v-if="language.current == 'NL'">
                                Volgende Vraag
                            </template>
                        </template>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path
                            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- bottom nav + info slider -->
        <div class="fixed z-10 bottom-0 w-[100vw] h-2/4 flex flex-col transition-transform duration-500 ease-in-out"
            :class="{
                'translate-y-0': info_expanded,
                'translate-y-[calc(50vh_-_2.5rem)]': !info_expanded,
            }">

            <!-- info slider -->
            <div @click="info_expanded = !info_expanded"
                class="w-full flex items-center bg-primary text-white h-10 min-h-10 max-h-10 px-2 cursor-pointer transition-all duration-300 ease-in-out"
                :class="{

                }">
                <!-- left side  -->
                <div class="flex-1 text-sm">
                    <template v-if="language.current == 'EN'">
                        More information
                    </template>
                    <template v-else-if="language.current == 'NL'">
                        Meer informatie
                    </template>
                </div>

                <!-- middle -->
                <div>
                    <svg :class="{ 'rotate-180': info_expanded, 'rotate-0': !info_expanded }"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-chevron-up transition-all duration-500 ease-in-out" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                    </svg>
                </div>

                <!-- right side -->
                <div class="flex-1">

                </div>
            </div>

            <div class="w-full px-8 pt-8 bg-white text-justify flex-1  leading-tight text-sm">
                {{ current_question_object?.description[language?.current ?? 'EN'] }}
            </div>
        </div>
    </template>
    <template v-else-if="tab == 'importance'">
        <ChoiceAssistantMobileImportance :title_text="title_text" :questions="questions"
            :answered_questions="answered_questions" @handle-back-to-questions="tab = 'choice-assistant'"
            @handle-to-results="tab = 'results'" />
    </template>
    <template v-else-if="tab == 'results'">
        <ChoiceAssistantMobileResults :title_text="title_text" :questions="questions" :scores="scores"
            :algorithm_comparisons_to_show="algorithm_comparisons_to_show"
            @handle-back-to-importance="tab = 'importance'" />
    </template>
</template>

<script>
import ChoiceAssistantMobileStepper from './ChoiceAssistantMobileStepper.vue';
import ChoiceAssistantMobileImportance from './ChoiceAssistantMobileImportance.vue';
import ChoiceAssistantMobileResults from './ChoiceAssistantMobileResults.vue';
import ChoiceAssistantCheckbox from './../ChoiceAssistantCheckbox.vue';
import ChoiceAssistantRadio from './../ChoiceAssistantRadio.vue';


export default {
    components: {
        ChoiceAssistantMobileStepper,
        ChoiceAssistantMobileImportance,
        ChoiceAssistantMobileResults,
        ChoiceAssistantCheckbox,
        ChoiceAssistantRadio
    },
    inject: ['language'],
    props: {
        title_text: {
            type: String,
            required: true,
        },
        questions: {
            type: Object,
            required: true,
        },
        algorithm_comparisons_to_show: {
            type: Array,
            required: false,
        },
        current_question: {
            type: Array,
            required: true,
        },

        scores: {
            type: Object,
            required: false,
        },
        answered_questions: {
            type: Array,
            required: false,
        }
    },
    data() {
        return {
            info_expanded: false,
            tab: 'choice-assistant', // choice-assistant, importance, results
        }
    },
    methods: {
        handleSelectAnswer(question, answer_index) {
            if (question.max_selectable_answers <= 1) {
                question.selected_answers = [answer_index]
            } else {
                if (question.selected_answers.includes(answer_index)) {
                    question.selected_answers = question.selected_answers.filter((index) => index != answer_index)
                } else {
                    question.selected_answers.push(answer_index)
                }
            }
        },
        gotoNextQuestion() {
            if (this.current_question[0] == this.questions.length - 1 && this.current_question[1] == this.questions[this.current_question[0]].content.length - 1) {
                this.tab = 'importance';
                return
            }

            // if last question in category go to next category
            if (this.current_question[1] == this.questions[this.current_question[0]].content.length - 1) {
                this.current_question[1] = 0
                this.current_question[0] += 1
            } else {
                this.current_question[1] += 1
            }
        },
        gotoPreviousQuestion() {
            // if too far left ignore
            if (this.current_question[0] == 0 && this.current_question[1] == 0) {
                return
            }

            // if first question in category go to previous category
            if (this.current_question[1] == 0) {
                this.current_question[0] -= 1
                this.current_question[1] = this.questions[this.current_question[0]].content.length - 1
            } else {
                this.current_question[1] -= 1
            }
        },

    },
    computed: {
        current_question_object() {
            return this.questions[this.current_question[0]]?.content[this.current_question[1]];
        }
    }
}
</script>