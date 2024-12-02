<template>
    <ChoiceAssistant 
        :title_text="title_text"
        :questions="questions"
        :algorithm_comparisons="kem_algorithm_comparisons"
        :current_question="current_question"
    />
</template>

<script>
    import { questions } from '@/js/json/kem-questions.js'
    import kem_algorithm_comparisons from '@/js/json/kem-pairwise-comparisons.js';

    import ChoiceAssistant from '../../generic/choice-assistant/ChoiceAssistant.vue';

    export default {
        components: {
            ChoiceAssistant,
        },
        data(){
            return {
                title_text: 'Encapsulation',
                current_question: [0, 0], // based on the json. [catergory, question]
                questions,
                kem_algorithm_comparisons,
            }
        },
    }
</script>