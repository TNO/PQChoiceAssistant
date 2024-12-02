<template>
    <ChoiceAssistant 
        :title_text="title_text"
        :questions="questions"
        :algorithm_comparisons="dss_algorithm_comparisons"
        :current_question="current_question"
    />
</template>

<script>
    import { questions } from '@/js/json/dss-questions.js'
    import dss_algorithm_comparisons from '@/js/json/dss-pairwise-comparisons.js';
    
    import ChoiceAssistant from '../../generic/choice-assistant/ChoiceAssistant.vue';

    export default {
        components: {
            ChoiceAssistant,
        },
        data(){
            return {
                title_text: 'Signatures',
                current_question: [0, 0], // based on the json. [catergory, question]
                questions,
                dss_algorithm_comparisons,
            }
        },
    }
</script>