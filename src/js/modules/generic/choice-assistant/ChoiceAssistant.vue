<template>
    <div class="hidden platform-viewport-breakpoint:block pb-12">
        <ChoiceAssistantStandard :title_text="title_text" :questions="questions"
            :algorithm_comparisons_to_show="algorithm_comparisons_to_show" :current_question="current_question"
            :scores="scores" :answered_questions="answered_questions" />
    </div>
    <div class="block platform-viewport-breakpoint:hidden">
        <ChoiceAssistantMobile :title_text="title_text" :questions="questions"
            :algorithm_comparisons_to_show="algorithm_comparisons_to_show" :current_question="current_question"
            :scores="scores" :answered_questions="answered_questions" />
    </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import ChoiceAssistantStandard from './ChoiceAssistantStandard/ChoiceAssistantStandard.vue';
import ChoiceAssistantMobile from './ChoiceAssistantMobile/ChoiceAssistantMobile.vue';
export default {
    props: {
        title_text: {
            type: String,
            required: true,
        },
        questions: {
            type: Object,
            required: true,
        },
        algorithm_comparisons: {
            type: Object,
            required: false,
        },
        current_question: {
            type: Array,
            required: true,
        },
    },
    inject: ['language'],
    components: {
        ChoiceAssistantStandard,
        ChoiceAssistantMobile,
    },
    mounted() {
        this.initSelectedAnswers();
    },
    provide() {
        return {
            generatePDF: this.generatePDF, // We provide the method, in order to not prop drill.
        };
    },
    methods: {
        initSelectedAnswers() {
            this.questions.forEach((category, i) => {
                category.content.forEach((question, j) => {
                    question.selected_answers = []
                    question.marked_as_important = false
                });
            });

            console.log("DSS Questions Anwers have been RESET!")
            console.log(this.questions[0].content[0])
        },
        generatePDF() {
            const doc = new jsPDF();

            // Define margins
            const leftMargin = 15;
            const rightMargin = 195; // 210 - 15
            var yPosition = 20; // Starting y position

            // Define colors
            const primaryColor = [63, 82, 159];     // primary: '#3f529f'   // dark blue
            const secondaryColor = [65, 181, 144];  // secondary: '#41b590' // green
            const tertiaryColor = [243, 255, 251];  // tertiary: '#f3fffb'  // light green
            const quadrinaryColor = [235, 146, 52]; // quadrinary: '#eb9234' // orange

            // Set up fonts
            doc.setFont('helvetica');

            // Add Title
            doc.setFontSize(18);
            doc.setTextColor(...primaryColor);
            doc.setFont('helvetica', 'bold');
            doc.text(
                this.title_text + (this.language.current == 'EN' ? ' Summary' : ' Samenvatting'),
                105,
                yPosition,
                null,
                null,
                'center'
            );
            yPosition += 10;

            // Add small centered text right below the title, with the current date
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(
                this.$version + ' - ' + new Date().toLocaleDateString(this.language.current == 'EN' ? 'en-GB' : 'nl-NL'),
                105,
                yPosition,
                null,
                null,
                'center'
            );
            yPosition += 10;

            // Add Algorithm Scores
            const algorithmScores = this.scores?.scores ?? {};

            // Add a new page for the algorithms if necessary
            if (yPosition + 60 > 290) {
                doc.addPage();
                yPosition = 20;
            } else {
                yPosition += 10;
            }

            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...primaryColor);
            doc.text(
                this.language.current == 'EN' ? 'Algorithm Scores' : 'Algoritme Scores',
                105,
                yPosition,
                null,
                null,
                'center'
            );
            yPosition += 10;

            // Convert algorithm scores into an array for AutoTable
            const scoresArray = Object.keys(algorithmScores).map((key) => {
                return {
                    algorithm: key,
                    score: algorithmScores[key].toFixed(0) + ' / 100'
                };
            });

            // Define table columns
            const columns = [
                { header: this.language.current == 'EN' ? 'Algorithm' : 'Algoritme', dataKey: 'algorithm' },
                { header: this.language.current == 'EN' ? 'Score' : 'Score', dataKey: 'score' },
            ];

            // Add table using AutoTable
            doc.autoTable({
                startY: yPosition,
                head: [columns.map(col => col.header)],
                body: scoresArray.map(row => columns.map(col => row[col.dataKey])),
                styles: { fontSize: 11 },
                headStyles: { fillColor: primaryColor },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                margin: { left: leftMargin, right: leftMargin },
                theme: 'grid',
            });

            // Update yPosition after table
            yPosition = doc.autoTable.previous.finalY + 10;

            // Add Excluded Algorithms, if any
            if (this.scores.excluded_algorithms && this.scores.excluded_algorithms.length > 0) {
                if (yPosition + 50 > 290) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...quadrinaryColor);
                doc.text(
                    this.language.current == 'EN' ? 'Excluded Algorithms' : 'Uitgesloten Algoritmen',
                    105,
                    yPosition,
                    null,
                    null,
                    'center'
                );
                yPosition += 10;

                // For each excluded algorithm
                this.scores.excluded_algorithms.forEach((excluded) => {
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...quadrinaryColor);
                    const algorithmName = excluded.algorithm;
                    doc.text(algorithmName, leftMargin, yPosition);
                    yPosition += 6;

                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(0, 0, 0);
                    const exclusionReason = this.language.current == 'EN'
                        ? `Excluded due to the answer "${excluded.answer_text}" to the question "${excluded.question_text}"`
                        : `Uitgesloten vanwege het antwoord "${excluded.answer_text}" op de vraag "${excluded.question_text}"`;
                    const splitExclusionReason = doc.splitTextToSize(exclusionReason, rightMargin - leftMargin);
                    doc.text(splitExclusionReason, leftMargin + 5, yPosition);
                    yPosition += splitExclusionReason.length * 6 + 4;

                    // Check for page break
                    if (yPosition > 270) {
                        doc.addPage();
                        yPosition = 20;
                    }
                });
            }

            // Add Algorithm Comparisons, if any
            if (this.algorithm_comparisons_to_show.length > 0) {
                if (yPosition + 50 > 290) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...primaryColor);
                doc.text(
                    this.language.current == 'EN' ? 'Algorithm Comparisons' : 'Algoritme Vergelijkingen',
                    105,
                    yPosition,
                    null,
                    null,
                    'center'
                );
                yPosition += 10;

                // For each comparison
                this.algorithm_comparisons_to_show.forEach((comparison) => {
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...primaryColor);
                    const comparisonTitle = `${comparison.algorithms[0]} vs ${comparison.algorithms[1]}`;
                    doc.text(comparisonTitle, leftMargin, yPosition);
                    yPosition += 6;

                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(0, 0, 0);
                    const comparisonText = comparison.text;
                    const splitComparisonText = doc.splitTextToSize(comparisonText, rightMargin - leftMargin);
                    doc.text(splitComparisonText, leftMargin + 5, yPosition);
                    yPosition += splitComparisonText.length * 6 + 4;

                    // Check for page break
                    if (yPosition > 270) {
                        doc.addPage();
                        yPosition = 20;
                    }
                });
            }

            // Add a title showing that we are now entering the QA section
            if (yPosition + 20 > 290) {
                doc.addPage();
                yPosition = 20;
            }
            doc.setFontSize(16);
            doc.setTextColor(...primaryColor);
            doc.setFont('helvetica', 'bold');
            const qaTitle = this.language.current == 'EN' ? 'Questions and Answers' : 'Vragen en Antwoorden';
            doc.text(qaTitle, 105, yPosition, null, null, 'center');
            yPosition += 10;

            // Process Questions and Answers
            this.questions.forEach((category) => {
                // Check for page break before adding category title
                if (yPosition + 20 > 290) {
                    doc.addPage();
                    yPosition = 20;
                }

                // Add Category Title
                doc.setFontSize(16);
                doc.setTextColor(...secondaryColor);
                doc.setFont('helvetica', 'bold');
                const categoryTitle = category.category[this.language.current] ?? '';
                doc.text(categoryTitle, leftMargin, yPosition);
                yPosition += 8;

                category.content.forEach((question) => {
                    // Check if the question is marked as important
                    const isImportant = question.marked_as_important || false;

                    // Add Question Text
                    doc.setFontSize(12);
                    doc.setFont('helvetica', isImportant ? 'bold' : 'normal');
                    doc.setTextColor(...primaryColor);
                    let questionText = '';
                    // If expert level is set
                    if (question.expert_level) {
                        questionText +=
                            this.language.current == 'EN' ? '[Expert-level Question] ' : '[Expert Vraag] ';
                    }
                    // If marked important
                    if (isImportant) {
                        questionText +=
                            this.language.current == 'EN' ? '[Marked as Important] ' : '[Aangegeven als Belangrijk] ';
                    }
                    questionText += question.question[this.language.current] ?? '';

                    // Wrap text if necessary
                    const splitQuestionText = doc.splitTextToSize(questionText, rightMargin - leftMargin);
                    doc.text(splitQuestionText, leftMargin + 5, yPosition);
                    yPosition += splitQuestionText.length * 6;

                    // List Selected Answers
                    if (question.selected_answers && question.selected_answers.length > 0) {
                        question.selected_answers.forEach((answerIndex) => {
                            doc.setFontSize(11);
                            doc.setFont('helvetica', 'normal');
                            doc.setTextColor(0, 0, 0);
                            const answerText = question.answers[answerIndex].text[this.language.current] ?? '';
                            // Wrap answer text if necessary
                            const splitAnswerText = doc.splitTextToSize(`- ${answerText}`, rightMargin - leftMargin - 10);
                            doc.text(splitAnswerText, leftMargin + 10, yPosition);
                            yPosition += splitAnswerText.length * 6;
                        });
                    } else {
                        doc.setFontSize(11);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(0, 0, 0);
                        const noAnswerText = this.language.current == 'EN'
                            ? '- No answer selected'
                            : '- Geen antwoord geselecteerd';
                        doc.text(noAnswerText, leftMargin + 10, yPosition);
                        yPosition += 6;
                    }

                    // Add spacing between questions
                    yPosition += 4;

                    // Check for page break
                    if (yPosition > 270) {
                        doc.addPage();
                        yPosition = 20;
                    }
                });

                // Add spacing between categories
                yPosition += 6;
            });

            // Save the PDF
            const filename = this.title_text + (this.language.current == 'EN' ? 'Summary.pdf' : 'Samenvatting.pdf');
            doc.save(filename);
        },

    },
    computed: {
        scores() {
            var scores = {};

            if (!this.questions || this.questions.length == 0) {
                return {
                    scores: scores,
                    excluded_algorithms: [],
                };
            }

            // Step 1: Initialize ignore_algorithms as a Set
            var ignore_algorithms = new Set();

            // Initialize excluded_algorithms_dict to keep track of exclusion reasons
            var excluded_algorithms_dict = {};

            // Get the current language, default to 'EN' if not set
            const seleted_language = this.language.current || 'EN';

            // Go through all questions and selected answers, and find algorithms to ignore
            this.questions.forEach((category) => {
                category.content.forEach((question) => {
                    if (question.selected_answers && question.selected_answers.length > 0) {

                        if (!question.custom_scoring) {
                            question.selected_answers.forEach((answer_index) => {
                                const answer = question.answers[answer_index];
                                const scores_for_answer = answer.scores;

                                for (const [key, value] of Object.entries(scores_for_answer)) {
                                    if (value === -1) {
                                        ignore_algorithms.add(key);

                                        // Only collect the exclusion reason if we haven't already for this algorithm
                                        if (!excluded_algorithms_dict.hasOwnProperty(key)) {
                                            // Get the question and answer texts in the correct language
                                            const question_text = question.question[seleted_language] || '';
                                            const answer_text = answer.text[seleted_language] || '';

                                            const customer_message = answer?.error_message?.[seleted_language]
                                                ? answer.error_message[seleted_language]
                                                : null;
                                            excluded_algorithms_dict[key] = {
                                                algorithm: key,
                                                question_text: question_text,
                                                answer_text: answer_text,
                                                customer_message: customer_message,
                                            };
                                        }
                                    }
                                }
                            });
                        } else {
                            // HANDLE QUESTION WITH CUSTOM SCORING
                            if (question.custom_scoring === 'OR') {
                                // Initialize a set to collect all unique algorithm keys from selected answers
                                const algorithmKeys = new Set();
                                question.selected_answers.forEach((answer_index) => {
                                    const answer = question.answers[answer_index];
                                    Object.keys(answer.scores).forEach((key) => algorithmKeys.add(key));
                                });

                                // Iterate through each algorithm to check if all selected answers have a score of -1
                                algorithmKeys.forEach((key) => {
                                    const allNegative = question.selected_answers.every((answer_index) => {
                                        const answer = question.answers[answer_index];
                                        return answer.scores[key] == -1;
                                    });

                                    if (allNegative) {
                                        ignore_algorithms.add(key);

                                        // Only collect the exclusion reason if we haven't already for this algorithm
                                        if (!excluded_algorithms_dict.hasOwnProperty(key)) {
                                            // For custom scoring, you might want to aggregate reasons from all answers
                                            // Here, we'll concatenate the answer texts and customer messages
                                            let combinedAnswerTexts = [];
                                            let combinedCustomerMessages = [];

                                            question.selected_answers.forEach((answer_index) => {
                                                const answer = question.answers[answer_index];
                                                combinedAnswerTexts.push(answer.text[seleted_language] || '');
                                                if (answer.error_message && answer.error_message[seleted_language]) {
                                                    combinedCustomerMessages.push(answer.error_message[seleted_language]);
                                                }
                                            });

                                            excluded_algorithms_dict[key] = {
                                                algorithm: key,
                                                question_text: question.question[seleted_language] || '',
                                                answer_text: combinedAnswerTexts.join('; '),
                                                customer_message: combinedCustomerMessages.length > 0 ? combinedCustomerMessages.join('; ') : null,
                                            };
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            });

            // Step 2: Initialize scores object with all possible algorithms as keys, excluding ignored ones
            this.questions.forEach((category) => {
                category.content.forEach((question) => {
                    question.answers.forEach((answer) => {
                        for (const [key, value] of Object.entries(answer.scores)) {
                            if (
                                !ignore_algorithms.has(key) &&
                                !scores.hasOwnProperty(key) &&
                                !isNaN(value)
                            ) {
                                scores[key] = 0;
                            }
                        }
                    });
                });
            });

            var num_of_answered_questions = 0;
            var num_questions_marked_important = 0;

            // Initialize total scores for each algorithm.
            var total_scores = {};
            for (var key in scores) {
                total_scores[key] = 0;
            }


            const personolized_advices = [];

            // Calculate the total scores for each algorithm.
            this.questions.forEach((category) => {
                category.content.forEach((question) => {

                    // handle personolized message given the answer
                    if (question.selected_answers && question.selected_answers.length > 0){
                        // if atleast one of the selected answer has an error message that is not null
                        if(question.answers.filter((answer, i) => question.selected_answers.includes(i)).map((answer) => answer.error_message[seleted_language]).some((error_message) => error_message)){
                            personolized_advices.push({
                                question: question.question[seleted_language],
                                answer_message_pairs: [],
                            })

                            // for selected answers if the error message is not null
                            question.selected_answers.forEach((answer_index) => {
                                const answer = question.answers[answer_index];
                                if(answer.error_message[seleted_language]){
                                    personolized_advices[personolized_advices.length - 1].answer_message_pairs.push({
                                        answer: answer.text[seleted_language],
                                        message: answer.error_message[seleted_language],
                                    })
                                }
                            })
                        }
                    }



                    if (question.selected_answers && question.selected_answers.length > 0 & question.scoring_question) {
                        num_of_answered_questions += 1;

                        // Check if the question is marked as important.
                        var isImportant = question.marked_as_important || false; // Adjust property name if different.
                        if (isImportant) {
                            num_questions_marked_important += 1;
                        }

                        // Keep track of all answers to this question.
                        var num_selected_answers = 0;
                        var question_scores = {};
                        for (var key in scores) {
                            question_scores[key] = 0;
                        }

                        // Calculate the scores for each answer to this question.
                        if (!question.custom_scoring) {
                            question.selected_answers.forEach((answer_index) => {
                                const answer = question.answers[answer_index];
                                const scores_for_answer = answer.scores;

                                // Multiplier for important questions.
                                var multiplier = isImportant ? 2 : 1;

                                // Sum up the scores for each algorithm.
                                for (const [key, value] of Object.entries(scores_for_answer)) {
                                    if (isNaN(value) || ignore_algorithms.has(key)) {
                                        continue;
                                    }
                                    question_scores[key] += multiplier * value;
                                }
                                num_selected_answers++;
                            });

                            // Add the average scores for this question to the total.
                            for (var key in scores) {
                                total_scores[key] += question_scores[key] / num_selected_answers;
                            }
                        } else {
                            // We iterate over all selected answer scores.
                            // and we take the highest one given to each algorithm.
                            // Then that highest number is what we add to the total score.

                            // Initialize question_scores to hold the highest scores.
                            var question_scores = {};
                            for (var key in scores) {
                                question_scores[key] = null; // Use null to represent no score yet.
                            }

                            // Iterate over selected answers.
                            question.selected_answers.forEach((answer_index) => {
                                const answer = question.answers[answer_index];
                                const scores_for_answer = answer.scores;

                                // For each algorithm, keep the highest score.
                                for (const [key, value] of Object.entries(scores_for_answer)) {
                                    if (isNaN(value) || ignore_algorithms.has(key)) {
                                        continue;
                                    }
                                    if (question_scores[key] === null || value > question_scores[key]) {
                                        question_scores[key] = value;
                                    }
                                }
                            });

                            // Multiplier for important questions.
                            var multiplier = isImportant ? 2 : 1;

                            // Multiply each highest score by multiplier and add to total_scores.
                            for (var key in scores) {
                                if (question_scores[key] !== null) {
                                    total_scores[key] += multiplier * question_scores[key];
                                }
                            }
                        }
                    }
                });
            });

            // Calculate the final score for each algorithm.
            var denominator = 5 * (num_of_answered_questions + num_questions_marked_important);

            for (var key in scores) {
                var T_alg = total_scores[key];

                if (denominator > 0) {
                    scores[key] = (100 * T_alg) / denominator;
                    // Ensure the score is between 0 and 100.
                    scores[key] = Math.max(0, Math.min(100, scores[key]));
                } else {
                    scores[key] = 0;
                }
            }

            // Convert excluded_algorithms_dict to an array
            var excluded_algorithms = Object.values(excluded_algorithms_dict);

            return {
                scores: scores,
                excluded_algorithms: excluded_algorithms,
                personolized_advices: personolized_advices,
            };
        },
        algorithm_comparisons_to_show() {
            if (!this.algorithm_comparisons || !this.scores?.scores) {
                return [];
            }

            const scores = this.scores?.scores;
            const comparisonsData = this.algorithm_comparisons;
            const language = this.language.current; // 'EN' or 'NL'

            const algorithms = Object.keys(scores);
            var algorithm_comparisons_to_show = [];

            for (var i = 0; i < algorithms.length; i++) {
                for (var j = i + 1; j < algorithms.length; j++) {
                    const alg1 = algorithms[i];
                    const alg2 = algorithms[j];

                    const diff = Math.abs(scores[alg1] - scores[alg2]);

                    if (diff <= 10) {
                        // Try to get the comparison text
                        var comparisonText = null;

                        if (
                            comparisonsData[alg1] &&
                            comparisonsData[alg1][alg2] &&
                            comparisonsData[alg1][alg2][language]
                        ) {
                            comparisonText = comparisonsData[alg1][alg2][language];
                        } else if (
                            comparisonsData[alg2] &&
                            comparisonsData[alg2][alg1] &&
                            comparisonsData[alg2][alg1][language]
                        ) {
                            comparisonText = comparisonsData[alg2][alg1][language];
                        }

                        if (comparisonText) {
                            algorithm_comparisons_to_show.push({
                                algorithms: [alg1, alg2],
                                text: comparisonText,
                                score_difference: diff
                            });
                        }
                    }
                }
            }

            return algorithm_comparisons_to_show;
        },
        answered_questions() {
            var answered_questions = [];

            if (!this.questions || this.questions.length == 0) {
                return answered_questions;
            }

            this.questions.forEach((category, i) => {
                category.content.forEach((question, j) => {
                    if (question.selected_answers?.length > 0) {
                        answered_questions.push({
                            index: [i, j],
                            expert_level: question.expert_level,
                            question: question.question[this.language?.current ?? 'EN'],
                            answers: question.selected_answers.map((answer_index) => {
                                return question.answers[answer_index].text[this.language?.current ?? 'EN'];
                            }),
                        });
                    }
                });
            });

            return answered_questions;
        }
    },
}
</script>