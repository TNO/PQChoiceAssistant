# PQChoiceAssistant

The development of quantum computers is threatening cryptography that is currently widely used to protect our digital world. To encounter this threat, new cryptographic schemes are developed to be resistant to attacks using quantum computers. This is the area of so-called post-quantum cryptography (PQC). As there are multiple schemes being developed and standardized, it may be hard to make a choice on which one(s) to apply in your use case. The information to make this choice is scattered over many sources, such as research papers and different standardisation bodies. In order to help navigate this information, the PQChoiceAssistant aims to give an indication on what scheme seems the most suitable option for your use case.

## What the tool offers

*The tool is available in both Dutch and English.*

The PQChoiceAssistant offers two questionnaires concerning two types of schemes: key encapsulation mechanisms (KEMs) and digital signature algorithms (DSAs). The questions aim to relate characteristics of your use case to the different characteristics of the schemes. Finally, a score will be calculated based on your answers. The better a scheme fits your use case, the higher its score will be. The scoring page can also give personalised advice based on your answers.

The results of the PQChoiceAssistant are a recommendation, but further research on the recommended scheme is advised to see whether it indeed fits your use case.

The tool also offers an overview of the available algorithms, giving you information on many relevant characteristics. This information is meant to be used in combination with filling out the questionnaires. 

As there are many PQC schemes available, a selection was made for the most likely candidates. The tool covers the following schemes:

Key encapsulation mechanisms

- ML-KEM (based on CRYSTALS-Kyber)
- FrodoKEM
- Classic McEliece
- HQC
- BIKE

Digital signature schemes

- ML-DSA (based on CRYSTALS-Dilithium)
- Falcon
- SLH-DSA (based on SPHINCS+)
- XMSS

## How to use the tool

You can find the tool at https://tno.github.io/PQChoiceAssistant.

Here, you can choose to go to the questionnaire for either KEMs or DSAs, or view the general overview page. For advanced users with extensive cryptographic knowledge, expert questions are available to get more finetuned results. You are free to skip these (or any other) questions if you are unsure. The questions are also accompanied by a brief introduction to the right, illustrating the context of the question.

After completing the questions, you are taken to the results page. Here you see which algorithms are most suited to your needs. You can indicate topics that you find most important, these will be weighed more heavily in the final scoring. You can also see brief explanations of the algorithms, and key differences between options that receive comparable scores. Finally, you can use the *Back to questions* button to change your answers, and the *export* button will save all of your results to a downloadable PDF.

### Local usage

Note that the information put in the questionnaires is not sent anywhere, it is processed in your browser. In case you want to run the tool locally, you can download this repository by clicking `Code -> Download ZIP` at the top of the page.

This requires [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) to host the tool locally.

Unzip the downloaded file and inside it run the command ```npm install``` to install all required dependencies. Then run ```npm run dev``` to host the tool, which should then become available at http://localhost:5173/PQChoiceAssistant/.

## Background of the project

The project is a continuation of the [PQC Migration Handbook](https://publications.tno.nl/publication/34643386/fXcPVHsX/TNO-2024-pqc-en.pdf) (see also the [Dutch version](https://publications.tno.nl/publication/34643387/XTdELY16/TNO-2024-pqc-ne.pdf)), which offers advice and concrete steps for organisations to mitigate the risk of quantum computers to cryptography. It goes into depth on the entire migration process, and covers more than the choice of algorithms. For this reason, we recommend using both the PQC Migration Handbook and the PQChoiceAssistant to get the best results for your organisation.

The research and tool development were performed by [TNO](https://www.tno.nl/) and [CWI](https://www.cwi.nl/). This process was supported by input from [AIVD](https://www.aivd.nl/), [Compumatica](https://www.compumatica.com/), [Sentyron](https://www.sentyron.com/), [NXP](https://www.nxp.com/) and [Technolution](https://www.technolution.com/).

## License
![License: EUPL](https://img.shields.io/badge/License-EUPL%201.2-blue.svg)

This project is licensed under the European Union Public License (EUPL) 1.2.

## How to get in touch

For questions or feedback you can contact [Maaike van Leuken](mailto:maaike.vanleuken@tno.nl).
