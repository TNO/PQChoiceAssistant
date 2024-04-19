# PQChoiceAssistant

The development of quantum computers is threatening cryptography that is currently widely used to protect our digital world. To encounter this threat, new cryptographic schemes are developed that should be resistant to attacks using quantum computers. This is the area of so-called post-quantum cryptography (PQC). As there are multiple schemes being developed and standardized, it may be hard to make a choice which one(s) to apply in your use case. The information to make this choice is scattered over many sources, e.g. research papers and standardization bodies. In order to help navigate this information, the PQChoiceAssistant tool aims to give an indication on what scheme seems the most well-suited option for your use case.

## What the tool offers

The PQChoiceAssistant offers questionnaire concerning two types of schemes, key encapsulation mechanisms (KEMs) and digital signature schemes (DSSs). The questions aim to relate characteristics of your use case to the different characteristics of the schemes. Finally, a score will be calculated based on the answers. The better a scheme first your use case, the higher its score. The scoring page also gives a short overview of the pros and cons of the schemes.

The functionality may be familiar to you: it was inspired by voting advice applications. In that sense, the results of the PQChoiceAssistant are a recommendation, but further research on the recommended scheme is required to see whether it indeed fits your use case.

As there are many PQC schemes available, a selection was made to scope the project, based on the advice of industry partners. The tool covers the following schemes:

Key encapsulation mechanisms

- ML-KEM (based on CRYSTALS-Kyber)
- FrodoKEM
- Classic McEliece

Digital signature schemes

- ML-DSA (based on CRYSTALS-Dilithium)
- Falcon
- SLH-DSA (based on SPHINCS+)
- XMSS

## How to use the tool

You can find the tool at [https://tno.github.io/PQChoiceAssistant](https://tno.github.io/PQChoiceAssistant).

First, choose what kind of scheme you need for your use case, a key encapsulation mechanism or digital signature scheme. You can then fill in the questionnaire. For advanced users with extensive cryptographic knowledge, expert questions are available to get more finetuned results. You are free to skip these questions if you are not sure. Note that expert questions replace the scoring of the corresponding regular question, e.g. when answering expert question 5-1, the answer to question 5 will be disregarded. Most questions are also accompanied by a brief introduction illustrating the idea behind the question.

The last question can be used to indicate topics that you find extra important, these will be weighed more heavily in the final scoring.

Click on the "Accept, see the results" button to accept the disclaimer and get the scoring and additional information on the schemes.

Note that the information put in the questionnaires is not sent anywhere, it is processed in your browser. In case you want to run the tool locally, you can find the source code on [https://www.github.com/TNO/PQChoiceAssistant](https://www.github.com/TNO/PQChoiceAssistant).

## Background of the project

The research and tool development were performed by [TNO](https://www.tno.nl/) and [CWI](https://www.cwi.nl/). This process was supported by input from [Compumatica](https://www.compumatica.com/), [Fox Crypto](https://www.fox-it.com/nl/fox-crypto/), Nationaal Bureau voor Verbindingsbeveiliging (NBV), [NXP](https://www.nxp.com/) and [Technolution](https://www.technolution.com/).

The project is a continuation of the [PQC Migration Handbook](https://www.tno.nl/en/newsroom/2023/04-0/pqc-migration-handbook/), which offers advice and concrete steps for organisations to mitigate the risk of quantum computers to cryptography. The first part of the process consisted of studying the different algorithms and collecting information about them in a characteristics overview, which can be found in the [`background_material`](https://www.github.com/TNO/PQChoiceAssistant/tree/main/background_material) folder. This overview was then used to construct the questions in the questionnaire and scoring system, which was then implemented.

## How to get in touch

For questions or feedback you can contact [Maaike van Leuken](mailto:maaike.vanleuken@tno.nl).
