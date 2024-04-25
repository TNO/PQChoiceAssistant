// kemCalculateScores.js
const questions = [
    {
        type: 'checkbox',
        name: 'q1',
        topic: 'Operations',
        intro: 'The characteristics of the various post-quantum cryptography algorithms vary per operation. For example, certain algorithms may be more efficient when it comes to encryption while others will be faster during key generation. To give the best recommendation, it is important to know which operations will be predominantly used in your application. If all of them are equally important or you do not (yet) know which one will be used most, the overall best performing algorithms will be selected.',
        prompt: 'What cryptographic operations are the most important in your use-case?',
        options: ['Key generation', 'Encapsulation', 'Decapsulation', "Do not know"],
    },
    {
        type: 'slider',
        name: 'q2',
        topic: 'Timespan',
        intro: 'If your organization is dealing with information that should remain secure for an extended period of time, it may be beneficial to invest in a more conservative post-quantum cryptographic scheme. This ensures that you minimize the chance of the scheme being vulnerable in the future and thus increasing the assurance that the data will remain secure for its entire lifespan. If you do not know how long your data should stay secure, choose -1.',
        prompt: 'For how many years does the data that you are protecting have to stay secure?',
        options: [-1, 30, -1, 'years'],
    },
    {
        type: 'radio',
        name: 'q2 (Follow-up)',
        topic: 'Classified information',
        intro: "For the protection of classified information, some specific rules and requirements may apply. In case you do not know what classified information is, or in case you are not sure whether your application handles classified information, the answer to the following question is probably 'No'. The AIVD can provide guidance on these rules and requirements.",
        prompt: 'Are you working with classified information?',
        options: ['Yes', 'No', "Do not know"],
    },
    {
        type: 'radio',
        name: 'q3',
        topic: 'Performance vs. security',
        intro: 'The design of the new post-quantum schemes is different from the conventionally used RSA and ECC. The designs are based on different mathematical problems. Some schemes are very efficient, but considered less mature, while some others are considered more conservative, but they pay the price in efficiency. It is important to evaluate the trade-off performance versus security when choosing the appropriate scheme.',
        prompt: 'In my use case, I can afford to trade performance for security.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'radio',
        name: 'q3-1',
        topic: 'Conservativeness vs. efficiency',
        prompt: 'My use case is willing to opt for a conservative choice at the expense of efficiency.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
        tooltip: ['conservative', 'Approach that prioritizes security over efficiency. The design bases its security on well understood mathematical problems, trying to minimize the risk of introducing vulnerabilities'],
    },
    {
        type: 'radio',
        name: 'q3-2',
        topic: 'Security level',
        intro: 'NIST has defined 5 levels of security as their evaluation criteria for the security of candidate post-quantum schemes. Every level is designed to meet the current requirements for bit security: Level 1 equals 128 bits of security, Level 3 equals 192 bits of security, and Level 5 equals 256 bits of security. Note that there are no variants of the schemes that directly correspond to Levels 2 and 4, so they are omitted here.',
        prompt: 'What is the required security level for your application?',
        options: [
            '128 bits - NIST level 1 - 3072 bit RSA keys - 256 bit ECC keys',
            '192 bits - NIST level 3 - 7680 bit RSA keys - 384 bit ECC keys',
            '256 bits - NIST level 5 - 15360 bit RSA keys - 521 bit ECC keys',
            "Do not know"
        ],
        tooltip: ['security', 'See nist.gov'],
    },
    {
        type: 'radio',
        name: 'q3-3',
        topic: 'Hybrid mode',
        intro: 'You may consider the option of using post-quantum cryptography in hybrid mode: using conventional and post-quantum cryptography together. The advantage of using hybrid cryptography is that the security remains guaranteed as long as one of the two schemes is secure, and it may aid backward compatibility.',
        prompt: 'Can your use case support the use of two cryptographic algorithms (conventional and post-quantum) in hybrid mode?',
        options: ['Yes', 'No', "Do not know"],
    },
    {
        type: 'radio',
        name: 'q4',
        topic: 'Standardization',
        intro: 'As the scrutiny of the new schemes is ongoing, some schemes are ready or almost ready for standardization. Different standardization bodies may choose different schemes for standardization and with different timelines. In case your application follows specific standardization bodies, for example because you are mandated by the government, it is important to note it when selecting the most suitable algorithm.',
        prompt: 'Are you required to follow standardization bodies?',
        options: ['NIST', 'ISO', 'IETF', "Do not know"],
    },
    {
        type: 'checkbox',
        name: 'q5',
        topic: 'Platform',
        intro: 'The availability of cryptographic schemes for a large number of applications is tied to the hardware in which they operate. Some larger implementations may not fit the desired platform.',
        prompt: 'On what kind of platform will you use the cryptographic operations?',
        options: ['Laptop (or higher performance)', 'Smart phone', 'IoT device', 'Smart card', 'Sensor', "Do not know"],
    },
    {
        type: 'checkbox',
        name: 'q5-1',
        topic: 'Hardware acceleration',
        intro: 'The performance of post-quantum schemes in hardware can be improved if paired with cryptographic accelerators.',
        prompt: 'Does your device support hardware accelerators?',
        options: ['Hash function calls', 'Polynomial operations', "Do not know"],
    },
    {
        type: 'radio',
        name: 'q6',
        topic: 'New hardware',
        intro: 'For hardware applications, it can occur that the hardware cannot be replaced or updated. Some schemes can be re-designed to accommodate pre-existing hardware, but it is possible that new hardware may be required to execute the operation of the new post-quantum algorithms.',
        prompt: 'My use case can afford to use new hardware.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'radio',
        name: 'q7',
        topic: 'Space requirement',
        intro: 'The design of the new cryptographic schemes often makes them slower than the currently deployed cryptographic schemes like RSA and ECC and will use larger cryptographic keys. The new schemes may become a bottleneck for the application, both in resources and time. The application will have to handle larger cryptographic materials (keys, ciphertexts, etc.) which have to be stored and transmitted.',
        prompt: 'My use case can afford larger cryptographic keys and ciphertexts than currently in use.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q7-1',
        topic: 'Communication requirement',
        intro: 'The larger cryptographic keys and ciphertexts will need to be handled in all the stages of data handling: data in transit, data in use and data at rest. It is paramount that the application can allocate additional resources to the different stages of data handling. If you want to answer one of the expert questions, but do not know an answer to one of the others, choose -1.',
        prompt: 'Can your use case afford additional communication cost (in bandwidth)?',
        options: [-1, 100, -1, "kB"],
    },
    {
        type: 'slider',
        name: 'q7-2',
        topic: 'Memory requirement',
        prompt: 'Can your use case afford additional RAM usage?',
        options: [-1, 100, -1, "kB"],
    },
    {
        type: 'slider',
        name: 'q7-3',
        topic: 'Storage requirement',
        prompt: 'Can your use case afford additional long-term storage?',
        options: [-1, 100, -1, "kB"],
    },
    {
        type: 'radio',
        name: 'q8',
        topic: 'Delay requirement',
        intro: 'The post-quantum cryptographic schemes may be less efficient than the currently used schemes, which may negatively impact the application they are operating in, especially if it is time sensitive.',
        prompt: 'My use case can afford additional delay compared to the currently solution in place.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q8-1',
        topic: 'Communication time',
        intro: 'If you want to answer one of the expert questions, but do not know an answer to the other, choose -1.',
        prompt: 'Can your use case afford additional communication costs (in time)?',
        options: [-1, 1000, -1, 'milliseconds'],
    },
    {
        type: 'slider',
        name: 'q8-2',
        topic: 'Computation time',
        prompt: 'Can your use case afford additional computational time?',
        options: [-1, 1000, -1, 'milliseconds'],
    },
    {
        type: 'checkbox',
        name: 'q9',
        intro: 'Finally, you have the option to indicate which question topics are most important to you. These will be weighed more heavily in the scoring. You can scroll up to review the questions.',
        prompt: 'Which of the topics above do you find extra important?',
        options: [],
    },
];


questions.slice(0, -1).forEach((question, index) => {
    questions[questions.length-1].options.push(`Question ${question.name.slice(1)}: ${question.topic}`);
});

function question1() {
    chosen = {mlkem: {performance: {}, size: {}}, frodokem: {performance: {}, size: {}}, mceliece: {performance: {}, size: {}}}
    if (sessionStorage.getItem('q1').includes('Key generation')) {
        chosen.mlkem.performance.keygen     = 5;
        chosen.frodokem.performance.keygen  = 2;
        chosen.mceliece.performance.keygen  = 1;
    }
    if (sessionStorage.getItem('q1').includes('Encapsulation')) {
        chosen.mlkem.performance.enc     = 5;
        chosen.frodokem.performance.enc  = 2;
        chosen.mceliece.performance.enc  = 4;
    }
    if (sessionStorage.getItem('q1').includes('Decapsulation')) {
        chosen.mlkem.performance.dec     = 5;
        chosen.frodokem.performance.dec  = 2;
        chosen.mceliece.performance.dec  = 3;
    }
    if (sessionStorage.getItem('q1').includes('Key generation') || sessionStorage.getItem('q1').includes('Decapsulation')) {
        chosen.mlkem.size.sk     = 5;
        chosen.frodokem.size.sk  = 1;
        chosen.mceliece.size.sk  = 4;
    }
    if (sessionStorage.getItem('q1').includes('Key generation') || sessionStorage.getItem('q1').includes('Encapsulation')) {
        chosen.mlkem.size.pk     = 5;
        chosen.frodokem.size.pk  = 2;
        chosen.mceliece.size.pk  = 0;
    }
    if (sessionStorage.getItem('q1').includes('Encapsulation') || sessionStorage.getItem('q1').includes('Decapsulation')) {
        chosen.mlkem.size.ctxt     = 3;
        chosen.frodokem.size.ctxt  = 1;
        chosen.mceliece.size.ctxt  = 5;
    }

    return chosen
}

function question2() {
    let scores2 = {mlkem: 3, frodokem: 4, mceliece: 5};

    // Include result from question 2
    if (sessionStorage.getItem('q2') > -1) {
        scores2.mlkem = Math.round(3 - sessionStorage.getItem('q2') * 2 / 30);
        scores2.frodokem = Math.round(4 - sessionStorage.getItem('q2') / 30);
    }

    // Include result from question 2 follow-up
    switch (sessionStorage.getItem('q2 (Follow-up)')) {
        case 'Yes':
            scores2.mlkem = (scores2.mlkem + 2)/2;
            scores2.frodokem = (scores2.frodokem + 3)/2;
            scores2.mceliece = (scores2.mceliece + 5)/2;
            break;
        case 'No':
            scores2.mlkem = (scores2.mlkem + 3)/2;
            scores2.frodokem = (scores2.frodokem + 3)/2;
            scores2.mceliece = (scores2.mceliece + 3)/2;
            break;
        default: // Do not know
            scores2.mlkem = (scores2.mlkem + 2)/2;
            scores2.frodokem = (scores2.frodokem + 3)/2;
            scores2.mceliece = (scores2.mceliece + 4)/2;
    }

    return scores2;
}

function question3() {
    let scores3 = {};
    // If Expert question 3-1 is answered or 3-3 is answered with something other than Do not know
    if (sessionStorage.getItem('q3-1') || (sessionStorage.getItem('q3-3') && sessionStorage.getItem('q3-3') != "Do not know")) {
        // Use expert answers of question 3-1 and 3-3

        switch (sessionStorage.getItem('q3-1')) {
            case 'Completely agree':
                scores3.mlkem      = 0;
                scores3.frodokem   = 4;
                scores3.mceliece   = 5;
                break;
            case 'Agree':
                scores3.mlkem      = 0;
                scores3.frodokem   = 3;
                scores3.mceliece   = 4;
                break;
            case 'Neutral':
                scores3.mlkem      = 0;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
                break;
            case 'Disagree':
                scores3.mlkem      = 4;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
                break;
            case 'Completely disagree':
                scores3.mlkem      = 5;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
                break;
            default:
                scores3.mlkem      = 0;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
        }

        switch (sessionStorage.getItem('q3-3')) {
            case 'Yes':
                scores3.mlkem      += 5;
                scores3.frodokem   += 3;
                scores3.mceliece   += 1;
                break;
            case 'No':
                scores3.mlkem      += 1;
                scores3.frodokem   += 3;
                scores3.mceliece   += 5;
                break;
            default: // Do not know
                scores3.mlkem      += 0;
                scores3.frodokem   += 0;
                scores3.mceliece   += 0;
        }

        // Normalise over subquestions if multiple were answered
        if (sessionStorage.getItem('q3-1') && sessionStorage.getItem('q3-3')) {
            scores3.mlkem      /= 2;
            scores3.frodokem   /= 2;
            scores3.mceliece   /= 2;
        }

    } else {
        // Use answer of Question 3
        switch (sessionStorage.getItem('q3')) {
            case 'Completely agree':
                scores3.mlkem      = 0;
                scores3.frodokem   = 4;
                scores3.mceliece   = 5;
                break;
            case 'Agree':
                scores3.mlkem      = 0;
                scores3.frodokem   = 3;
                scores3.mceliece   = 4;
                break;
            case 'Neutral':
                scores3.mlkem      = 0;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
                break;
            case 'Disagree':
                scores3.mlkem      = 4;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
                break;
            case 'Completely disagree':
                scores3.mlkem      = 5;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
                break;
            default:
                scores3.mlkem      = 0;
                scores3.frodokem   = 0;
                scores3.mceliece   = 0;
        }
    }

    return scores3;
}

function question4() {
    let scores4 = {mlkem: 0, frodokem: 0, mceliece: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q4').includes('NIST')) {
        scores4.mlkem       += 5;
        scores4.frodokem    += 1;
        scores4.mceliece    += 3;
        numberOfAnswers     += 1;
    }

    if (sessionStorage.getItem('q4').includes('ISO')) {
        scores4.mlkem       += 2;
        scores4.frodokem    += 2;
        scores4.mceliece    += 2;
        numberOfAnswers     += 1;
    }

    if (sessionStorage.getItem('q4').includes('IETF')) {
        scores4.mlkem       += 3;
        scores4.frodokem    += 0;
        scores4.mceliece    += 0;
        numberOfAnswers     += 1;
    }
    // If only Do not know or nothing is selected
    if (numberOfAnswers == 0) {
        return {mlkem: 5, frodokem: 3, mceliece: 3};
    }

    // Normalise over number of chosen standardisation bodies
    if (numberOfAnswers >= 1) {
        scores4.mlkem       /= numberOfAnswers;
        scores4.frodokem    /= numberOfAnswers;
        scores4.mceliece    /= numberOfAnswers;
    }

    return scores4;
}

function question5() {

    let scores5 = {mlkem: 0, frodokem: 0, mceliece: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q5-1')) {
        // Use answer of question 5-1
        if (sessionStorage.getItem('q5-1').includes('Hash function calls')) {
            scores5.mlkem       += 4;
            scores5.frodokem    += 4;
            scores5.mceliece    += 4;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5-1').includes('Polynomial operations')) {
            scores5.mlkem       += 5;
            scores5.frodokem    += 4;
            scores5.mceliece    += 4;
            numberOfAnswers     += 1;
        }
        if (numberOfAnswers == 0 && sessionStorage.getItem('q5').includes("Do not know")) {
            scores5.mlkem       += 3.5;
            scores5.frodokem    += 3;
            scores5.mceliece    += 3;
            numberOfAnswers     += 1;
        }
    } else if (sessionStorage.getItem('q5')) {
        // Use answer of question 5
        if (sessionStorage.getItem('q5').includes('Laptop (or higher performance)')) {
            scores5.mlkem       += 5;
            scores5.frodokem    += 5;
            scores5.mceliece    += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Smart phone')) {
            scores5.mlkem       += 5;
            scores5.frodokem    += 5;
            scores5.mceliece    += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('IoT device')) {
            scores5.mlkem       += 4;
            scores5.frodokem    += 3;
            scores5.mceliece    += 3;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Smart card')) {
            scores5.mlkem       += 3;
            scores5.frodokem    += 0;
            scores5.mceliece    += 0;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Sensor')) {
            scores5.mlkem       += 2;
            scores5.frodokem    += 0;
            scores5.mceliece    += 0;
            numberOfAnswers     += 1;
        }
        if (numberOfAnswers == 0 && sessionStorage.getItem('q5').includes("Do not know")) {
            scores5.mlkem       += 5;
            scores5.frodokem    += 3;
            scores5.mceliece    += 2;
            numberOfAnswers     += 1;
        }
    } else {
        // Nothing is selected in question 5 or 5-1
        scores5 = {mlkem: 3.5, frodokem: 3, mceliece: 3};
        numberOfAnswers += 1;
    }

    // Normalise over number of chosen standardisation bodies
    if (numberOfAnswers >= 1) {
        scores5.mlkem       /= numberOfAnswers;
        scores5.frodokem    /= numberOfAnswers;
        scores5.mceliece    /= numberOfAnswers;
    }

    return scores5;
}

function question6() {
    switch (sessionStorage.getItem('q6')) {
        case 'Completely agree':
            return {mlkem: 5, frodokem: 5, mceliece: 5};
        case 'Agree':
            return {mlkem: 4.5, frodokem: 4, mceliece: 4};
        case 'Neutral':
            return {mlkem: 4, frodokem: 3, mceliece: 3};
        case 'Disagree':
            return {mlkem: 3.5, frodokem: 2.5, mceliece: 2.5};
        case 'Completely disagree':
            return {mlkem: 3, frodokem: 2, mceliece: 2};
        default:
            return {mlkem: 0, frodokem: 0, mceliece: 0};
    }
}

function averageSizes(size) {
    let average = {all: 0, withoutSk: 0, withoutCtxt: 0};
    let numberOfSizes = {all: 0, withoutSk: 0, withoutCtxt: 0};
    if (size.sk || size.sk == 0) {
        average.all += size.sk;
        average.withoutCtxt += size.sk;
        numberOfSizes.all += 1;
        numberOfSizes.withoutCtxt += 1;
    }
    if (size.pk || size.pk == 0) {
        average.all += size.pk;
        average.withoutSk += size.pk;
        average.withoutCtxt += size.pk;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
        numberOfSizes.withoutCtxt += 1;
    }
    if (size.ctxt || size.ctxt == 0) {
        average.all += size.ctxt;
        average.withoutSk += size.ctxt;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (numberOfSizes.all > 0) {
        average.all /= numberOfSizes.all;
    } else {
        average.all = -1;
    }
    if (numberOfSizes.withoutSk > 0) {
        average.withoutSk /= numberOfSizes.withoutSk;
    } else {
        average.withoutSk = -1;
    }
    if (numberOfSizes.withoutCtxt > 0) {
        average.withoutCtxt /= numberOfSizes.withoutCtxt;
    } else {
        average.withoutCtxt = -1;
    }
    return average
}

function question7(chosen) {
    let scores7 = {mlkem: 0, frodokem: 0, mceliece: 0};
    if (!chosen.mlkem.size) {
        // No sizes were chosen in question 1
        return scores7;
    }
    averages = {mlkem: averageSizes(chosen.mlkem.size), frodokem: averageSizes(chosen.frodokem.size), mceliece: averageSizes(chosen.mceliece.size)};

    if (sessionStorage.getItem('q7')) {
        // Use answer to question 7
        scores7.mlkem = Math.round(averages.mlkem.all);
        scores7.frodokem = Math.round(averages.frodokem.all);
        scores7.mceliece = Math.round(averages.mceliece.all);
        switch (sessionStorage.getItem('q7')) {
            case 'Completely agree':
                scores7.mlkem = Math.max(0, scores7.mlkem);
                scores7.frodokem = Math.max(0, scores7.frodokem);
                scores7.mceliece = Math.max(0, scores7.mceliece);
                break;
            case 'Agree':
                scores7.mlkem = Math.max(0, scores7.mlkem - 1);
                scores7.frodokem = Math.max(0, scores7.frodokem - 1);
                scores7.mceliece = Math.max(0, scores7.mceliece - 1);
                break;
            case 'Neutral':
                scores7.mlkem = Math.max(0, scores7.mlkem - 2);
                scores7.frodokem = Math.max(0, scores7.frodokem - 2);
                scores7.mceliece = Math.max(0, scores7.mceliece - 2);
                break;
            case 'Disagree':
                scores7.mlkem = Math.max(0, scores7.mlkem - 3);
                scores7.frodokem = Math.max(0, scores7.frodokem - 3);
                scores7.mceliece = Math.max(0, scores7.mceliece - 3);
                break;
            case 'Completely disagree':
                scores7.mlkem = Math.max(0, scores7.mlkem - 4);
                scores7.frodokem = Math.max(0, scores7.frodokem - 4);
                scores7.mceliece = Math.max(0, scores7.mceliece - 4);
                break;
        }
    } else {
        // Use answers to questions 7-1, 7-2, 7-3
        let numberOfAnswers = 0;

        // Question 7-1
        if (sessionStorage.getItem('q7-1') > -1 && averages.mlkem.withoutSk > -1) {
            scores7.mlkem = Math.round((5 - averages.mlkem.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.mlkem.withoutSk);
            scores7.frodokem = Math.round((5 - averages.frodokem.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.frodokem.withoutSk);
            scores7.mceliece = Math.round((5 - averages.mceliece.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.mceliece.withoutSk);
            numberOfAnswers += 1
        } else if (averages.mlkem.withoutSk > -1) {
            scores7.mlkem = Math.max(0, Math.round(averages.mlkem.withoutSk) - 2);
            scores7.frodokem = Math.max(0, Math.round(averages.frodokem.withoutSk) - 2);
            scores7.mceliece = Math.max(0, Math.round(averages.mceliece.withoutSk) - 2);
            numberOfAnswers += 1;
        }

        // Question 7-2
        if (sessionStorage.getItem('q7-2') > -1) {
            scores7.mlkem += Math.round((5 - averages.mlkem.all)/100 * sessionStorage.getItem('q7-2') + averages.mlkem.all);
            scores7.frodokem += Math.round((5 - averages.frodokem.all)/100 * sessionStorage.getItem('q7-2') + averages.frodokem.all);
            scores7.mceliece += Math.round((5 - averages.mceliece.all)/100 * sessionStorage.getItem('q7-2') + averages.mceliece.all);
            numberOfAnswers += 1
        } else {
            scores7.mlkem += Math.max(0, Math.round(averages.mlkem.all) - 2);
            scores7.frodokem += Math.max(0, Math.round(averages.frodokem.all) - 2);
            scores7.mceliece += Math.max(0, Math.round(averages.mceliece.all) - 2);
            numberOfAnswers += 1;
        }

        // Question 7-3
        if (sessionStorage.getItem('q7-3') > -1 && averages.mlkem.withoutCtxt > -1) {
            scores7.mlkem += Math.round((5 - averages.mlkem.withoutCtxt)/100 * sessionStorage.getItem('q7-3') + averages.mlkem.withoutCtxt);
            scores7.frodokem += Math.round((5 - averages.frodokem.withoutCtxt)/100 * sessionStorage.getItem('q7-3') + averages.frodokem.withoutCtxt);
            scores7.mceliece += Math.round((5 - averages.mceliece.withoutCtxt)/100 * sessionStorage.getItem('q7-3') + averages.mceliece.withoutCtxt);
            numberOfAnswers += 1
        } else if (averages.mlkem.withoutCtxt > -1) {
            scores7.mlkem += Math.max(0, Math.round(averages.mlkem.withoutCtxt) - 2);
            scores7.frodokem += Math.max(0, Math.round(averages.frodokem.withoutCtxt) - 2);
            scores7.mceliece += Math.max(0, Math.round(averages.mceliece.withoutCtxt) - 2);
            numberOfAnswers += 1;
        }

        if (numberOfAnswers >= 1) {
            scores7.mlkem       /= numberOfAnswers;
            scores7.frodokem    /= numberOfAnswers;
            scores7.mceliece    /= numberOfAnswers;
        }

    }

    return scores7;
}

function averagePerformances(performance, size) {
    let average = {all: 0, withoutSk: 0};
    let numberOfSizes = {all: 0, withoutSk: 0};
    if (performance.keygen || performance.keygen == 0) {
        average.all += performance.keygen;
        average.withoutSk += performance.keygen;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (performance.enc || performance.enc == 0) {
        average.all += performance.enc;
        average.withoutSk += performance.enc;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (performance.dec || performance.dec == 0) {
        average.all += performance.dec;
        average.withoutSk += performance.dec;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (size.pk || size.pk == 0) {
        average.withoutSk += size.pk;
        numberOfSizes.withoutSk += 1;
    }
    if (size.ctxt || size.ctxt == 0) {
        average.withoutSk += size.ctxt;
        numberOfSizes.withoutSk += 1;
    }
    if (numberOfSizes.all > 0) {
        average.all /= numberOfSizes.all;
    } else {
        average.all = -1;
    }
    if (numberOfSizes.withoutSk > 0) {
        average.withoutSk /= numberOfSizes.withoutSk;
    } else {
        average.withoutSk = -1;
    }
    return average
}

function question8(chosen) {
    let scores8 = {mlkem: 0, frodokem: 0, mceliece: 0};
    if (!chosen.mlkem.size) {
        // No sizes were chosen in question 1
        return scores7;
    }
    averages = {mlkem: averagePerformances(chosen.mlkem.performance, chosen.mlkem.size), frodokem: averagePerformances(chosen.frodokem.performance, chosen.frodokem.size), mceliece: averagePerformances(chosen.mceliece.performance, chosen.mceliece.size)};

    if (sessionStorage.getItem('q8')) {
        // Use answer to question 7
        scores8.mlkem = Math.round(averages.mlkem.all);
        scores8.frodokem = Math.round(averages.frodokem.all);
        scores8.mceliece = Math.round(averages.mceliece.all);
        switch (sessionStorage.getItem('q8')) {
            case 'Completely agree':
                scores8.mlkem = Math.max(0, scores8.mlkem);
                scores8.frodokem = Math.max(0, scores8.frodokem);
                scores8.mceliece = Math.max(0, scores8.mceliece);
                break;
            case 'Agree':
                scores8.mlkem = Math.max(0, scores8.mlkem - 1);
                scores8.frodokem = Math.max(0, scores8.frodokem - 1);
                scores8.mceliece = Math.max(0, scores8.mceliece - 1);
                break;
            case 'Neutral':
                scores8.mlkem = Math.max(0, scores8.mlkem - 2);
                scores8.frodokem = Math.max(0, scores8.frodokem - 2);
                scores8.mceliece = Math.max(0, scores8.mceliece - 2);
                break;
            case 'Disagree':
                scores8.mlkem = Math.max(0, scores8.mlkem - 3);
                scores8.frodokem = Math.max(0, scores8.frodokem - 3);
                scores8.mceliece = Math.max(0, scores8.mceliece - 3);
                break;
            case 'Completely disagree':
                scores8.mlkem = Math.max(0, scores8.mlkem - 4);
                scores8.frodokem = Math.max(0, scores8.frodokem - 4);
                scores8.mceliece = Math.max(0, scores8.mceliece - 4);
                break;
        }
    } else {
        // Use answers to questions 8-1, 8-2, 8-3
        let numberOfAnswers = 0;

        // Question 8-1
        if (sessionStorage.getItem('q8-1') > -1 && averages.mlkem.withoutSk > -1) {
            scores8.mlkem = Math.round((5 - averages.mlkem.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.mlkem.withoutSk);
            scores8.frodokem = Math.round((5 - averages.frodokem.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.frodokem.withoutSk);
            scores8.mceliece = Math.round((5 - averages.mceliece.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.mceliece.withoutSk);
            numberOfAnswers += 1
        } else if (averages.mlkem.withoutSk > -1) {
            scores8.mlkem = Math.max(0, Math.round(averages.mlkem.withoutSk) - 2);
            scores8.frodokem = Math.max(0, Math.round(averages.frodokem.withoutSk) - 2);
            scores8.mceliece = Math.max(0, Math.round(averages.mceliece.withoutSk) - 2);
            numberOfAnswers += 1;
        }

        // Question 8-2
        if (sessionStorage.getItem('q8-2') > -1) {
            scores8.mlkem += Math.round((5 - averages.mlkem.all)/1000 * sessionStorage.getItem('q8-2') + averages.mlkem.all);
            scores8.frodokem += Math.round((5 - averages.frodokem.all)/1000 * sessionStorage.getItem('q8-2') + averages.frodokem.all);
            scores8.mceliece += Math.round((5 - averages.mceliece.all)/1000 * sessionStorage.getItem('q8-2') + averages.mceliece.all);
            numberOfAnswers += 1;
        } else {
            scores8.mlkem += Math.max(0, Math.round(averages.mlkem.all) - 2);
            scores8.frodokem += Math.max(0, Math.round(averages.frodokem.all) - 2);
            scores8.mceliece += Math.max(0, Math.round(averages.mceliece.all) - 2);
            numberOfAnswers += 1;
        }

        if (numberOfAnswers >= 1) {
            scores8.mlkem       /= numberOfAnswers;
            scores8.frodokem    /= numberOfAnswers;
            scores8.mceliece    /= numberOfAnswers;
        }

    }

    return scores8;
}

function calculateScores() {
    let mlkemScore = 0;
    let frodokemScore = 0;
    let mcelieceScore = 0;

    let maxScore = 35;

    // Question 1
    chosen = question1()

    // Question 2
    let scores2 = question2();
    let factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 2: Timespan') || sessionStorage.getItem('q9').includes('Question 2 (Follow-up): Classified information')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores2.mlkem;
    frodokemScore += factor * scores2.frodokem;
    mcelieceScore += factor * scores2.mceliece;

    // Question 3
    let scores3 = question3();
    factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 3: Performance vs. security') || sessionStorage.getItem('q9').includes('Question 3-1: Conservativeness vs. efficiency') || sessionStorage.getItem('q9').includes('Question 3-2: Security level') || sessionStorage.getItem('q9').includes('Question 3-3: Hybrid mode')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores3.mlkem;
    frodokemScore += factor * scores3.frodokem;
    mcelieceScore += factor * scores3.mceliece;

    // Question 4
    let scores4 = question4();
    factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 4: Standardization')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores4.mlkem;
    frodokemScore += factor * scores4.frodokem;
    mcelieceScore += factor * scores4.mceliece;

    // Question 5
    let scores5 = question5();
    factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 5: Platform') || sessionStorage.getItem('q9').includes('Question 5-1: Hardware acceleration')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores5.mlkem;
    frodokemScore += factor * scores5.frodokem;
    mcelieceScore += factor * scores5.mceliece;

    // Question 6
    let scores6 = question6();
    factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 6: New hardware')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores6.mlkem;
    frodokemScore += factor * scores6.frodokem;
    mcelieceScore += factor * scores6.mceliece;

    // Question 7
    let scores7 = question7(chosen);
    factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 7: Space requirement') || sessionStorage.getItem('q9').includes('Question 7-1: Communication requirement') || sessionStorage.getItem('q9').includes('Question 7-2: Memory requirement') || sessionStorage.getItem('q9').includes('Question 7-3: Storage requirement')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores7.mlkem;
    frodokemScore += factor * scores7.frodokem;
    mcelieceScore += factor * scores7.mceliece;

    // Question 8
    let scores8 = question8(chosen);
    factor = 1;
    if (sessionStorage.getItem('q9').includes('Question 8: Delay requirement') || sessionStorage.getItem('q9').includes('Question 8-1: Communication time') || sessionStorage.getItem('q9').includes('Question 8-2: Computation time')) {
        factor = 2;
        maxScore += 5;
    }
    mlkemScore += factor * scores8.mlkem;
    frodokemScore += factor * scores8.frodokem;
    mcelieceScore += factor * scores8.mceliece;

    //  Question 9 has been implemented with the factors above

    // Normalise to range 0-100
    mlkemScore = Math.round(mlkemScore / maxScore * 100);
    frodokemScore = Math.round(frodokemScore / maxScore * 100);
    mcelieceScore = Math.round(mcelieceScore / maxScore * 100);

    let scores = {"ML-KEM": mlkemScore, "FrodoKEM": frodokemScore, "McEliece": mcelieceScore};
    const sortedScores = Object.fromEntries(Object.entries(scores).sort(([, value1], [, value2]) => value2 - value1));

    return sortedScores;
}

function adviceSecurityLevel() {
    switch (sessionStorage.getItem('q3-2')) {
        case '128 bits - NIST level 1 - 3072 bit RSA keys - 256 bit ECC keys':
            return 'ML-KEM-512, FrodoKEM-640 or mceliece348864';
        case '192 bits - NIST level 3 - 7680 bit RSA keys - 384 bit ECC keys':
            return 'ML-KEM-768, FrodoKEM-976 or mceliece460896';
        case '256 bits - NIST level 5 - 15360 bit RSA keys - 521 bit ECC keys':
            return 'ML-KEM-1024, FrodoKEM-1344 or mceliece6688128';
        default:
            return false;
    }
}

const div = document.getElementById("form-wrapper");
div.innerHTML += '<p>You answered as follows:</p><br>';

questions.forEach(question => {
    let answer = sessionStorage.getItem(question.name);
    div.innerHTML += `<p><strong>Question ${question.name.slice(1)}:</strong> ${question.prompt} <strong>
        ${answer && answer != -1 ? answer + (question.type == "slider" ? " " + question.options[3] : "") : "Not answered"}</strong></p><br>`;
});

let scores = calculateScores();

div.innerHTML += '<br><h4>Your scores are as follows:</h4><br>';

for (const scheme in scores) {
    div.innerHTML += `<h3><center>${scheme}: ${scores[scheme]}</center></h3>`;
}

// Print advice basend on answer of question 4 (standardizations)
if (sessionStorage.getItem('q4') == 'NIST') {
    div.innerHTML += `<br><p>⚠️ Note: Based on your answer to question 4, you are bound by standardization. NIST is currently in the process of standardizing ML-KEM. McEliece is also a candidate in the fourth round of the NIST post-quantum cryptography competition.</p>`;
}

// Print advice basend on answer of question 2 follow-up
if (sessionStorage.getItem('q2 (Follow-up)') == 'Yes') {
    div.innerHTML += `<br><p>⚠️ Note: Based on your answer to question 2 (Follow-up), if your application handles (Dutch) classified information (Dutch: Gerubriceerde informatie), please contact the AIVD for guidance on how to protect classified data from the quantum threat.</p>`;
}

// Print advice based on answer of question 3-2
if (sessionStorage.getItem('q3-2') && sessionStorage.getItem('q3-2') !== "Do not know") {
    div.innerHTML += `<br><p>⚠️ Note: PQC algorithms with the same security level as your answer to question 3-2 would be ${adviceSecurityLevel()}.</p>`;
}
