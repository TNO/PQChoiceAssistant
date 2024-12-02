<template>
    <div class="w-full flex justify-center">
        <div class="w-full max-w-5xl px-8 mt-12">
            <h1 class="text-primary font-bold text-2xl">
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
        
    </div>
    
    
    <!-- prev &  next question button -->
    <div class="w-full flex justify-between text-lg text-secondary font-semibold px-8 mb-8 mt-16">
        <div @click="handleBackToQuestions" class="flex gap-1 items-center  cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path
                    d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            <div>
                <template v-if="language.current == 'EN'">
                    Back to questions
                </template>
                <template v-else-if="language.current == 'NL'">
                    Terug naar vragen
                </template>
            </div>
        </div>
        <div @click="handleToResults" class="flex gap-1 items-center  cursor-pointer">
            <div>
                <template v-if="language.current == 'EN'">
                    To Results
                </template>
                <template v-else-if="language.current == 'NL'">
                    Naar Resultaten
                </template>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                class="bi bi-caret-left-fill rotate-180" viewBox="0 0 16 16">
                <path
                    d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
        </div>
    </div>
</template>

<script>
    import ChoiceAssistantCheckbox from '../ChoiceAssistantCheckbox.vue';

export default {
    name: 'ChoiceAssistantMobileResults',
    components: {
        ChoiceAssistantCheckbox,
    },
    inject: ['language'],
    props:{
        title_text: {
            type: String,
            required: true,
        },
        questions: {
            type: Object,
            required: true,
        },

        answered_questions: {
            type: Array,
            required: true,
        },
    },
    emits: ['handle-back-to-questions', 'handle-to-results'],
    methods:{
        handleBackToQuestions() {
            this.$emit('handle-back-to-questions')
        },
        handleToResults() {
            this.$emit('handle-to-results')
        },
    },
}
</script>