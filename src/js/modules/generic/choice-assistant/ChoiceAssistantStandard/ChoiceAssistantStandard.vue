<template>
    <!-- outer wrapper / spans full display to center the questionaire with some max width -->
    <div class="w-full relative flex justify-center mt-8">
        <template v-if="tab == 'choice-assistant'">
            <!-- inner wrapper / contains the questionaire -->
            <div class="w-full max-w-5xl">
                <h1 class="text-secondary font-bold text-2xl ml-2">
                    {{ title_text }}
                </h1>

                <!-- paginator -->
                <ChoiceAssistantStandardStepper :questions="questions" :current_question="current_question"
                    @goto-results="tab = 'results'" class="mb-10" />

                <div @mouseenter="handleMouseEntersQuestion(i)"
                    v-for="question, i in questions[current_question[0]].content"
                    class="w-full flex gap-4 mb-4  relative">
                    <!-- question & answers -->
                    <div class="flex-1 py-2">
                        <div v-if="question.expert_level" class="text-primary font-bold text-lg">
                            <template v-if="language?.current == 'EN'">
                                Expert-level question
                            </template>
                            <template v-else>
                                Expertvraag
                            </template>
                        </div>
                        <h2 class="text-secondary text-xl font-semibold leading-none relative">
                            <div v-if="question.expert_level" class="absolute top-0 left-0 -translate-x-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    class="bi bi-mortarboard" viewBox="0 0 16 16">
                                    <path
                                        d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
                                    <path
                                        d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
                                </svg>
                            </div>
                            {{ question?.question[this.language?.current ?? 'EN'] }}
                        </h2>

                        <!-- Answer choices -->
                        <div class="w-full flex flex-col gap-1 mt-4">
                            <div v-for="answer, k in question.answers" :key="k" class="flex gap-4 items-center">
                                <ChoiceAssistantRadio v-if="question.max_selectable_answers <= 1"
                                    :checked="question?.selected_answers?.includes(k)"
                                    @handle-click="handleSelectAnswer(question, k)" :id="`question-${i}-answer-${k}`" />
                                <ChoiceAssistantCheckbox v-else :checked="question?.selected_answers?.includes(k)"
                                    @handle-click="handleSelectAnswer(question, k)" :id="`question-${i}-answer-${k}`" />
                                <label :for="`question-${i}-answer-${k}`"
                                    class="text-black font-semibold text-sm cursor-pointer"
                                    @click="handleSelectAnswer(question, k)">
                                    {{ answer.text[this.language?.current ?? 'EN'] }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- devider -->
                    <div class="w-[1px] flex-grow-0 bg-primary" />

                    <!-- description -->
                    <div class="flex-1 py-2 text-black font-semibold text-sm">
                        <!-- <span v-if="i == 0" class="text-semibold text-xl text-primary">
                            <template v-if="language.current == 'EN'">
                                Explanation
                            </template>
                            <template v-if="language.current == 'NL'">
                                Uitleg
                            </template>
                        <br/><br/></span> -->
                        {{ question?.description[this.language?.current ?? 'EN'] }}
                    </div>
                </div>
            </div>
        </template> <!-- choice assistant questionair -->
        <template v-else-if="tab == 'results'">
            <ChoiceAssistantStandardResults :title_text="title_text" :questions="questions"
                @handle-back-to-questions="tab = 'choice-assistant'" :scores="scores"
                :algorithm_comparisons_to_show="algorithm_comparisons_to_show"
                :answered_questions="answered_questions" />
        </template>
    </div>
</template>

<script>
import ChoiceAssistantStandardStepper from './ChoiceAssistantStandardStepper.vue'
import ChoiceAssistantStandardResults from './ChoiceAssistantStandardResults.vue';
import ChoiceAssistantCheckbox from './../ChoiceAssistantCheckbox.vue';
import ChoiceAssistantRadio from './../ChoiceAssistantRadio.vue';

export default {
    components: {
        ChoiceAssistantStandardStepper,
        ChoiceAssistantCheckbox,
        ChoiceAssistantRadio,

        ChoiceAssistantStandardResults
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
            tab: 'choice-assistant', // choice-assistant, results
        }
    },
    methods: {
        handleMouseEntersQuestion(question_in_category_index) {
            this.current_question[1] = question_in_category_index;
        },
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
        }
    }
}
</script>
