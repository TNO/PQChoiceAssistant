<template>
    <div class="w-full max-w-[500px] px-4 flex items-start">
        <!-- prev question controlls -->
        <div @click="gotoPreviousCategory" class="" :class="{
                'text-secondary  cursor-pointer': !(current_question[0] == 0 && current_question[1] == 0),
                'text-gray-300 cursor-not-allowed': current_question[0] == 0 && current_question[1] == 0,
            }"
            alt-text="Previous category"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
        </div>

        <!-- current question info -->
        <div class="flex-1 px-8 flex flex-col items-center">
            <!-- category name -->
            <div>
                <h3 class="text-md font-semibold bg-secondary text-white px-3 rounded-sm leading-normal" >
                    {{ questions[current_question[0]].category[language.current] }}
                </h3>
            </div>

            <!-- question in cateroy indicator -->
            <div class="w-full flex justify-center mt-2 gap-3">
                <!-- ball -->
                <div @click="handleClickQuestionCircle(j)" v-for="(question, j) in questions[current_question[0]].content" :key="j" :alt-text="question?.expert_level ? 'Unanswered expert question' : 'Unanswered question'" class="w-6 h-6 min-w-6 min-h-6 rounded-full border border-secondary  leading-none flex items-center justify-center relative cursor-pointer" :class="{
                    'bg-secondary text-white': questionHasAtLeastOneSelectedAnswer(question),
                    'bg-none text-secondary': !questionHasAtLeastOneSelectedAnswer(question),
                }">
                    <svg v-if="question?.expert_level" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard" viewBox="0 0 16 16">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                    </svg>

                    <div class="absolute w-2 h-2 rounded-full top-7 " :class="{
                        'bg-secondary': j == current_question[1],
                        'bg-none': !(j == current_question[1]),
                    }">
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- next question controlls -->
        <div @click="gotoNextCategory" class="" :class="{
                'text-secondary  cursor-pointer': !(current_question[0] == questions.length - 1 && current_question[1] == questions[current_question[0]].content.length - 1),
                'text-gray-300 cursor-not-allowed': current_question[0] == questions.length - 1 && current_question[1] == questions[current_question[0]].content.length - 1,
            }"
            alt-text="Next category"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        inject: ['language'],
        props: {
            questions: {
                type: Object,
                required: true,
            },
            current_question: {
                type: Array,
                required: true,
            },
        },
        methods: {
            handleClickQuestionCircle(question_index){
                this.current_question[1] = question_index;  // set question in category
            },

            gotoNextQuestion(){
                // if too far right ignore
                if(this.current_question[0] == this.questions.length - 1 && this.current_question[1] == this.questions[this.current_question[0]].content.length - 1){
                    return
                }

                // if last question in category go to next category
                if(this.current_question[1] == this.questions[this.current_question[0]].content.length - 1){
                    this.current_question[1] = 0
                    this.current_question[0] += 1
                } else {
                    this.current_question[1] += 1
                }
            },
            gotoPreviousQuestion(){
                // if too far left ignore
                if(this.current_question[0] == 0 && this.current_question[1] == 0){
                    return
                }

                // if first question in category go to previous category
                if(this.current_question[1] == 0){
                    this.current_question[0] -= 1
                    this.current_question[1] = this.questions[this.current_question[0]].content.length - 1
                } else {
                    this.current_question[1] -= 1
                }
            },

            gotoNextCategory(){
                // if too far right ignore
                if(this.current_question[0] == this.questions.length - 1){
                    return
                }

                this.current_question[1] = 0
                this.current_question[0] += 1
            },
            gotoPreviousCategory(){
                // if too far left ignore
                if(this.current_question[0] == 0){
                    return
                }

                this.current_question[1] = 0
                this.current_question[0] -= 1
            },
            
            questionHasAtLeastOneSelectedAnswer(question){
                return question?.selected_answers?.length > 0
            }
        }
    }
</script>