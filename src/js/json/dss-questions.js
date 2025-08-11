export const questions = [
    {
        "category": {
            "EN": "Information Security",
            "NL": "Informatiebeveiliging"
        },
        "content": [
            {
                "question": {
                    "NL": "Hoeveel jaar moeten de gegevens die u valideert geverifieerd blijven?",
                    "EN": "How many years does the data you are validating have to stay verified?"
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Als uw organisatie te maken heeft met informatie die gedurende lange tijd gevalideerd moet blijven, kan het voordelig zijn te investeren in een conservatiever post-quantum cryptografisch algoritme. Dit minimaliseert de waarschijnlijkheid dat het PQC-algoritme in de toekomst toch kwetsbaar blijkt te zijn. Dit vergroot daardoor de zekerheid dat de gegevens gevalideerd blijven tijdens de hele levensduur.",
                    "EN": "If your organisation is dealing with information that should remain verified for an extended period of time, it may be beneficial to invest in a more conservative post-quantum cryptographic scheme. This minimalises the probability that the PQC algorithm turns out to have a vulnerability in the future. This increases the assurance that the data will remain verified for its entire lifespan."
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 4,
                            "Falcon": 4.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 3,
                            "Falcon": 3.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 2,
                            "Falcon": 2.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 1,
                            "Falcon": 1.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 4,
                            "Falcon": 3.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 3,
                            "Falcon": 3.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 3.0
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
                            "ML-DSA": 3.9081144729131703,
                            "Falcon": 5.0,
                            "SLH-DSA": 4.858224288412846,
                            "XMSS": 5.0
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
                            "ML-DSA": 2,
                            "Falcon": 2.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 2,
                            "Falcon": 2.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 2.7266757413113023,
                            "Falcon": 2.319288721964648,
                            "SLH-DSA": 4.258902283559955,
                            "XMSS": 4.227258386320235
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
                            "ML-DSA": 3.453351482622605,
                            "Falcon": 2.6385774439292957,
                            "SLH-DSA": 3.51780456711991,
                            "XMSS": 3.454516772640471
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
                            "ML-DSA": 4.180027223933908,
                            "Falcon": 2.957866165893944,
                            "SLH-DSA": 2.776706850679865,
                            "XMSS": 2.681775158960707
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
                            "ML-DSA": 4.90670296524521,
                            "Falcon": 3.277154887858592,
                            "SLH-DSA": 2.03560913423982,
                            "XMSS": 1.9090335452809424
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 4.953351482622605,
                            "Falcon": 4.138577443929296,
                            "SLH-DSA": 3.75,
                            "XMSS": 3.75
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
                            "ML-DSA": 4.90670296524521,
                            "Falcon": 3.277154887858592,
                            "SLH-DSA": 2.5,
                            "XMSS": 2.5
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
                            "ML-DSA": 4.860054447867816,
                            "Falcon": 2.415732331787888,
                            "SLH-DSA": 1.25,
                            "XMSS": 1.25
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
                            "ML-DSA": 4.81340593049042,
                            "Falcon": 1.5543097757171838,
                            "SLH-DSA": 0.0,
                            "XMSS": 0.0
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
                            "ML-DSA": 5,
                            "Falcon": 4.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "ISO",
                            "EN": "ISO"
                        },
                        "scores": {
                            "ML-DSA": 0,
                            "Falcon": 0.0,
                            "SLH-DSA": 0.0,
                            "XMSS": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "IETF",
                            "EN": "IETF"
                        },
                        "scores": {
                            "ML-DSA": 1,
                            "Falcon": 1.0,
                            "SLH-DSA": 1.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 3.9173766019878347,
                            "Falcon": 3.3903515432472062,
                            "SLH-DSA": 3.0775086151887177,
                            "XMSS": 2.998784514796088
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
                            "ML-DSA": 2.8347532039756693,
                            "Falcon": 1.7807030864944124,
                            "SLH-DSA": 1.1550172303774353,
                            "XMSS": 0.9975690295921762
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
                            "ML-DSA": 1.752129805963504,
                            "Falcon": 0.17105462974161867,
                            "SLH-DSA": 0.0,
                            "XMSS": 0.0
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
                            "ML-DSA": 0.6695064079513386,
                            "Falcon": 0.0,
                            "SLH-DSA": 0.0,
                            "XMSS": 0.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 3,
                            "Falcon": 3.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 4,
                            "Falcon": 4.0,
                            "SLH-DSA": 0.0,
                            "XMSS": 0.0
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
                            "ML-DSA": 3,
                            "Falcon": 3.0,
                            "SLH-DSA": 1.0,
                            "XMSS": 1.0
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
                    "NL": "Welke van de volgende stellingen is van toepassing op uw situatie?\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30001. De duur van het zetten van een handtekening kan worden getimed door een niet vertrouwde partij\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30002. Het is belangrijk dat het zetten van handtekeningen snel is\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30003. I k kan hardware gebruiken die speciaal ontworpen of gecontroleerd veilig is voor FN-DSA",
                    "EN": "Which of the following statements apply to your situation?\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30001. The duration of the signing operation can be timed by a non-trusted party\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30002. The signing operation needs to be very fast\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u30003. I am able to use hardware that is specially designed or securely tested for FN-DSA"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "Sommige PQC-algoritmen hebben hardwareondersteuning nodig voor floating point arithmetic, om te garanderen dat het algoritme veilig en efficiënt is geïmplementeerd. In het bijzonder is FN-DSA zeer moeilijk veilig te implementeren met algemene floating point hardware-ondersteuning, en is zeer langzaam zonder floating points. In sommige situaties is daarom speciale hardware vereist.",
                    "EN": "Some cryptographic schemes require support for floating point arithmetic to enable a secure, efficient implementation. In particular, FN-DSA is very difficult to implement securely with general floating point hardware support, and very slow without floating points. In some situations, it may thus require special hardware."
                },
                "max_selectable_answers": 1,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "1 is niet van toepassing",
                            "EN": "1 does not apply"
                        },
                        "scores": {
                            "ML-DSA": 3,
                            "Falcon": 4.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 3.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "1, maar niet 2",
                            "EN": "1, but not 2"
                        },
                        "scores": {
                            "ML-DSA": 3,
                            "Falcon": 1.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 3.0
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat u constant-time handtekeninggeneratie nodig heeft, maar niet zeer snel. Als u FN-DSA gebruikt, moet u dit daarom doen met floating point emulatie om veiligheid te waarborgen.",
                            "EN": "You indicated that you require constant-time signature generation, although not very fast. If you use FN-DSA, you must therefore use it with floating point emulation to ensure security."
                        }
                    },
                    {
                        "text": {
                            "NL": "1 en 2, maar niet 3",
                            "EN": "1 and 2, but not 3"
                        },
                        "scores": {
                            "ML-DSA": 3,
                            "Falcon": -1.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 3.0
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat u snelle, constant-time handtekeninggeneratie nodig heeft, maar dat u geen specifieke hardware for FN-DSA heeft. Om deze reden kunt u FN-DSA niet gebruiken en deze wordt daarom niet als optie weergegeven.",
                            "EN": "You indicated that you require fast, constant-time signature generation, but you do not have suitable hardware for FN-DSA. For this reason, you should not use FN-DSA and it is therefore not displayed as an option."
                        }
                    },
                    {
                        "text": {
                            "NL": "1, 2 en 3",
                            "EN": "1, 2 and 3"
                        },
                        "scores": {
                            "ML-DSA": 3,
                            "Falcon": 5.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 3.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 3.75,
                            "Falcon": 3.8776611489768653,
                            "SLH-DSA": 5.0,
                            "XMSS": 4.458845532283275
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
                            "ML-DSA": 2.5,
                            "Falcon": 2.755322297953731,
                            "SLH-DSA": 5.0,
                            "XMSS": 3.91769106456655
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
                            "ML-DSA": 1.25,
                            "Falcon": 1.6329834469305966,
                            "SLH-DSA": 5.0,
                            "XMSS": 3.376536596849825
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
                            "ML-DSA": 0,
                            "Falcon": 0.5106445959074621,
                            "SLH-DSA": 5.0,
                            "XMSS": 2.8353821291331
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
                    "NL": "De nieuwe wiskundige problemen waarop de quantumveilige cryptografie gebaseerd zijn, resulteren vaak in langere cryptografische sleutels en handtekeningen dan de quantumkwetsbare algoritmen zoals RSA en ECC. De geheime sleutel is nodig tijdens het maken van de handtekening en de publieke sleutel voor de verificatie. De handtekening en één van de sleutels moeten daartoe tegelijkertijd in de RAM van het apparaat passen.",
                    "EN": "The signatures will generally be much larger than the ones generated by the current algorithms. The private key is also needed while signing a message, as well as the public key during verification. Therefore the signature and either of the keys need to fit into your device's RAM simultaneously."
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
                            "ML-DSA": 0,
                            "Falcon": 0.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 0.0
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
                            "ML-DSA": 0,
                            "Falcon": 0.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 0,
                            "Falcon": 3.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 3,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                    "NL": "Mijn toepassing kan grotere handtekeningen aan dan in de huidige situatie.",
                    "EN": "My use case can afford larger signatures than currently used."
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Het ontwerp van de nieuwe cryptografische algoritmen maakt ze vaak langzamer dan de huidige oplossingen zoals RSA of ECC en dit ontwerp gebruikt bovendien grotere cryptografische sleutels. De nieuwe algoritmen worden mogelijk een bottleneck voor de toepassing, zowel in resources als tijd. Uw toepassing zal met grotere cryptographische handtekeningen moeten omgaan, die ook uitgewisseld moeten worden.",
                    "EN": "The design of the new cryptographic schemes often makes them slower than the currently deployed cryptographic schemes like RSA and ECC and will use larger cryptographic keys. The new schemes may become a bottleneck for the application, both in resources and time. The application will have to handle larger cryptographic signatures which have to be transmitted."
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 4.76950986858887,
                            "Falcon": 5.0,
                            "SLH-DSA": 4.339556072103211,
                            "XMSS": 4.85755608095015
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
                            "ML-DSA": 4.539019737177741,
                            "Falcon": 5.0,
                            "SLH-DSA": 3.679112144206423,
                            "XMSS": 4.715112161900302
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
                            "ML-DSA": 4.308529605766612,
                            "Falcon": 5.0,
                            "SLH-DSA": 3.018668216309635,
                            "XMSS": 4.572668242850453
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
                            "ML-DSA": 4.078039474355482,
                            "Falcon": 5.0,
                            "SLH-DSA": 2.3582242884128464,
                            "XMSS": 4.430224323800603
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
                    "NL": "Sommige quantumveilige cryptografische algoritmen hebben een grotere handtekening dan de huidige, quantumkwetsbare cryptografie en vereisen daarom meer bandbreedte.",
                    "EN": "This question is specifically about the communication bandwidth. Some schemes have larger signatures than others, so these will be less suitable if your communication link is constrained on bandwidth."
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
                            "ML-DSA": 3,
                            "Falcon": 5.0,
                            "SLH-DSA": 0.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 3.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
            "EN": "Attacks",
            "NL": "Aanvallen"
        },
        "content": [
            {
                "question": {
                    "NL": "Vormt een aanvaller met fysieke toegang tot uw apparaat een dreiging?",
                    "EN": "Do you need to mitigate the risk of attackers potentially getting physical access to the device?"
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Aanvallen op basis van side-channel analysis, waarbij de aanvaller slim gebruik maakt van informatiestromen zoals tijds- en stroomverbruik door het apparaat, vormen een dreiging voor de integere werking van de cryptografie. Daartoe moet de aanvaller wel fysieke toegang hebben tot het apparaat. Op ontwerpniveau kan de dreiging van het tijdsverbruik gemitigeerd worden, maar sommige cryptografische algoritmen zijn makkelijker te beschermen tegen dit soort aanvallen dan anderen.",
                    "EN": "In a side-channel analysis attack, an attacker exploits information about the time or power consumption, threatening the integrity and confidentiality of the cryptography. However, to perform such an attack, the attacker needs physical access to the device. The leakage of timing information can be mitigated in the design and implementation of the cryptographic scheme. However, some schemes are easier to protect against side-channel attacks than others."
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
                            "ML-DSA": 5,
                            "Falcon": 1.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 0,
                            "Falcon": 0.0,
                            "SLH-DSA": 0.0,
                            "XMSS": 0.0
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
                    "NL": "(Vervolg) Welke operatie(s) moet u beschermen?",
                    "EN": "(Follow-up) Which operation(s) do you need to protect?"
                },
                "expert_level": true,
                "custom_scoring": null,
                "description": {
                    "NL": "Sommige cryptografische operaties kunnen makkelijker beschermt worden tegen het lekken van het tijdsverbruik dan andere operaties, liggend aan het onderliggende cryptografische ontwerp.",
                    "EN": "Some cryptographic operations can be secured more easily against the leakage of timing information than other operations, depending on the underlying cryptographic design."
                },
                "max_selectable_answers": 3,
                "scoring_question": true,
                "answers": [
                    {
                        "text": {
                            "NL": "Sleutelgeneratie",
                            "EN": "Key Generation"
                        },
                        "scores": {
                            "ML-DSA": 5,
                            "Falcon": 1.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Ondertekenen",
                            "EN": "Signing"
                        },
                        "scores": {
                            "ML-DSA": 5,
                            "Falcon": 1.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
                        },
                        "error_message": {
                            "NL": null,
                            "EN": null
                        }
                    },
                    {
                        "text": {
                            "NL": "Verificatie",
                            "EN": "Verification"
                        },
                        "scores": {
                            "ML-DSA": 5,
                            "Falcon": 5.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
                            "ML-DSA": 5,
                            "Falcon": 1.0,
                            "SLH-DSA": 5.0,
                            "XMSS": 5.0
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
            "EN": "Statefulness",
            "NL": "Statefulness"
        },
        "content": [
            {
                "question": {
                    "NL": "Heeft uw toepassing maar een beperkt aantal handtekeningen nodig en kan tegelijkertijd ook de cryptografische interne toestand veilig bijgehouden worden?",
                    "EN": "Does your use case only require a limited number of signatures, and is it also able to securely handle the cryptographic state?"
                },
                "expert_level": false,
                "custom_scoring": null,
                "description": {
                    "NL": "Een specifieke klasse van quantumveilige stateful handtekening algoritmen gebaseerd op hashes, garanderen zowel een hoge mate van veiligheid en hogere efficiëntie dan de niet-stateful handtekening algoritmen. Stateful hier houdt in dat de ondertekenaar bij moet houden welke cryptografische sleutelparen al zijn gebruikt.",
                    "EN": "A specific class of signature schemes, known as stateful hash-based signature schemes, combines high security guarantees with better performance than its stateless counterpart. The limitation in this case, is that the scheme can only sign a limited amount of messages (typically between 2^10 and 2^20 signatures) and it requires a different key for every signature. Applications like secure booting are ideal for these schemes, but in general it is hard to adopt stateful hash-based schemes due to the difficulty in handling the signing keys."
                },
                "max_selectable_answers": 1,
                "scoring_question": false,
                "answers": [
                    {
                        "text": {
                            "NL": "Ja",
                            "EN": "Yes"
                        },
                        "scores": {
                            "ML-DSA": 0,
                            "Falcon": 0.0,
                            "SLH-DSA": 0.0,
                            "XMSS": 0.0
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
                            "ML-DSA": 0,
                            "Falcon": 0.0,
                            "SLH-DSA": 0.0,
                            "XMSS": -1.0
                        },
                        "error_message": {
                            "NL": "U heeft aangegeven dat uw toepassing niet om kan gaan met de cryptographische interne toestand. XMSS is een stateful algoritme incompatibel met uw situatie en wordt daarom niet als optie weergegeven.",
                            "EN": "You indicated that your application is not able to handle the cryptographic state. XMSS is a stateful algorithm incompatible with your situation and is therefore not displayed as an option."
                        }
                    }
                ]
            }
        ]
    }
];