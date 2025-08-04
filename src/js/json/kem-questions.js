export const questions = [
    {
        "category": {
            "EN": "Information Security",
            "NL": "Informatiebeveiliging"
        },
        "content": [
            {
                "question": {
                    "NL": "Hoeveel jaar moeten de gegevens die u beschermt vertrouwelijk blijven?",
                    "EN": "How many years does the data you are protecting have to stay confidential?"
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Als uw organisatie te maken heeft met informatie die gedurende lange tijd vertrouwelijk moet blijven, kan het voordelig zijn te investeren in een conservatiever post-quantum cryptografisch algoritme. Dit minimaliseert de waarschijnlijkheid dat het PQC-algoritme in de toekomst toch kwetsbaar blijkt te zijn. Dit vergroot daardoor de zekerheid dat de gegevens vertrouwelijk blijven tijdens de hele levensduur.",
                    "EN": "If your organisation is dealing with information that should remain confidential for an extended period of time, it may be beneficial to invest in a more conservative post-quantum cryptographic scheme. This minimalises the probability that the PQC algorithm turns out to have a vulnerability in the future. This increases the assurance that the data will remain confidential for its entire lifespan."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Minder dan 1 jaar",
                            "EN": "Less than 1 year"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "1 - 5 jaar",
                            "EN": "1 - 5 years"
                        },
                        "scores": {
                            "ML-KEM": 4.0,
                            "FrodoKEM": 4.5,
                            "Classic McEliece": 4.5,
                            "HQC": 4.0,
                            "BIKE": 4.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "6 - 12 jaar",
                            "EN": "6 - 12 years"
                        },
                        "scores": {
                            "ML-KEM": 3.0,
                            "FrodoKEM": 4.0,
                            "Classic McEliece": 4.0,
                            "HQC": 3.0,
                            "BIKE": 3.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "12 - 30 jaar",
                            "EN": "12 - 30 years"
                        },
                        "scores": {
                            "ML-KEM": 2.0,
                            "FrodoKEM": 3.5,
                            "Classic McEliece": 3.5,
                            "HQC": 2.0,
                            "BIKE": 2.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Meer dan 30 jaar",
                            "EN": "More than 30 years"
                        },
                        "scores": {
                            "ML-KEM": 1.0,
                            "FrodoKEM": 3.0,
                            "Classic McEliece": 3.0,
                            "HQC": 1.0,
                            "BIKE": 1.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "(Vervolg) Verwerkt u gerubriceerde data?",
                    "EN": "(Follow-up) Do you process classified information?"
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Voor de bescherming van gerubriceerde data zijn mogelijke specifieke richtlijnen van toepassing. De AIVD kan verdere uitleg en begeleiding bieden over deze richtlijnen. Als u niet weet wat gerubriceerde data is, of als u niet zeker weet of uw toepassing gerubriceerde data verwerkt, is het antwoord op deze vraag waarschijnlijk 'Nee'.",
                    "EN": "For the protection of classified information, some specific rules and requirements may apply. The AIVD can provide guidance on these rules and requirements. In case you do not know what classified information is, or in case you are not sure whether your application handles classified information, the answer to the following question is probably 'No'."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Ja",
                            "EN": "Yes"
                        },
                        "scores": {
                            "ML-KEM": 2.0,
                            "FrodoKEM": 3.0,
                            "Classic McEliece": 5.0,
                            "HQC": 2.0,
                            "BIKE": 2.0
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat u gerubriceerde data verwerkt. Neem contact op met de Unit Weerbaarheid voor richtlijnen over het beperken van de dreiging van quantumcomputers voor uw situatie.",
                            "EN": "You indicated that you work with classified information. Please contact the relevant authorities for guidance on mitigating the threat of quantum computers to your situation (in the Netherlands this is the Unit Weerbaarheid)."
                        }
                    },
                    {
                        "text": {
                            "NL": "Nee",
                            "EN": "No"
                        },
                        "scores": {
                            "ML-KEM": 3.0,
                            "FrodoKEM": 3.0,
                            "Classic McEliece": 3.0,
                            "HQC": 3.0,
                            "BIKE": 3.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "Kan uw toepassing het gebruik van twee cryptografische algoritmen (quantumkwetsbare en quantumveilige) in een hybride constructie ondersteunen?",
                    "EN": "Can your application support the use of two cryptographic algorithms (quantum-vulnerable and quantum-safe) in hybrid mode?"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "We raden aan om quantumkwetsbare en quantumveilige cryptografie in een hybride constructie te gebruiken. Het voordeel hiervan is dat de veiligheid gegarandeerd blijft zolang één van de twee algoritmen veilig is. Het kan ook helpen met backward compatibility.",
                    "EN": "In general, we recommend using quantum-vulnerable and quantum-safe cryptography in hybrid mode. The advantage of using hybrid cryptography is that the security remains guaranteed as long as one of the two schemes is secure, and it may aid backward compatibility."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Ja",
                            "EN": "Yes"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 2.2583088208379847,
                            "Classic McEliece": 2.8098246885412443,
                            "HQC": 3.071812059199635,
                            "BIKE": 4.330590601399606
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat u het gebruik van twee algoritmen in hybride modus ondersteunt. Het is aanbevolen om dit te doen wanneer mogelijk, omdat het de flexibiliteit biedt om snel tussen de twee algoritmen te wisselen. Let wel dat dit meer performance en opslag vereist.",
                            "EN": "You indicated that you can support the use of two algorithms in hybrid mode. It is strongly recommended to do this whenever possible, as it gives additional flexibility to quickly switch between them. Note however that this gives higher performance and storage requirements."
                        }
                    },
                    {
                        "text": {
                            "NL": "Nee",
                            "EN": "No"
                        },
                        "scores": {
                            "ML-KEM": 2.0,
                            "FrodoKEM": 3.5,
                            "Classic McEliece": 3.5,
                            "HQC": 2.0,
                            "BIKE": 2.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            }
        ]
    },
    {
        "category": {
            "EN": "Performance vs Security",
            "NL": "Performance vs veiligheid"
        },
        "content": [
            {
                "question": {
                    "NL": "In mijn toepassing is performance belangrijker dan het vertrouwen in de security van de cryptografie.",
                    "EN": "In my use case, confidence in the security of the scheme is more important to me than its performance."
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Het ontwerp van PQC-algoritmen is anders dan van de momenteel veelgebruikte quantumkwetsbare algoritmen RSA en ECC. De PQC-algoritmen zijn namelijk gebaseerd op wiskundige problemen die niet opgelost kunnen worden door de quantumcomputer. Sommige PQC-algoritmen zijn erg efficient, maar minder volwassen. Anderen zijn erg volwassen, maar leveren in op efficiëntie.",
                    "EN": "The design of the new post-quantum schemes is different from the widely-used quantum-vulnerable algorithms such as RSA and ECC. The PQC algorithms are based on different mathematical problems, that cannot be solved by the quantum computer. Some schemes are very efficient, but are considered less mature. Others are considered more conservative, but they pay the price in performance."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Helemaal mee eens",
                            "EN": "Completely agree"
                        },
                        "scores": {
                            "ML-KEM": 2.0,
                            "FrodoKEM": 3.5,
                            "Classic McEliece": 3.5,
                            "HQC": 2.0,
                            "BIKE": 2.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Mee eens",
                            "EN": "Agree"
                        },
                        "scores": {
                            "ML-KEM": 2.75,
                            "FrodoKEM": 2.9218465218105676,
                            "Classic McEliece": 3.3092643239099244,
                            "HQC": 2.295955828892423,
                            "BIKE": 2.067463995641198
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Neutraal",
                            "EN": "Neutral"
                        },
                        "scores": {
                            "ML-KEM": 3.5,
                            "FrodoKEM": 2.3436930436211347,
                            "Classic McEliece": 3.118528647819849,
                            "HQC": 2.591911657784846,
                            "BIKE": 2.1349279912823964
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Oneens",
                            "EN": "Disagree"
                        },
                        "scores": {
                            "ML-KEM": 4.25,
                            "FrodoKEM": 1.7655395654317023,
                            "Classic McEliece": 2.927792971729773,
                            "HQC": 2.887867486677269,
                            "BIKE": 2.202391986923595
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Helemaal mee oneens",
                            "EN": "Completely disagree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 1.1873860872422697,
                            "Classic McEliece": 2.7370572956396972,
                            "HQC": 3.183823315569692,
                            "BIKE": 2.269855982564793
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "Mijn toepassing kan het zich veroorloven om iets langere rekentijden te hebben, ten opzichte van mijn huidige situatie.",
                    "EN": "My use case can afford additional computing time compared to my currently in place solution."
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "PQC-algoritmen zijn mogelijk minder efficiënt dan de quantumkwetsbare algoritmen. Dit heeft mogelijk negatieve gevolgen voor uw toepassing, met name als deze tijdsgevoelig is.",
                    "EN": "The post-quantum cryptographic schemes may be less efficient than the currently used schemes, which may negatively impact the use case they are operating in, especially if it is time sensitive."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Helemaal mee eens",
                            "EN": "Completely agree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Mee eens",
                            "EN": "Agree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 3.75,
                            "Classic McEliece": 3.868528647819849,
                            "HQC": 4.091911657784846,
                            "BIKE": 3.75
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Neutraal",
                            "EN": "Neutral"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 2.5,
                            "Classic McEliece": 2.7370572956396972,
                            "HQC": 3.183823315569692,
                            "BIKE": 2.5
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Oneens",
                            "EN": "Disagree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 1.25,
                            "Classic McEliece": 1.6055859434595459,
                            "HQC": 2.2757349733545382,
                            "BIKE": 1.25
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Helemaal mee oneens",
                            "EN": "Completely disagree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.4741145912793945,
                            "HQC": 1.367646631139384,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            }
        ]
    },
    {
        "category": {
            "EN": "Standardisation",
            "NL": "Standaardisatie"
        },
        "content": [
            {
                "question": {
                    "NL": "Welke standaardisatieorganen moet u volgen rondom PQC-algoritmen?",
                    "EN": "Which standardisation bodies do you have to follow surrounding PQC algorithms?"
                },
                "expert_level": false,
                "custom_scoring": "OR",
                "description": {
                    "NL": "Verschillende standaardisatieorganen kiezen mogelijk voor verschillende algoritmen om te standaardiseren, met verschillende tijdslijnen. Er zijn verschillende redenen waarom u specifieke standaardisatieorganen zou moeten volgen, bijvoorbeeld omdat u werkt met gerubriceerde data, of vanwege andere regel- en wetgeving. Als u meerdere instanties selecteert, betekent dat hier dat u minstens één van deze volgt, maar niet noodzakelijk allemaal.",
                    "EN": "Different standardisation bodies may choose different schemes for standardisation and with different timelines. There are multiple reasons why specific standardisation bodies should be followed, for example because you process classified information, or because of other legislation. Note that selecting multiple bodies here means you have to follow at least one of them, but not necessarily all."
                },
                "max_selectable_answers": 3,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "NIST",
                            "EN": "NIST"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": -1.0,
                            "Classic McEliece": -1.0,
                            "HQC": 4.0,
                            "BIKE": -1.0
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat u standaardisatie volgt. NIST heeft FrodoKEM, Classic McEliece en BIKE niet geselecteerd als standaard, dus u moet dit algoritme niet selecteren als u de NIST-standaard wil volgen",
                            "EN": "You indicated you follow standardisation. NIST has not selected FrodoKEM, Classic McEliece or BIKE for standardisation, so you should not select it if you want to follow NIST standards."
                        }
                    },
                    {
                        "text": {
                            "NL": "ISO",
                            "EN": "ISO"
                        },
                        "scores": {
                            "ML-KEM": 4.0,
                            "FrodoKEM": 4.0,
                            "Classic McEliece": 4.0,
                            "HQC": -1.0,
                            "BIKE": -1.0
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat u standaardisatie volgt. ISO heeft BIKE en HQC niet geselecteerd als standaard, dus u moet deze algoritmen niet selecteren als u de ISO-standaard wil volgen.",
                            "EN": "You indicated you follow standardisation. ISO has not selected BIKE and HQC for standardisation, so you should not select these if you want to follow ISO standards."
                        }
                    },
                    {
                        "text": {
                            "NL": "IETF",
                            "EN": "IETF"
                        },
                        "scores": {
                            "ML-KEM": 1.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 3.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Géén van bovenstaande",
                            "EN": "None of the above"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            }
        ]
    },
    {
        "category": {
            "EN": "Hardware",
            "NL": "Hardware"
        },
        "content": [
            {
                "question": {
                    "NL": "Op welk type apparaat zult u de cryptografische operaties uitvoeren?",
                    "EN": "On what kind of device will you use the cryptographic operations?"
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Het type apparaat geeft een indicatie van de rekenkracht en (werk)geheugen. Of een cryptografisch algoritme geschikt is voor uw toepassing, hangt sterk af van de hardwarecapaciteit.",
                    "EN": "The type of platform indicates its performance and memory capabilities. The suitability of a cryptographic algorithms strongly relates to the hardware capabilities."
                },
                "max_selectable_answers": 5,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Laptop (of krachtiger)",
                            "EN": "Laptop (or higher performance)"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Smart phone",
                            "EN": "Smart phone"
                        },
                        "scores": {
                            "ML-KEM": 4.757144156168824,
                            "FrodoKEM": 1.9062743558922937,
                            "Classic McEliece": 2.9087695844511297,
                            "HQC": 3.2319027701210676,
                            "BIKE": 2.908335002169456
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "IoT device",
                            "EN": "IoT device"
                        },
                        "scores": {
                            "ML-KEM": 4.514288312337648,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.8175391689022593,
                            "HQC": 1.4638055402421353,
                            "BIKE": 0.8166700043389117
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Smart card",
                            "EN": "Smart card"
                        },
                        "scores": {
                            "ML-KEM": 4.271432468506472,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Sensoren",
                            "EN": "Sensors"
                        },
                        "scores": {
                            "ML-KEM": 4.028576624675296,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Geen van bovenstaande",
                            "EN": "None of the above"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "Ondersteunt uw apparaat hardware accelerators?",
                    "EN": "Does your device support hardware accelerators?"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "De efficiëntie van PQC-algoritmen kan geoptimaliseerd worden door het gebruik van cryptographic accelerators. Een cryptographic accelerator is een stukje speciale hardware, om efficiënt cryptografische operaties uit te voeren.",
                    "EN": "The performance of PQC algorithms can be optimised by using cryptographic accelerators. A cryptographic accelerator is a piece of dedicated hardware that can efficiently perform cryptographic operations."
                },
                "max_selectable_answers": 2,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Ja, voor hash functions",
                            "EN": "Yes, for hash function calls"
                        },
                        "scores": {
                            "ML-KEM": 4.0,
                            "FrodoKEM": 4.0,
                            "Classic McEliece": 4.0,
                            "HQC": 3.0,
                            "BIKE": 3.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Ja, voor polynoom operaties",
                            "EN": "Yes, for polynomial operations or big integer operations"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 4.0,
                            "Classic McEliece": 4.0,
                            "HQC": 3.0,
                            "BIKE": 4.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Nee",
                            "EN": "No"
                        },
                        "scores": {
                            "ML-KEM": 4.0,
                            "FrodoKEM": 3.0,
                            "Classic McEliece": 3.0,
                            "HQC": 3.0,
                            "BIKE": 3.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            }
        ]
    },
    {
        "category": {
            "EN": "Storage",
            "NL": "Opslag"
        },
        "content": [
            {
                "question": {
                    "NL": "Mijn toepassing kan grotere cryptografische sleutels aan dan in de huidige situatie.",
                    "EN": "My use case can afford larger cryptographic keys than currently used."
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "De nieuwe wiskundige problemen waarop de quantumveilige cryptografie gebaseerd zijn, resulteren vaak in langere cryptografische sleutels dan de quantumkwetsbare algoritmen zoals RSA en ECC. Dit kan leiden tot het gebruik van meer geheugen en tijd.",
                    "EN": "The design of the new cryptographic schemes often makes them slower than the currently deployed cryptographic schemes like RSA and ECC and will use larger cryptographic keys. The new schemes may become a bottleneck for the application, both in resources and time. The application will have to handle larger cryptographic keys which have to be stored."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Helemaal mee eens",
                            "EN": "Completely agree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Mee eens",
                            "EN": "Agree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 4.056959686531145,
                            "Classic McEliece": 3.75,
                            "HQC": 4.508063885035817,
                            "BIKE": 4.488990154295405
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Neutraal",
                            "EN": "Neutral"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 3.1139193730622896,
                            "Classic McEliece": 2.5,
                            "HQC": 4.016127770071633,
                            "BIKE": 3.97798030859081
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Oneens",
                            "EN": "Disagree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 2.1708790595934344,
                            "Classic McEliece": 1.25,
                            "HQC": 3.5241916551074497,
                            "BIKE": 3.4669704628862146
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Helemaal mee oneens",
                            "EN": "Completely disagree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 1.2278387461245792,
                            "Classic McEliece": 0.0,
                            "HQC": 3.0322555401432663,
                            "BIKE": 2.9559606171816197
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "Kan uw toepassing meer RAM-gebruik aan?",
                    "EN": "Can your application afford more RAM usage?"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "De nieuwe wiskundige problemen waarop de quantumveilige cryptografie gebaseerd zijn, resulteren vaak in langere cryptografische sleutels en ciphertexts dan de quantumkwetsbare algoritmen zoals RSA en ECC. De publieke sleutel is nodig tijdens het maken van de versleuteling en de geheime sleutel voor de ontsleuteling. De versleuteling en één van de sleutels moeten daartoe tegelijkertijd in de RAM van het apparaat passen.",
                    "EN": "The ciphertext will generally be much larger than the ones generated by the current algorithms. The public key is also needed while encrypting a message, as well as the private key during decryption Therefore the ciphertext and either of the keys need to fit into your device's RAM simultaneously."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Minder dan 10 kB",
                            "EN": "Less than 10 kB"
                        },
                        "scores": {
                            "ML-KEM": 0.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "10 - 50 kB",
                            "EN": "10 - 50 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "50 - 100 kB",
                            "EN": "50 - 100 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Meer dan 100 kB",
                            "EN": "More than 100 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "Kan uw toepassing meer langetermijnopslag aan?",
                    "EN": "Can your application afford additional long-term storage?"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "Af en toe worden de publieke en geheime sleutel maar voor één sessie gebruikt, maar normaal gesproken moeten ze een langere tijd bewaard worden. Aangezien de sleutelparen voor de quantumveilige algoritmen normaal gesproken groter zijn dan de sleutelparen voor de huidige, quantumkwetsbare algoritmen, moet hier wel ruimte voor zijn op het gebruikte apparaat.",
                    "EN": "The public and private keys generally need to be stored for a longer time, not just for single sessions. These keys are significantly larger than those used by the current algorithms, so your device needs to be able to store them."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Minder dan 10 kB",
                            "EN": "Less than 10 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "10 - 50 kB",
                            "EN": "10 - 50 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "50 - 100 kB",
                            "EN": "50 - 100 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 3.0,
                            "Classic McEliece": 0.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Meer dan 100 kB",
                            "EN": "More than 100 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 0.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            }
        ]
    },
    {
        "category": {
            "EN": "Communication",
            "NL": "Communicatie"
        },
        "content": [
            {
                "question": {
                    "NL": "Mijn toepassing kan grotere ciphertexts aan dan in de huidige situatie.",
                    "EN": "My use case can afford larger ciphertexts than currently used."
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Het ontwerp van de nieuwe cryptografische algoritmen maakt ze vaak langzamer dan de huidige oplossingen zoals RSA of ECC en dit ontwerp gebruikt bovendien grotere cryptografische sleutels. De nieuwe algoritmen worden mogelijk een bottleneck voor de toepassing, zowel in resources als tijd. Uw toepassing zal met grotere cryptographische ciphertexts moeten omgaan, die ook uitgewisseld moeten worden.",
                    "EN": "The design of the new cryptographic schemes often makes them slower than the currently deployed cryptographic schemes like RSA and ECC and will use larger cryptographic keys. The new schemes may become a bottleneck for the application, both in resources and time. The application will have to handle larger cryptographic ciphertexts which have to be transmitted."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Helemaal mee eens",
                            "EN": "Completely agree"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 5.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Mee eens",
                            "EN": "Agree"
                        },
                        "scores": {
                            "ML-KEM": 4.635716234253236,
                            "FrodoKEM": 4.161912281875593,
                            "Classic McEliece": 5.0,
                            "HQC": 4.201922783468516,
                            "BIKE": 4.421120362035184
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Neutraal",
                            "EN": "Neutral"
                        },
                        "scores": {
                            "ML-KEM": 4.271432468506471,
                            "FrodoKEM": 3.323824563751187,
                            "Classic McEliece": 5.0,
                            "HQC": 3.4038455669370324,
                            "BIKE": 3.842240724070368
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Oneens",
                            "EN": "Disagree"
                        },
                        "scores": {
                            "ML-KEM": 3.9071487027597063,
                            "FrodoKEM": 2.4857368456267803,
                            "Classic McEliece": 5.0,
                            "HQC": 2.6057683504055484,
                            "BIKE": 3.2633610861055518
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Helemaal mee oneens",
                            "EN": "Completely disagree"
                        },
                        "scores": {
                            "ML-KEM": 3.5428649370129417,
                            "FrodoKEM": 1.647649127502374,
                            "Classic McEliece": 5.0,
                            "HQC": 1.8076911338740649,
                            "BIKE": 2.684481448140736
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            },
            {
                "question": {
                    "NL": "Kan uw toepassing meer communicatiekosten aan (in grootte)?",
                    "EN": "Can your application afford additional communication cost (in size)?"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "Sommige quantumveilige cryptografische algoritmen hebben een grotere versleuteling dan de huidige, quantumkwetsbare cryptografie en vereisen daarom meer bandbreedte.",
                    "EN": "This question is specifically about the communication bandwidth. Some schemes have larger ciphertexts than others, so these will be less suitable if your communication link is constrained on bandwidth."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Minder dan 10 kB",
                            "EN": "Less than 10 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 0.0,
                            "Classic McEliece": 0.0,
                            "HQC": 0.0,
                            "BIKE": 0.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "10 - 50 kB",
                            "EN": "10 - 50 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 3.0,
                            "Classic McEliece": 0.0,
                            "HQC": 3.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "50 - 100 kB",
                            "EN": "50 - 100 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 0.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Meer dan 100 kB",
                            "EN": "More than 100 kB"
                        },
                        "scores": {
                            "ML-KEM": 5.0,
                            "FrodoKEM": 5.0,
                            "Classic McEliece": 0.0,
                            "HQC": 5.0,
                            "BIKE": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    }
                ]
            }
        ]
    }
];