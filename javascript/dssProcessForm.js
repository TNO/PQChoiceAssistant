// dssProcessForm.js
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


function processForm() {

    let form = document.getElementById('dssform');
    sessionStorage.clear()

    questions.forEach(question => {
        if (question.type === "checkbox") {
            let answer = [];
            let checkboxes = form.elements[question.name + "[]"];
            for (let i=0; i<checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    answer.push(checkboxes[i].value);
                }
            }
            sessionStorage.setItem(question.name, answer);
        } else {
            sessionStorage.setItem(question.name, form.elements[question.name].value);
        }
    });

    // Redirect to dss-results.html
    window.location.href = 'dss-results.html';
}
