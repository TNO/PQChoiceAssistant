<template>
    <div class="p-4 w-full rounded-md bg-tertiary flex justify-between gap-4 relative">
        <!-- Category Step -->
        <div v-for="(question_category, i) in questions">
            <!-- category name -->
            <div @click="handleClickCategory(i)" class="cursor-pointer">
                <h3 class="text-sm font-semibold" :class="{
                    'bg-secondary text-white rounded-md  px-2': current_question[0] == i,
                    'text-secondary': current_question[0] != i,

                }">
                    {{ question_category.category[language.current] }}
                </h3>
            </div>

            <!-- category question balls -->
            <div class="flex gap-1 items-center mt-1 ">
                <!-- question in category ball -->
                <div @click="handleClickQuestionCircle(i, j)" v-for="(question, j) in questions[i].content" :key="j" :alt-text="question?.expert_level ? 'Unanswered expert question' : 'Unanswered question'" class="w-5 h-5 rounded-full border border-secondary leading-none flex items-center justify-center relative cursor-pointer" :class="{
                    'bg-secondary text-white': questionHasAtLeastOneSelectedAnswer(question),
                    'bg-none text-secondary': !questionHasAtLeastOneSelectedAnswer(question),
                }">
                    <!-- Expert level icon svg shown when the question if marked exper level -->
                    <svg v-if="question?.expert_level" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-mortarboard" viewBox="0 0 16 16">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                    </svg>

                    <!-- current question in focus indicator, under current catoragry question balls -->
                    <div class="absolute w-2 h-2 rounded-full top-5 " :class="{
                        'bg-secondary': i == current_question[0] && j == current_question[1],
                        'bg-none': !(i == current_question[0] && j == current_question[1]),
                    }">
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- previous and next caterogy buttons -->
        <button alt-text="Previous category"
            @click="gotoPreviousCategory"    
            class="absolute -left-20 top-2 text-secondary"
            :disabled="current_question[0] == 0"
            :class="{ 'cursor-not-allowed opacity-50': current_question[0] == 0 }"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
        </button>


        <button
            alt-text="Next category"
            @click="gotoNextCategory" 
            class="absolute -right-20 top-2 text-secondary"  
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
        </button>
        <button v-if="current_question[0] == questions.length - 1"
            @click="gotoNextCategory" 
            class="absolute -right-28 top-2 text-secondary"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
        </button>
        <div v-if="current_question[0] == questions.length - 1" class="absolute -right-24 top-16 font-semibold text-secondary text-sm">
            <template v-if="language.current == 'EN'">
                results
            </template>
            <template v-else-if="language.current == 'NL'">
                resultaten
            </template>
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
        emits: ['goto-results'],
        methods:{
            handleClickQuestionCircle(category_index, question_index){
                this.current_question[1] = 0;               // ensure no error (cuz q 0 always exist in cat)
                this.current_question[0] = category_index;  // set catergory
                this.current_question[1] = question_index;  // set question in category
            },
            handleClickCategory(category_index){
                this.current_question[1] = 0;               // ensure no error (cuz q 0 always exist in cat)
                this.current_question[0] = category_index;  // set catergory
            },
            questionHasAtLeastOneSelectedAnswer(question){
                return question?.selected_answers?.length > 0
            },

            
            gotoNextCategory(){
                if(this.current_question[0] == this.questions.length - 1){
                    this.$emit('goto-results');
                    return;
                }

                this.current_question[1] = 0
                this.current_question[0] += 1
            },
            gotoPreviousCategory(){
                if(this.current_question[0] == 0 && this.current_question[1] == 0){
                    return;
                }

                this.current_question[1] = 0
                this.current_question[0] -= 1
            },
        }
    }
</script>