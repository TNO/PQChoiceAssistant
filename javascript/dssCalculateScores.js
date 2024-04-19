// dssCalculateScores.js
const questions = [
    {
        type: 'checkbox',
        name: 'q1',
        topic: 'Operations',
        intro: 'The characteristics of the various post-quantum cryptography algorithms vary per operation. For example, certain algorithms may be more efficient when it comes to signing while others will be faster during key generation. To give the best recommendation, it is important to know which operations will be predominantly used in your application. If all of them are equally important or you do not (yet) know which one will be used most, the overall best performing algorithms will be selected.',
        prompt: 'What cryptographic operations are the most important in your use case?',
        options: ['Key generation', 'Signing', 'Verification', "Do not know"],
    },
    {
        type: 'slider',
        name: 'q2',
        topic: 'Timespan',
        intro: 'If your organization is dealing with information that should remain validated for an extended period of time, it may be beneficial to invest in a more conservative post-quantum cryptographic scheme. This ensures that you minimize the chance of the scheme being vulnerable in the future and thus increasing the assurance that the data will remain verified for its entire lifespan. If you do not know how long your data should stay secure, choose -1.',
        prompt: 'For how many years does the data that you are validating have to stay verified?',
        options: [-1, 30, -1, 'years'],
    },
    {
        type: 'radio',
        name: 'q2 (Follow-up)',
        topic: 'Classified information',
        intro: "For the protection of classified information, some specific rules and requirements may apply. In case you do not know what classified information is, or in case you are not sure whether your application handles classified information, the answer to the following question is probably 'No'. The NLNCSA (Dutch: Nationaal Bureau voor Verbindingsbeveiliging, NBV) can provide guidance on these rules and requirements.",
        prompt: 'Are you working with classified information?',
        options: ['Yes', 'No', "Do not know"],
    },
    {
        type: 'radio',
        name: 'q3',
        topic: 'Performance vs. security',
        intro: 'The design of the new post-quantum schemes is different from the conventionally used RSA and ECC. The designs are based on different mathematical problems. Some schemes are very efficient, but considered less mature, while some others are considered more conservative, but they pay the price in efficiency. It is important to evaluate the trade-off performance versus security when choosing the appropriate scheme',
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
        name: 'q5-2',
        topic: 'Floating point arithmetic',
        intro: 'Some cryptographic schemes actually require support for floating point arithmetic to enable a secure implementation.',
        prompt: 'Does your device support floating point arithmetic?',
        options: ['Yes', 'No', "Do not know"],
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
        intro: 'The design of the new cryptographic schemes often makes them slower than the currently deployed cryptographic schemes like RSA and ECC and will use larger cryptographic keys. The new schemes may become a bottleneck for the application, both in resources and time. The application will have to handle larger cryptographic materials (keys, signatures, etc.) which have to be stored and transmitted.',
        prompt: 'My use case can afford larger cryptographic keys and signatures than currently in use.',
        options: ['Completely disagree', 'Disagree', 'Neutral', 'Agree', 'Completely agree'],
    },
    {
        type: 'slider',
        name: 'q7-1',
        topic: 'Communication requirement',
        intro: 'The larger cryptographic keys and signatures will need to be handled in all the stages of data handling: data in transit, data in use and data at rest. It is paramount that the application can allocate additional resources to the different stages of data handling. If you want to answer one of the expert questions, but do not know an answer to one of the others, choose -1.',
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
        type: 'radio',
        name: 'q9',
        topic: 'Physical access',
        intro: 'Some schemes are easier to protect against side-channel attacks than others. In a side-channel attack, the attacker makes use of physical properties of a computation (power usage, fluctuations in computation time) to recover partial information on the secret. However, most of these attacks are only a concern when the attacker has a means to physically analyse the device in your application. The fact that an attacker has a means to access the device running the cryptographic operations is not by itself a security concern. However, it may be critical for your application to make sure that the secret key is not leaked by the device.',
        prompt: 'Can attackers potentially get physical access to your device and do you need to mitigate this risk?',
        options: ['Yes', 'No', "Do not know"],
    },
    {
        type: 'checkbox',
        name: 'q9-1',
        topic: 'Functionality',
        intro: 'The design of the operations for some cryptographic schemes makes it hard to implement side-channel countermeasures for some of their functionalities. It is therefore helpful to understand which operations in your application need to be fortified.',
        prompt: 'What functionality do you need to protect?',
        options: ['Key generation', 'Signing', 'Verification', "Do not know"],
    },
    {
        type: 'radio',
        name: 'q10',
        topic: 'Specific use-case requirements',
        intro: 'A specific class of signature schemes, known as stateful hash-based signature schemes, combines high security guarantees with better efficiency than its stateless counterpart. The limitation in this case, is that the scheme can only sign a limited amount of messages (typically between 2<sup>10</sup> and 2<sup>20</sup> signatures) and it requires a different key for every signature. Applications like secure booting are ideal for these schemes, but in general it is hard to adopt stateful hash-based schemes due to the difficulty in handling the signing keys.',
        prompt: 'My use case requires only a limited number of signatures, and is able to securely handle the cryptographic state, i.e., the set of all signing keys.',
        options: ['Yes', 'No', "Do not know"],
        tooltip: ['securely', 'Storing all signing keys without leakage and preventing to re-use signing keys']
    },
    {
        type: 'checkbox',
        name: 'q11',
        intro: 'Finally, you have the option to indicate which question topics are most important to you. These will be weighed more heavily in the scoring. You can scroll up to review the questions.',
        prompt: 'Which of the topics above do you find extra important?',
        options: [],
    },
];

questions.slice(0, -1).forEach((question, index) => {
    questions[questions.length-1].options.push(`Question ${question.name.slice(1)}: ${question.topic}`);
});

function question1() {
    chosen = {mldsa: {performance: {}, size: {}}, falcon: {performance: {}, size: {}}, slhdsa: {performance: {}, size: {}}, xmss: {performance: {}, size: {}}}
    if (sessionStorage.getItem('q1').includes('Key generation')) {
        chosen.mldsa.performance.keygen = 4;
        chosen.falcon.performance.keygen    = 2;
        chosen.slhdsa.performance.keygen   = 1;
        chosen.xmss.performance.keygen      = 2;
    }
    if (sessionStorage.getItem('q1').includes('Signing')) {
        chosen.mldsa.performance.sign   = 5;
        chosen.falcon.performance.sign      = 4;
        chosen.slhdsa.performance.sign     = 2;
        chosen.xmss.performance.sign        = 2;
    }
    if (sessionStorage.getItem('q1').includes('Verification')) {
        chosen.mldsa.performance.ver    = 4;
        chosen.falcon.performance.ver       = 5;
        chosen.slhdsa.performance.ver      = 2;
        chosen.xmss.performance.ver         = 5;
    }
    if (sessionStorage.getItem('q1').includes('Key generation') || sessionStorage.getItem('q1').includes('Signing')) {
        chosen.mldsa.size.sk    = 3;
        chosen.falcon.size.sk       = 4;
        chosen.slhdsa.size.sk      = 5;
        chosen.xmss.size.sk         = 2;
    }
    if (sessionStorage.getItem('q1').includes('Key generation') || sessionStorage.getItem('q1').includes('Verification')) {
        chosen.mldsa.size.pk    = 3;
        chosen.falcon.size.pk       = 4;
        chosen.slhdsa.size.pk      = 5;
        chosen.xmss.size.pk         = 3;
    }
    if (sessionStorage.getItem('q1').includes('Signing') || sessionStorage.getItem('q1').includes('Verification')) {
        chosen.mldsa.size.sig   = 4;
        chosen.falcon.size.sig      = 5;
        chosen.slhdsa.size.sig     = 1;
        chosen.xmss.size.sig        = 3;
    }

    return chosen
}

function question2() {
    let scores2 = {mldsa: 3, falcon: 3, slhdsa: 5, xmss: 5};

    // Include result from question 2
    if (sessionStorage.getItem('q2') > -1) {
        scores2.mldsa = Math.round(3 - sessionStorage.getItem('q2') * 2 / 30);
        scores2.falcon = Math.round(3 - sessionStorage.getItem('q2') * 2 / 30);
    }

    // Include result from question 2 follow-up
    switch (sessionStorage.getItem('q2 (Follow-up)')) {
        case 'Yes':
            scores2.mldsa = (scores2.mldsa + 4)/2;
            scores2.falcon = (scores2.falcon + 3)/2;
            scores2.slhdsa = (scores2.slhdsa + 5)/2;
            scores2.xmss = (scores2.xmss + 5)/2;
            break;
        case 'No':
            scores2.mldsa = (scores2.mldsa + 3)/2;
            scores2.falcon = (scores2.falcon + 3)/2;
            scores2.slhdsa = (scores2.slhdsa + 3)/2;
            scores2.xmss = (scores2.xmss + 3)/2;
            break;
        default: // Do not know
            scores2.mldsa = (scores2.mldsa + 3)/2;
            scores2.falcon = (scores2.falcon + 3)/2;
            scores2.slhdsa = (scores2.slhdsa + 4)/2;
            scores2.xmss = (scores2.xmss + 4)/2;
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
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 5;
                scores3.xmss        = 5;
                break;
            case 'Agree':
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 4;
                scores3.xmss        = 4;
                break;
            case 'Neutral':
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
                break;
            case 'Disagree':
                scores3.mldsa   = 4;
                scores3.falcon      = 4;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
                break;
            case 'Completely disagree':
                scores3.mldsa   = 5;
                scores3.falcon      = 5;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
                break;
            default:
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
        }

        switch (sessionStorage.getItem('q3-3')) {
            case 'Yes':
                scores3.mldsa   += 5;
                scores3.falcon      += 5;
                scores3.slhdsa     += 1;
                scores3.xmss        += 1;
                break;
            case 'No':
                scores3.mldsa   += 1;
                scores3.falcon      += 1;
                scores3.slhdsa     += 5;
                scores3.xmss        += 5;
                break;
            default: // Do not know
                scores3.mldsa   += 0;
                scores3.falcon      += 0;
                scores3.slhdsa     += 0;
                scores3.xmss        += 0;
        }

        // Normalise over subquestions if multiple were answered
        if (sessionStorage.getItem('q3-1') && sessionStorage.getItem('q3-3')) {
            scores3.mldsa   /= 2;
            scores3.falcon      /= 2;
            scores3.slhdsa     /= 2;
            scores3.xmss        /= 2;
        }

    } else {
        // Use answer of Question 3
        switch (sessionStorage.getItem('q3')) {
            case 'Completely agree':
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 5;
                scores3.xmss        = 5;
                break;
            case 'Agree':
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 4;
                scores3.xmss        = 4;
                break;
            case 'Neutral':
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
                break;
            case 'Disagree':
                scores3.mldsa   = 4;
                scores3.falcon      = 4;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
                break;
            case 'Completely disagree':
                scores3.mldsa   = 5;
                scores3.falcon      = 5;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
                break;
            default:
                scores3.mldsa   = 0;
                scores3.falcon      = 0;
                scores3.slhdsa     = 0;
                scores3.xmss        = 0;
        }
    }

    return scores3;
}

function question4() {
    let scores4 = {mldsa: 0, falcon: 0, slhdsa: 0, xmss: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q4').includes('NIST')) {
        scores4.mldsa   += 5;
        scores4.falcon      += 3;
        scores4.slhdsa     += 5;
        scores4.xmss        += 5;
        numberOfAnswers     += 1;
    }

    if (sessionStorage.getItem('q4').includes('ISO')) {
        scores4.mldsa   += 0;
        scores4.falcon      += 0;
        scores4.slhdsa     += 0;
        scores4.xmss        += 0;
        numberOfAnswers     += 1;
    }

    if (sessionStorage.getItem('q4').includes('IETF')) {
        scores4.mldsa   += 2;
        scores4.falcon      += 0;
        scores4.slhdsa     += 1;
        scores4.xmss        += 5;
        numberOfAnswers     += 1;
    }
    // If only Do not know or nothing is selected
    if (numberOfAnswers == 0) {
        return {mldsa: 5, falcon: 3, slhdsa: 4, xmss: 4};
    }

    // Normalise over number of chosen standardisation bodies
    if (numberOfAnswers >= 1) {
        scores4.mldsa   /= numberOfAnswers;
        scores4.falcon      /= numberOfAnswers;
        scores4.slhdsa     /= numberOfAnswers;
        scores4.xmss        /= numberOfAnswers;
    }

    return scores4;
}

function question5() {

    let scores5 = {mldsa: 0, falcon: 0, slhdsa: 0, xmss: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q5-1') || sessionStorage.getItem('q5-2')) {
        // Use answer of question 5-1
        if (sessionStorage.getItem('q5-1')) {
            if (sessionStorage.getItem('q5-1').includes('Hash function calls')) {
                scores5.mldsa   += 3;
                scores5.falcon      += 3;
                scores5.slhdsa     += 5;
                scores5.xmss        += 5;
                numberOfAnswers     += 1;
            }
            if (sessionStorage.getItem('q5-1').includes('Polynomial operations')) {
                scores5.mldsa   += 4;
                scores5.falcon      += 4;
                scores5.slhdsa     += 0;
                scores5.xmss        += 0;
                numberOfAnswers     += 1;
            }
            if (numberOfAnswers == 0 && sessionStorage.getItem('q5').includes("Do not know")) {
                scores5.mldsa   += 3;
                scores5.falcon      += 3;
                scores5.slhdsa     += 1;
                scores5.xmss        += 1;
                numberOfAnswers     += 1;
            }

            // Normalise over number of chosen standardisation bodies
            if (numberOfAnswers >= 1) {
                scores5.mldsa   /= numberOfAnswers;
                scores5.falcon      /= numberOfAnswers;
                scores5.slhdsa     /= numberOfAnswers;
                scores5.xmss        /= numberOfAnswers;
            }
            numberOfAnswers = 1;
        }
        if (sessionStorage.getItem('q5-2')) {
            switch (sessionStorage.getItem('q5-2')) {
                case 'Yes':
                    scores5.mldsa   += 3;
                    scores5.falcon      += 5;
                    scores5.slhdsa     += 3;
                    scores5.xmss        += 3;
                    break;
                case 'No':
                    scores5.mldsa   += 3;
                    scores5.falcon      += 0;
                    scores5.slhdsa     += 3;
                    scores5.xmss        += 3;
                    break;
                case "Do not know":
                    scores5.mldsa   += 3;
                    scores5.falcon      += 1;
                    scores5.slhdsa     += 3;
                    scores5.xmss        += 3;
                    break;
            }
            numberOfAnswers += 1;
        }

    } else if (sessionStorage.getItem('q5')) {
        // Use answer of question 5
        if (sessionStorage.getItem('q5').includes('Laptop (or higher performance)')) {
            scores5.mldsa   += 5;
            scores5.falcon      += 5;
            scores5.slhdsa     += 5;
            scores5.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Smart phone')) {
            scores5.mldsa   += 5;
            scores5.falcon      += 5;
            scores5.slhdsa     += 5;
            scores5.xmss        += 4;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('IoT device')) {
            scores5.mldsa   += 4;
            scores5.falcon      += 3;
            scores5.slhdsa     += 4;
            scores5.xmss        += 3;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Smart card')) {
            scores5.mldsa   += 3;
            scores5.falcon      += 3;
            scores5.slhdsa     += 0;
            scores5.xmss        += 0;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q5').includes('Sensor')) {
            scores5.mldsa   += 2;
            scores5.falcon      += 3;
            scores5.slhdsa     += 1;
            scores5.xmss        += 0;
            numberOfAnswers     += 1;
        }
        if (numberOfAnswers == 0 && sessionStorage.getItem('q5').includes("Do not know")) {
            scores5.mldsa   += 5;
            scores5.falcon      += 5;
            scores5.slhdsa     += 2;
            scores5.xmss        += 0;
            numberOfAnswers     += 1;
        }

    } else {
        // Nothing is selected in question 5 or 5-1
        scores5 = {mldsa: 5, falcon: 5, slhdsa: 2, xmss: 0};
        numberOfAnswers += 1;
    }

    // Normalise over number of chosen standardisation bodies
    if (numberOfAnswers >= 1) {
        scores5.mldsa   /= numberOfAnswers;
        scores5.falcon      /= numberOfAnswers;
        scores5.slhdsa     /= numberOfAnswers;
        scores5.xmss        /= numberOfAnswers;
    }

    return scores5;
}

function question6() {
    switch (sessionStorage.getItem('q6')) {
        case 'Completely agree':
            return {mldsa: 5, falcon: 5, slhdsa: 5, xmss: 5};
        case 'Agree':
            return {mldsa: 5, falcon: 5, slhdsa: 4, xmss: 3};
        case 'Neutral':
            return {mldsa: 4, falcon: 4, slhdsa: 3, xmss: 2};
        case 'Disagree':
            return {mldsa: 3, falcon: 3, slhdsa: 2, xmss: 1};
        case 'Completely disagree':
            return {mldsa: 2, falcon: 2, slhdsa: 1, xmss: 1};
        default:
            return {mldsa: 0, falcon: 0, slhdsa: 0, xmss: 0};
    }
}

function averageSizes(size) {
    let average = {all: 0, withoutSk: 0, withoutSig: 0};
    let numberOfSizes = {all: 0, withoutSk: 0, withoutSig: 0};
    if (size.sk || size.sk == 0) {
        average.all += size.sk;
        average.withoutSig += size.sk;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSig += 1;
    }
    if (size.pk || size.pk == 0) {
        average.all += size.pk;
        average.withoutSk += size.pk;
        average.withoutSig += size.pk;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
        numberOfSizes.withoutSig += 1;
    }
    if (size.sig || size.sig == 0) {
        average.all += size.sig;
        average.withoutSk += size.sig;
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
    if (numberOfSizes.withoutSig > 0) {
        average.withoutSig /= numberOfSizes.withoutSig;
    } else {
        average.withoutSig = -1;
    }
    return average
}

function question7(chosen) {
    let scores7 = {mldsa: 0, falcon: 0, slhdsa: 0, xmss: 0};
    if (!chosen.mldsa.size) {
        // No sizes were chosen in question 1
        return scores7;
    }
    averages = {mldsa: averageSizes(chosen.mldsa.size), falcon: averageSizes(chosen.falcon.size), slhdsa: averageSizes(chosen.slhdsa.size), xmss: averageSizes(chosen.xmss.size)};

    if (sessionStorage.getItem('q7')) {
        // Use answer to question 7
        scores7.mldsa = Math.round(averages.mldsa.all);
        scores7.falcon = Math.round(averages.falcon.all);
        scores7.slhdsa = Math.round(averages.slhdsa.all);
        scores7.xmss = Math.round(averages.xmss.all);
        switch (sessionStorage.getItem('q7')) {
            case 'Completely agree':
                scores7.mldsa = Math.max(0, scores7.mldsa);
                scores7.falcon = Math.max(0, scores7.falcon);
                scores7.slhdsa = Math.max(0, scores7.slhdsa);
                scores7.xmss = Math.max(0, scores7.xmss);
                break;
            case 'Agree':
                scores7.mldsa = Math.max(0, scores7.mldsa - 1);
                scores7.falcon = Math.max(0, scores7.falcon - 1);
                scores7.slhdsa = Math.max(0, scores7.slhdsa - 1);
                scores7.xmss = Math.max(0, scores7.xmss - 1);
                break;
            case 'Neutral':
                scores7.mldsa = Math.max(0, scores7.mldsa - 2);
                scores7.falcon = Math.max(0, scores7.falcon - 2);
                scores7.slhdsa = Math.max(0, scores7.slhdsa - 2);
                scores7.xmss = Math.max(0, scores7.xmss - 2);
                break;
            case 'Disagree':
                scores7.mldsa = Math.max(0, scores7.mldsa - 3);
                scores7.falcon = Math.max(0, scores7.falcon - 3);
                scores7.slhdsa = Math.max(0, scores7.slhdsa - 3);
                scores7.xmss = Math.max(0, scores7.xmss - 3);
                break;
            case 'Completely disagree':
                scores7.mldsa = Math.max(0, scores7.mldsa - 4);
                scores7.falcon = Math.max(0, scores7.falcon - 4);
                scores7.slhdsa = Math.max(0, scores7.slhdsa - 4);
                scores7.xmss = Math.max(0, scores7.xmss - 4);
                break;
        }
    } else {
        // Use answers to questions 7-1, 7-2, 7-3
        let numberOfAnswers = 0;

        // Question 7-1
        if (sessionStorage.getItem('q7-1') > -1 && averages.mldsa.withoutSk > -1) {
            scores7.mldsa = Math.round((5 - averages.mldsa.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.mldsa.withoutSk);
            scores7.falcon = Math.round((5 - averages.falcon.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.falcon.withoutSk);
            scores7.slhdsa = Math.round((5 - averages.slhdsa.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.slhdsa.withoutSk);
            scores7.xmss = Math.round((5 - averages.xmss.withoutSk)/100 * sessionStorage.getItem('q7-1') + averages.xmss.withoutSk);
            numberOfAnswers += 1
        } else if (averages.mldsa.withoutSk > -1) {
            scores7.mldsa = Math.max(0, Math.round(averages.mldsa.withoutSk) - 2);
            scores7.falcon = Math.max(0, Math.round(averages.falcon.withoutSk) - 2);
            scores7.slhdsa = Math.max(0, Math.round(averages.slhdsa.withoutSk) - 2);
            scores7.xmss = Math.max(0, Math.round(averages.xmss.withoutSk) - 2);
            numberOfAnswers += 1;
        }

        // Question 7-2
        if (sessionStorage.getItem('q7-2') > -1) {
            scores7.mldsa += Math.round((5 - averages.mldsa.all)/100 * sessionStorage.getItem('q7-2') + averages.mldsa.all);
            scores7.falcon += Math.round((5 - averages.falcon.all)/100 * sessionStorage.getItem('q7-2') + averages.falcon.all);
            scores7.slhdsa += Math.round((5 - averages.slhdsa.all)/100 * sessionStorage.getItem('q7-2') + averages.slhdsa.all);
            scores7.xmss += Math.round((5 - averages.xmss.all)/100 * sessionStorage.getItem('q7-2') + averages.xmss.all);
            numberOfAnswers += 1
        } else {
            scores7.mldsa += Math.max(0, Math.round(averages.mldsa.all) - 2);
            scores7.falcon += Math.max(0, Math.round(averages.falcon.all) - 2);
            scores7.slhdsa += Math.max(0, Math.round(averages.slhdsa.all) - 2);
            scores7.xmss += Math.max(0, Math.round(averages.xmss.all) - 2);
            numberOfAnswers += 1;
        }

        // Question 7-3
        if (sessionStorage.getItem('q7-3') > -1 && averages.mldsa.withoutSig > -1) {
            scores7.mldsa += Math.round((5 - averages.mldsa.withoutSig)/100 * sessionStorage.getItem('q7-3') + averages.mldsa.withoutSig);
            scores7.falcon += Math.round((5 - averages.falcon.withoutSig)/100 * sessionStorage.getItem('q7-3') + averages.falcon.withoutSig);
            scores7.slhdsa += Math.round((5 - averages.slhdsa.withoutSig)/100 * sessionStorage.getItem('q7-3') + averages.slhdsa.withoutSig);
            scores7.xmss += Math.round((5 - averages.xmss.withoutSig)/100 * sessionStorage.getItem('q7-3') + averages.xmss.withoutSig);
            numberOfAnswers += 1
        } else if (averages.mldsa.withoutSig > -1) {
            scores7.mldsa += Math.max(0, Math.round(averages.mldsa.withoutSig) - 2);
            scores7.falcon += Math.max(0, Math.round(averages.falcon.withoutSig) - 2);
            scores7.slhdsa += Math.max(0, Math.round(averages.slhdsa.withoutSig) - 2);
            scores7.xmss += Math.max(0, Math.round(averages.xmss.withoutSig) - 2);
            numberOfAnswers += 1;
        }

        if (numberOfAnswers >= 1) {
            scores7.mldsa   /= numberOfAnswers;
            scores7.falcon      /= numberOfAnswers;
            scores7.slhdsa     /= numberOfAnswers;
            scores7.xmss        /= numberOfAnswers;
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
    if (performance.sign || performance.sign == 0) {
        average.all += performance.sign;
        average.withoutSk += performance.sign;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (performance.ver || performance.ver == 0) {
        average.all += performance.ver;
        average.withoutSk += performance.ver;
        numberOfSizes.all += 1;
        numberOfSizes.withoutSk += 1;
    }
    if (size.pk || size.pk == 0) {
        average.withoutSk += size.pk;
        numberOfSizes.withoutSk += 1;
    }
    if (size.sig || size.sig == 0) {
        average.withoutSk += size.sig;
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
    let scores8 = {mldsa: 0, falcon: 0, slhdsa: 0, xmss: 0};
    if (!chosen.mldsa.size) {
        // No sizes were chosen in question 1
        return scores8;
    }
    averages = {mldsa: averagePerformances(chosen.mldsa.performance, chosen.mldsa.size), falcon: averagePerformances(chosen.falcon.performance, chosen.falcon.size), slhdsa: averagePerformances(chosen.slhdsa.performance, chosen.slhdsa.size), xmss: averagePerformances(chosen.xmss.performance, chosen.xmss.size)};

    if (sessionStorage.getItem('q8')) {
        // Use answer to question 8
        scores8.mldsa = Math.round(averages.mldsa.all);
        scores8.falcon = Math.round(averages.falcon.all);
        scores8.slhdsa = Math.round(averages.slhdsa.all);
        scores8.xmss = Math.round(averages.xmss.all);
        switch (sessionStorage.getItem('q8')) {
            case 'Completely agree':
                scores8.mldsa = Math.max(0, scores8.mldsa);
                scores8.falcon = Math.max(0, scores8.falcon);
                scores8.slhdsa = Math.max(0, scores8.slhdsa);
                scores8.xmss = Math.max(0, scores8.xmss);
                break;
            case 'Agree':
                scores8.mldsa = Math.max(0, scores8.mldsa - 1);
                scores8.falcon = Math.max(0, scores8.falcon - 1);
                scores8.slhdsa = Math.max(0, scores8.slhdsa - 1);
                scores8.xmss = Math.max(0, scores8.xmss - 1);
                break;
            case 'Neutral':
                scores8.mldsa = Math.max(0, scores8.mldsa - 2);
                scores8.falcon = Math.max(0, scores8.falcon - 2);
                scores8.slhdsa = Math.max(0, scores8.slhdsa - 2);
                scores8.xmss = Math.max(0, scores8.xmss - 2);
                break;
            case 'Disagree':
                scores8.mldsa = Math.max(0, scores8.mldsa - 3);
                scores8.falcon = Math.max(0, scores8.falcon - 3);
                scores8.slhdsa = Math.max(0, scores8.slhdsa - 3);
                scores8.xmss = Math.max(0, scores8.xmss - 3);
                break;
            case 'Completely disagree':
                scores8.mldsa = Math.max(0, scores8.mldsa - 4);
                scores8.falcon = Math.max(0, scores8.falcon - 4);
                scores8.slhdsa = Math.max(0, scores8.slhdsa - 4);
                scores8.xmss = Math.max(0, scores8.xmss - 4);
                break;
        }
    } else {
        // Use answers to questions 8-1, 8-2, 8-3
        let numberOfAnswers = 0;

        // Question 8-1
        if (sessionStorage.getItem('q8-1') > -1 && averages.mldsa.withoutSk > -1) {
            scores8.mldsa = Math.round((5 - averages.mldsa.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.mldsa.withoutSk);
            scores8.falcon = Math.round((5 - averages.falcon.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.falcon.withoutSk);
            scores8.slhdsa = Math.round((5 - averages.slhdsa.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.slhdsa.withoutSk);
            scores8.xmss = Math.round((5 - averages.xmss.withoutSk)/1000 * sessionStorage.getItem('q8-1') + averages.xmss.withoutSk);
            numberOfAnswers += 1
        } else if (averages.mldsa.withoutSk > -1) {
            scores8.mldsa = Math.max(0, Math.round(averages.mldsa.withoutSk) - 2);
            scores8.falcon = Math.max(0, Math.round(averages.falcon.withoutSk) - 2);
            scores8.slhdsa = Math.max(0, Math.round(averages.slhdsa.withoutSk) - 2);
            scores8.xmss = Math.max(0, Math.round(averages.xmss.withoutSk) - 2);
            numberOfAnswers += 1;
        }

        // Question 8-2
        if (sessionStorage.getItem('q8-2') > -1) {
            scores8.mldsa += Math.round((5 - averages.mldsa.all)/1000 * sessionStorage.getItem('q8-2') + averages.mldsa.all);
            scores8.falcon += Math.round((5 - averages.falcon.all)/1000 * sessionStorage.getItem('q8-2') + averages.falcon.all);
            scores8.slhdsa += Math.round((5 - averages.slhdsa.all)/1000 * sessionStorage.getItem('q8-2') + averages.slhdsa.all);
            scores8.xmss += Math.round((5 - averages.xmss.all)/1000 * sessionStorage.getItem('q8-2') + averages.xmss.all);
            numberOfAnswers += 1;
        } else {
            scores8.mldsa += Math.max(0, Math.round(averages.mldsa.all) - 2);
            scores8.falcon += Math.max(0, Math.round(averages.falcon.all) - 2);
            scores8.slhdsa += Math.max(0, Math.round(averages.slhdsa.all) - 2);
            scores8.xmss += Math.max(0, Math.round(averages.xmss.all) - 2);
            numberOfAnswers += 1;
        }

        if (numberOfAnswers >= 1) {
            scores8.mldsa   /= numberOfAnswers;
            scores8.falcon      /= numberOfAnswers;
            scores8.slhdsa     /= numberOfAnswers;
            scores8.xmss        /= numberOfAnswers;
        }

    }

    return scores8;
}

function question9() {

    let scores9 = {mldsa: 0, falcon: 0, slhdsa: 0, xmss: 0};

    let numberOfAnswers = 0;

    if (sessionStorage.getItem('q9-1')) {
        // Use answer of question 9-1
        if (sessionStorage.getItem('q9-1').includes('Signing')) {
            scores9.mldsa   += 5;
            scores9.falcon      += 1;
            scores9.slhdsa     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q9-1').includes('Verification')) {
            scores9.mldsa   += 5;
            scores9.falcon      += 5;
            scores9.slhdsa     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (sessionStorage.getItem('q9-1').includes('Key generation')) {
            scores9.mldsa   += 5;
            scores9.falcon      += 1;
            scores9.slhdsa     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
        if (numberOfAnswers == 0) {
            scores9.mldsa   += 5;
            scores9.falcon      += 1;
            scores9.slhdsa     += 5;
            scores9.xmss        += 5;
            numberOfAnswers     += 1;
        }
    } else {
        // Use answer of question 9
        switch (sessionStorage.getItem('q9')) {
            case 'Yes':
                scores9.mldsa   = 5;
                scores9.falcon      = 1;
                scores9.slhdsa     = 5;
                scores9.xmss        = 5;
                break;
            case 'No':
                break;
            default:
                scores9.mldsa   = 5;
                scores9.falcon      = 1;
                scores9.slhdsa     = 5;
                scores9.xmss        = 5;
        }

        numberOfAnswers += 1;
    }

    // Normalise over number of chosen answers
    if (numberOfAnswers >= 1) {
        scores9.mldsa   /= numberOfAnswers;
        scores9.falcon      /= numberOfAnswers;
        scores9.slhdsa     /= numberOfAnswers;
        scores9.xmss        /= numberOfAnswers;
    }

    return scores9;
}

function question10() {
    if (sessionStorage.getItem('q10') == 'Yes') {
        return 1;
    }
    return 0;
}

function calculateScores() {
    let mldsaScore = 0;
    let falconScore = 0;
    let slhdsaScore = 0;
    let xmssScore = 0;

    let maxScore = 40;

    // Question 1
    chosen = question1()

    // Question 2
    let scores2 = question2();
    let factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 2: Timespan') || sessionStorage.getItem('q11').includes('Question 2 (Follow-up): Classified information')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores2.mldsa;
    falconScore += factor * scores2.falcon;
    slhdsaScore += factor * scores2.slhdsa;
    xmssScore += factor * scores2.xmss;

    // Question 3
    let scores3 = question3();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 3: Performance vs. security') || sessionStorage.getItem('q11').includes('Question 3-1: Conservativeness vs. efficiency') || sessionStorage.getItem('q11').includes('Question 3-2: Security level') || sessionStorage.getItem('q11').includes('Question 3-3: Hybrid mode')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores3.mldsa;
    falconScore += factor * scores3.falcon;
    slhdsaScore += factor * scores3.slhdsa;
    xmssScore += factor * scores3.xmss;

    // Question 4
    let scores4 = question4();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 4: Standardization')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores4.mldsa;
    falconScore += factor * scores4.falcon;
    slhdsaScore += factor * scores4.slhdsa;
    xmssScore += factor * scores4.xmss;

    // Question 5
    let scores5 = question5();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 5: Platform') || sessionStorage.getItem('q11').includes('Question 5-1: Hardware acceleration') || sessionStorage.getItem('q11').includes('Question 5-2: Floating point arithmetic')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores5.mldsa;
    falconScore += factor * scores5.falcon;
    slhdsaScore += factor * scores5.slhdsa;
    xmssScore += factor * scores5.xmss;

    // Question 6
    let scores6 = question6();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 6: New hardware')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores6.mldsa;
    falconScore += factor * scores6.falcon;
    slhdsaScore += factor * scores6.slhdsa;
    xmssScore += factor * scores6.xmss;

    // Question 7
    let scores7 = question7(chosen);
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 7: Space requirement') || sessionStorage.getItem('q11').includes('Question 7-1: Communication requirement') || sessionStorage.getItem('q11').includes('Question 7-2: Memory requirement') || sessionStorage.getItem('q11').includes('Question 7-3: Storage requirement')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores7.mldsa;
    falconScore += factor * scores7.falcon;
    slhdsaScore += factor * scores7.slhdsa;
    xmssScore += factor * scores7.xmss;

    // Question 8
    let scores8 = question8(chosen);
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 8: Delay requirement') || sessionStorage.getItem('q11').includes('Question 8-1: Communication time') || sessionStorage.getItem('q11').includes('Question 8-2: Computation time')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores8.mldsa;
    falconScore += factor * scores8.falcon;
    slhdsaScore += factor * scores8.slhdsa;
    xmssScore += factor * scores8.xmss;

    // Question 9
    let scores9 = question9();
    factor = 1;
    if (sessionStorage.getItem('q11').includes('Question 9: Physical access') || sessionStorage.getItem('q11').includes('Question 9-1: Functionality')) {
        factor = 2;
        maxScore += 5;
    }
    mldsaScore += factor * scores9.mldsa;
    falconScore += factor * scores9.falcon;
    slhdsaScore += factor * scores9.slhdsa;
    xmssScore += factor * scores9.xmss;

    // Question 10
    xmssScore = xmssScore * question10();

    // Normalise to range 0-100
    mldsaScore = Math.round(mldsaScore / maxScore * 100);
    falconScore = Math.round(falconScore / maxScore * 100);
    slhdsaScore = Math.round(slhdsaScore / maxScore * 100);
    xmssScore = Math.round(xmssScore / maxScore * 100)

    //  Question 11 has been implemented with the factors above

    let scores = {"ML-DSA": mldsaScore, "Falcon": falconScore, "SLH-DSA": slhdsaScore, "XMSS": xmssScore};
    const sortedScores = Object.fromEntries(Object.entries(scores).sort(([, value1], [, value2]) => value2 - value1));

    return sortedScores;
}

function adviceSecurityLevel() {
    switch (sessionStorage.getItem('q3-2')) {
        case '128 bits - NIST level 1 - 3072 bit RSA keys - 256 bit ECC keys':
            return 'ML-DSA-2, Falcon-512, SLH-DSA-128 or XMSS-256';
        case '192 bits - NIST level 3 - 7680 bit RSA keys - 384 bit ECC keys':
            return 'ML-DSA-3, SLH-DSA-192 or XMSS-256';
        case '256 bits - NIST level 5 - 15360 bit RSA keys - 521 bit ECC keys':
            return 'ML-DSA-5, Falcon-1024, SLH-DSA-256 or XMSS-256';
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
    div.innerHTML += `<br><p>⚠️ Note: Based on your answer to question 4, you are bound by standardization. NIST is currently in the process of standardizing ML-DSA, SLH-DSA and Falcon. NIST has also published a recommendation for XMSS.</p>`;
}

if (sessionStorage.getItem('q4') == 'IETF') {
    div.innerHTML += `<br><p>⚠️ Note: Based on your answer to question 4, you are bound by standardization. IETF has published an RFC for XMSS.</p>`;
}

// Print advice basend on answer of question 2 follow-up
if (sessionStorage.getItem('q2 (Follow-up)') == 'Yes') {
    div.innerHTML += `<br><p>Based on your answer to question 2 (Follow-up), it is advised to contact the Nationaal Bureau voor Verbindingsbeveiliging (NBV) or a similar governmental agency in your country to receive their guidelines on classified information.</p>`;
}

// Print advice based on answer of question 3-2
if (sessionStorage.getItem('q3-2') && sessionStorage.getItem('q3-2') !== "Do not know") {
    div.innerHTML += `<br><p>PQC algorithms with the same security level as your answer to question 3-2 would be ${adviceSecurityLevel()}.</p>`;
}
