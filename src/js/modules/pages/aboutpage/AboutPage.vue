<template>
    <div class="w-full flex justify-center pt-12">
        <div class="w-full max-w-2xl px-4 flex flex-col items-center ">
            <template v-if="language.current == 'EN'">
                <!-- title  -->
                <h3 class="text-primary font-bold text-lg leading-none w-fit">
                    About the PQChoiceAssistant
                </h3>

                <!-- description -->
                <div class="mt-8 leading-none">
                    <br/><br/>
                    <b>Context</b>
                    <br/><br/>
                    The PQChoiceAssistant is a tool developed by TNO and Centrum Wiskunde & Informatica, with the
                    support of Fox Crypto, NXP, Technolution and Compumatica, commissioned by the Dutch General
                    Intelligence and Security Service (AIVD) and the Ministry of Economic Affairs and Climate Policy (min.
                    EZK), and executed under the dcypher roadmap Cryptography.<br/><br/>
                    The PQChoiceAssistant is an extension to the <a class="text-primary hover:underline" href="https://publications.tno.nl/publication/34643387/XTdELY16/TNO-2024-pqc-ne.pdf">PQC Migration Handbook</a>. The PQC Migration Handbook
                    assists organisations in mitigating the threat of quantum computers on currently used cryptography, 
                    by providing concrete advice, tools and methodologies. After the PQC
                    Diagnosis, in which the vulnerable cryptography is identified, the PQChoiceAssistant assists in making
                    the choice of which algorithm(s) to migrate to.

                    <br/><br/>
                    <b>Target Audience</b>
                    <br/><br/>
                    This tool is designed specifically for security decision makers, such as CISOs. The tool does not necessarily require cryptography knowledge, but does require knowledge on security and your use case.

                    <br/><br/>
                    <b>Usage Guide</b>
                    <br/><br/>
                    There are two separate questionnaires, one for Key Encapsulation Mechanisms (KEMs) and one for Digital Signature Algorithms (DSAs).<br/><br/>
                    Organisations typically have multiple use cases where the migration towards PQC is relevant. We recommend filling in the survey per use case. As these use cases can require operational and technical knowledge from multiple domains, filling this in with your team might be beneficial.<br/><br/>
                    All questions are optional.

                    <br/><br/>
                    <b>Scope</b>
                    <br/><br/>
                    Currently, we support ML-KEM, Classic McEliece, FrodoKEM, HQC and BIKE as Key Encapsulation Mechanisms. We support Falcon, ML-DSA, XMSS and SLH-DSA as Digital Signature Algorithms. These are the most prominent PQC candidates, as they are either accepted as a NIST standard or have governmental support.
                </div>
            </template>
            <template v-if="language.current == 'NL'">
                <!-- title  -->
                <h3 class="text-primary font-bold text-lg leading-none w-fit">
                    Over de PQChoiceAssistant
                </h3>

                <!-- description -->
                <div class="mt-8 leading-none">
                    <br/><br/>
                    <b>Context</b>
                    <br/><br/>
                    De PQChoiceAssistant is een tool ontwikkeld door TNO en Centrum Wiskunde & Informatica, met de ondersteuning
                    van Fox Crypto, NXP, Technolution and Compumatica, in opdracht van de AIVD
                    en het Ministerie van Economische Zaken en Klimaat, uitgevoerd onder de dcypher roadmap Cryptografie.<br/><br/>
                    De PQChoiceAssistant is een uitbreiding op het <a class="text-primary hover:underline" href="https://www.tno.nl/nl/newsroom/2023/04/pqc-migratie-handboek/">PQC Migratie Handboek</a>. Het PQC Migratie Handboek
                    ondersteunt organisaties in het mitigeren van de quantumdreiging op de huidige cryptografie,
                    door concreet advies, tooling en methodologieën aan te bieden. 
                    Na een PQC-diagnose, waarbij kwetsbare cryptografie wordt vastgesteld, helpt de PQChoiceAssistant bij het maken van de keuze
                    naar welk(e) algoritme(n) te migreren.

                    <br/><br/>
                    <b>Beoogd publiek</b>
                    <br/><br/>
                    Deze tool is specifiek ontworpen voor besluitvormers op het gebied van beveiliging, zoals CISO's. De tool vereist niet per se cryptografische kennis, maar vereist wel kennis over beveiliging en uw use case.

                    <br/><br/>
                    <b>Handleiding</b>
                    <br/><br/>
                    Er zijn twee losse vragenlijsten, één voor Key Encapsulation Mechanism (KEM's) en één voor Digital Signature Algorithms (DSA's).<br/><br/>
                    Organisaties hebben vaak meerdere toepassingen waarbij PQC-migratie relevant is. We raden aan de vragenlijst per use case in te vullen. Omdat de use cases operationele en technische kennis van meerdere domeinen vereisen, kan het voordelig zijn deze met uw team in te vullen.<br/><br/>
                    Alle vragen zijn optioneel.

                    <br/><br/>
                    <b>Bereik</b>
                    <br/><br/>
                    Momenteel ondersteunen we ML-KEM, Classic McEliece, FrodoKEM, HQC en BIKE als KEM's; en Falcon, ML-DSA, XMSS and SLH-DSA as DSA's. Dit zijn de meest prominente kandidaten, omdat ze ofwel geaccepteerd zijn al NIST-standaard, of overheidsondersteuning hebben.
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AboutPage',
        inject: ['language'],
    }
</script>
