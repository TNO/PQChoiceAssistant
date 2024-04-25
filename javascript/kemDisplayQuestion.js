// kemDisplayQuestion.js
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


function displayQuestion(question) {

    const outerDiv = document.createElement("div");
    outerDiv.classList.add("question-wrapper");
    const questionLabel = document.createElement("label");
    questionLabel.classList.add("form-label");
    let expert = (question.name.includes('-') && !question.name.includes('Follow-up'));
    if (expert) {
        questionLabel.innerHTML = `<br><p>⚠️ Note: the following is an expert level question</p>`;
        // questionLabel.style.background = '#af7a7a';
    } else if (!question.name.includes('Follow-up')) {
        questionLabel.innerHTML = `<hr>`;
    }
    if (question.intro) {
        questionLabel.innerHTML += `<br><p>${question.intro}</p> <br> <strong>${expert ? 'Expert question' : 'Question'} ${question.name.slice(1)}:</strong> `;
    } else {
        questionLabel.innerHTML += `<br> <strong>${expert ? 'Expert question' : 'Question'} ${question.name.slice(1)}:</strong> `;
    }
    if (question.tooltip) {
        let term = question.tooltip[0];
        let explanation = question.tooltip[1];
        let startIndex = question.prompt.indexOf(term);
        let endIndex = startIndex + term.length;
        questionLabel.innerHTML += question.prompt.slice(0, startIndex)
                                + `<div class="tooltip">${term}<span class="tooltiptext">${explanation}</span></div>`
                                + question.prompt.slice(endIndex);
    } else {
        questionLabel.innerHTML += question.prompt;
    }
    outerDiv.appendChild(questionLabel)

    switch(question.type) {

        case "radio":
            const radioDiv = document.createElement("div");
            radioDiv.classList.add("question-flex");
            radioDiv.role = "group";
            radioDiv.ariaLabel = question.prompt;

            question.options.forEach((option, index) => {
                const answerLabel = document.createElement("label");
                answerLabel.classList.add("radio-label");
                answerLabel.htmlFor = `${question.name}a${index}`;

                const answerInput = document.createElement("input");
                answerInput.classList.add("input-radio");
                answerInput.type = "radio";
                answerInput.id = answerLabel.htmlFor;
                answerInput.name = question.name;
                answerInput.value = option;
                answerLabel.appendChild(answerInput);

                const answerSpan = document.createElement("span");
                answerSpan.textContent = option;
                answerLabel.appendChild(answerSpan);

                const answerCheckmark = document.createElement("span");
                answerCheckmark.classList.add("radio-checkmark");
                answerLabel.appendChild(answerCheckmark);

                radioDiv.appendChild(answerLabel);
            })

            outerDiv.appendChild(radioDiv);
            break;

        case "checkbox":
            const checkboxDiv = document.createElement("div");
            checkboxDiv.classList.add("question-flex");
            checkboxDiv.role = "group";
            checkboxDiv.ariaLabel = question.prompt;

            question.options.forEach((option, index) => {
                const answerLabel = document.createElement("label");
                answerLabel.classList.add("checkbox-label");
                answerLabel.htmlFor = `${question.name}a${index}`;

                const answerInput = document.createElement("input");
                answerInput.classList.add("input-checkbox");
                answerInput.type = "checkbox";
                answerInput.id = answerLabel.htmlFor;
                answerInput.name = `${question.name}[]`;
                answerInput.value = option;
                answerLabel.appendChild(answerInput);

                const answerSpan = document.createElement("span");
                answerSpan.textContent = option;
                answerLabel.appendChild(answerSpan);

                const answerCheckmark = document.createElement("span");
                answerCheckmark.classList.add("checkbox-checkmark");
                answerLabel.appendChild(answerCheckmark);

                checkboxDiv.appendChild(answerLabel);
            })

            outerDiv.appendChild(checkboxDiv);
            break;

        case "slider":
            const sliderDiv = document.createElement("div");
            sliderDiv.classList.add("question-flex");
            sliderDiv.ariaLabel = question.prompt;

            const sliderInput = document.createElement("input");
            sliderInput.classList.add("slider");
            sliderInput.type = "range";
            sliderInput.min = question.options[0];
            sliderInput.max = question.options[1];
            sliderInput.value = question.options[2];
            sliderInput.id = `${question.name}a`;
            sliderInput.name = question.name;
            sliderDiv.appendChild(sliderInput);

            const sliderP = document.createElement("p");
            sliderP.textContent = "Answer: "
            const sliderSpan = document.createElement("span");
            sliderSpan.id = `${question.name}s`;
            sliderSpan.value = sliderInput.value;
            sliderP.appendChild(sliderSpan);
            const sliderType = document.createTextNode(" " + question.options[3]);
            sliderP.appendChild(sliderType);
            sliderDiv.appendChild(sliderP);

            sliderInput.oninput = function() {
                sliderSpan.textContent = this.value;
            }

            outerDiv.appendChild(sliderDiv);
            break;
    }

    container.appendChild(outerDiv);
    return 0;
}

const container = document.getElementById("form-container");
questions.forEach(question => displayQuestion(question));
