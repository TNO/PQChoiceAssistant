<template>
    <div class="hidden platform-viewport-breakpoint:block pb-12">
        <EducationPageStandard :kem_education_table="kem_education_table" :dss_education_table="dss_education_table"
            :kem_education_graph="kem_education_graph_data" :dss_education_graph="dss_education_graph_data" />
    </div>
    <div class="block platform-viewport-breakpoint:hidden">
        <EducationPageMobile :kem_education_table="kem_education_table" :dss_education_table="dss_education_table"
            :kem_education_graph="kem_education_graph_data" :dss_education_graph="dss_education_graph_data" />
    </div>
</template>

<script>
import kem_education_table from '@/js/json/kem-education-table.js';
import dss_education_table from '@/js/json/dss-education-table.js';

import kem_education_graphs from '@/js/json/kem-education-graphs.js';
import dss_education_graphs from '@/js/json/dss-education-graphs.js';

import EducationPageStandard from './views/EducationPageStandard.vue';
import EducationPageMobile from './views/EducationPageMobile.vue';

export default {
    name: "EducationPage",
    components: {
        EducationPageStandard,
        EducationPageMobile,
    },
    data() {
        return {
            kem_education_table,
            dss_education_table,

            kem_education_graphs,
            dss_education_graphs,
        }
    },
    inject: ['language'],
    mounted() {
        console.log("Education Tables")
        console.log(this.kem_education_table)
        console.log(this.dss_education_table)
    },
    computed: {
        kem_education_graph_data() {
            /**
             * Adds algo score as percentage of max score without altering the original data
             */
            // Deep copy of this.kem_education_graphs
            let kemEducationGraphsCopy = JSON.parse(JSON.stringify(this.kem_education_graphs));
            const FACTOR = 0.067129531;

            // Iterate over each category
            Object.keys(kemEducationGraphsCopy).forEach(category => {
                // Iterate over each graph in the category
                Object.keys(kemEducationGraphsCopy[category]['content']).forEach(graph => {
                    // Initialize max_score, max_log_score, min_log_score, and min_value for the current graph
                    let max_score = 0;
                    let max_log_score = 0;
                    let min_log_score = Infinity;
                    let min_value = Infinity;

                    // Calculate max_score, max_log_score, min_log_score, and min_value from 'content' data
                    Object.keys(kemEducationGraphsCopy[category]['content'][graph].values).forEach(algo => {
                        const score = kemEducationGraphsCopy[category]['content'][graph].values[algo];
                        const log_score = Math.log(score);

                        if (score > max_score) {
                            max_score = score;
                        }

                        if (log_score > max_log_score) {
                            max_log_score = log_score;
                        }

                        if (log_score < min_log_score) {
                            min_log_score = log_score;
                        }

                        if (score < min_value) {
                            min_value = score;
                        }
                    });

                    // Compute OFFSET
                    const OFFSET = 0.1 - Math.log2(min_value) * FACTOR;

                    // Convert scores to percentage of max_score and calculate scaled percentages
                    Object.keys(kemEducationGraphsCopy[category]['content'][graph].values).forEach(algo => {
                        const score = kemEducationGraphsCopy[category]['content'][graph].values[algo];
                        const log_score = Math.log(score);

                        kemEducationGraphsCopy[category]['content'][graph].values[algo] = {};
                        kemEducationGraphsCopy[category]['content'][graph].values[algo].score = score;
                        kemEducationGraphsCopy[category]['content'][graph].values[algo].percentage = ((score / max_score) * 100).toFixed(0);
                        kemEducationGraphsCopy[category]['content'][graph].values[algo].percentage_for_log_graph = ((log_score / max_log_score) * 100).toFixed(0);

                        // Calculate scaled percentage_for_log_graph
                        let scaled_percentage;
                        if (max_log_score === min_log_score) {
                            // Avoid division by zero when all log_scores are equal
                            scaled_percentage = 100;
                        } else {
                            scaled_percentage = 5 + 95 * ((log_score - min_log_score) / (max_log_score - min_log_score));
                        }
                        kemEducationGraphsCopy[category]['content'][graph].values[algo].scaled_percentage_for_log_graph_old = scaled_percentage.toFixed(0);

                        // Compute GRAPHVALUE = LOG2(VALUE) * FACTOR + OFFSET
                        const graph_value = ((Math.log2(score) * FACTOR + OFFSET) * 100);
                        kemEducationGraphsCopy[category]['content'][graph].values[algo].scaled_percentage_for_log_graph = graph_value.toFixed(0);
                    });
                });
            });

            console.log("KEM Education Graphs")
            console.log(kemEducationGraphsCopy)

            // Return the modified copy
            return kemEducationGraphsCopy;
        },


        dss_education_graph_data() {
            /**
             * Adds algo score as percentage of max score without altering the original data
             */
            // Deep copy of this.dss_education_graphs
            let dssEducationGraphsCopy = JSON.parse(JSON.stringify(this.dss_education_graphs));
            const FACTOR = 0.067129531;

            // Iterate over each category
            Object.keys(dssEducationGraphsCopy).forEach(category => {
                // Iterate over each graph in the category
                Object.keys(dssEducationGraphsCopy[category]['content']).forEach(graph => {
                    // Initialize max_score, max_log_score, min_log_score, and min_value for the current graph
                    let max_score = 0;
                    let max_log_score = 0;
                    let min_log_score = Infinity;
                    let min_value = Infinity;

                    // Calculate max_score, max_log_score, min_log_score, and min_value from 'content' data
                    Object.keys(dssEducationGraphsCopy[category]['content'][graph].values).forEach(algo => {
                        const score = dssEducationGraphsCopy[category]['content'][graph].values[algo];
                        const log_score = Math.log(score);

                        if (score > max_score) {
                            max_score = score;
                        }

                        if (log_score > max_log_score) {
                            max_log_score = log_score;
                        }

                        if (log_score < min_log_score) {
                            min_log_score = log_score;
                        }

                        if (score < min_value) {
                            min_value = score;
                        }
                    });

                    // Compute OFFSET
                    const OFFSET = 0.1 - Math.log2(min_value) * FACTOR;

                    // Convert scores to percentage of max_score and calculate scaled percentages
                    Object.keys(dssEducationGraphsCopy[category]['content'][graph].values).forEach(algo => {
                        const score = dssEducationGraphsCopy[category]['content'][graph].values[algo];
                        const log_score = Math.log(score);

                        dssEducationGraphsCopy[category]['content'][graph].values[algo] = {};
                        dssEducationGraphsCopy[category]['content'][graph].values[algo].score = score;
                        dssEducationGraphsCopy[category]['content'][graph].values[algo].percentage = ((score / max_score) * 100).toFixed(0);
                        dssEducationGraphsCopy[category]['content'][graph].values[algo].percentage_for_log_graph = ((log_score / max_log_score) * 100).toFixed(0);

                        // Calculate scaled percentage_for_log_graph
                        let scaled_percentage;
                        if (max_log_score === min_log_score) {
                            // Avoid division by zero when all log_scores are equal
                            scaled_percentage = 100;
                        } else {
                            scaled_percentage = 5 + 95 * ((log_score - min_log_score) / (max_log_score - min_log_score));
                        }
                        dssEducationGraphsCopy[category]['content'][graph].values[algo].scaled_percentage_for_log_graph_old = scaled_percentage.toFixed(0);

                        // Compute GRAPHVALUE = LOG2(VALUE) * FACTOR + OFFSET
                        const graph_value = ((Math.log2(score) * FACTOR + OFFSET) * 100);
                        dssEducationGraphsCopy[category]['content'][graph].values[algo].scaled_percentage_for_log_graph = graph_value.toFixed(0);
                    });
                });
            });

            // Return the modified copy
            return dssEducationGraphsCopy;
        },


    },
}
</script>