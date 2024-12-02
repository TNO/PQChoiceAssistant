export default [
    {
        "category": {
            "NL": "Onderliggend moeilijk probleem",
            "EN": "Underlying hard problem"
        },
        "content": {
            "ML-DSA": {
                "NL": "Gebaseerd op de learning with errors en short integer solution problemen (lattice-based)",
                "EN": "Based on the learning with errors and short integer solution problems (lattice-based)"
            },
            "Falcon": {
                "NL": "Gebaseerd op het NTRU shortest vector probleem (lattice-based)",
                "EN": "Based on the NTRU shortest vector problem (lattice-based)"
            },
            "SLH-DSA": {
                "NL": "Gebaseerd op collision en preimage resistance (hash-based)",
                "EN": "Based on collision and preimage resistance (hash-based)"
            },
            "XMSS": {
                "NL": "Gebaseerd op collision en preimage resistance (hash-based)",
                "EN": "Based on collision and preimage resistance (hash-based)"
            }
        }
    },
    {
        "category": {
            "NL": "Volwassenheid",
            "EN": "Maturity"
        },
        "content": {
            "ML-DSA": {
                "NL": "Gepubliceerd in 2017",
                "EN": "Published in 2017"
            },
            "Falcon": {
                "NL": "Gepubliceerd in 2017",
                "EN": "Published in 2017"
            },
            "SLH-DSA": {
                "NL": "Gepubliceerd in 2017, drie jaar na de voorloper SPHINCS",
                "EN": "Published in 2017, three years after its predecessor SPHINCS"
            },
            "XMSS": {
                "NL": "Gepubliceerd in 2011",
                "EN": "Published in 2011"
            }
        }
    },
    {
        "category": {
            "NL": "Standardisatie",
            "EN": "Standardisation"
        },
        "content": {
            "ML-DSA": {
                "NL": "Eén van de winnaars van de zes jaar durende competitie van NIST, is als standaard uitgebracht in 2024 als FIPS 204",
                "EN": "One of the winners of NIST's six-year long competition, was released as a standard in 2024 as FIPS 204"
            },
            "Falcon": {
                "NL": "Eén van de winnaars van de zes jaar durende competitie van NIST, is gepland voor uitgave als een standaard",
                "EN": "One of the winners of NIST's six-year long competition, is slated to be released as a standard"
            },
            "SLH-DSA": {
                "NL": "Eén van de winnaars van de zes jaar durende competitie van NIST, is als standaard uitgebracht in 2024 als FIPS 205",
                "EN": "One of the winners of NIST's six-year long competition, was released as a standard in 2024 as FIPS 205"
            },
            "XMSS": {
                "NL": "Niet geselecteerd door NIST, maar wel gespecificieerd in IETF RFC 8391 en maakt deel uit van ISO 14888-4",
                "EN": "Not selected by NIST, but is specified in IETF RFC 8391 and also part of in ISO 14888-4"
            }
        }
    },
    {
        "category": {
            "NL": "Side channel attack maatregelen",
            "EN": "Side channel attack countermeasures"
        },
        "content": {
            "ML-DSA": {
                "NL": "Vrij bestendig",
                "EN": "Fairly resistant"
            },
            "Falcon": {
                "NL": "Gebruik van floating points en discrete sampling maakt side-channel resistance zeer uitdagend",
                "EN": "Use of floating points and discrete sampling make side-channel resistance very challenging"
            },
            "SLH-DSA": {
                "NL": "Vrij bestendig",
                "EN": "Fairly resistant"
            },
            "XMSS": {
                "NL": "Een zwakke bron van randomness is zeer vatbaar voor aanvallen die electriciteitsgebruik meten",
                "EN": "A weak source of randomness is very susceptible to power analysis attacks"
            }
        }
    },
    {
        "category": {
            "NL": "Statefulness",
            "EN": "Statefulness"
        },
        "content": {
            "ML-DSA": {
                "NL": "Stateless",
                "EN": "Stateless"
            },
            "Falcon": {
                "NL": "Stateless",
                "EN": "Stateless"
            },
            "SLH-DSA": {
                "NL": "Stateless",
                "EN": "Stateless"
            },
            "XMSS": {
                "NL": "Stateful, implementaties moeten zeer voorzichtig zijn om hergebruik van éénmalige sleutels te voorkomen",
                "EN": "Stateful, implementations must take great care preventing one-time-key reusage"
            }
        }
    }
]