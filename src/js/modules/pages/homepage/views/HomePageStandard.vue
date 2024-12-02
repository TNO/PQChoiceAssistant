<template>
    <div class="w-full flex justify-center mt-12 ">
        <div class="w-full max-w-5xl flex gap-4 min-h-[80vh]">
            <!-- left panel -->
            <div class="flex-1">
                <!-- title  -->
                <h3 class="text-primary font-bold text-lg leading-none">
                    Start
                </h3>

                <!-- description -->
                <div class="font-semibold my-8 leading-none">
                    <template v-if="language.current == 'EN'">
                        For which type of algorithm do you need assistance?
                    </template>
                    <template v-if="language.current == 'NL'">
                        Voor welk type algoritme heeft u ondersteuning nodig?
                    </template>
                </div>

                <!-- button container -->
                <div class="w-full">
                    <!-- button to KEM / Encryption -->
                    <div @click="$router.push({ name: 'KEMPageRoute' })"
                        class="w-2/3 mb-4 bg-secondary text-white p-3 rounded-lg cursor-pointer">
                        <div class="text-xl leading-none mb-2">
                            <template v-if="language.current == 'EN'">
                                Encapsulation
                            </template>
                            <template v-if="language.current == 'NL'">
                                Sleutelinkapseling
                            </template>
                        </div>

                        <div class="w-full flex justify-end items-center">
                            <div>
                                <template v-if="language.current == 'EN'">
                                    Start survey
                                </template>
                                <template v-if="language.current == 'NL'">
                                    Begin enquête
                                </template>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                    class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- button to DSS / Signatures -->
                    <div @click="$router.push({ name: 'DSSPageRoute' })"
                        class="w-2/3 mb-4 bg-quadrinary text-white p-3 rounded-lg cursor-pointer">
                        <div class="text-xl leading-none mb-2">
                            <template v-if="language.current == 'EN'">
                                Signatures
                            </template>
                            <template v-if="language.current == 'NL'">
                                Handtekeningen
                            </template>
                        </div>

                        <div class="w-full flex justify-end items-center">
                            <div>
                                <template v-if="language.current == 'EN'">
                                    Start survey
                                </template>
                                <template v-if="language.current == 'NL'">
                                    Begin enquête
                                </template>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                    class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- button to DSS / Signatures -->
                    <div @click="$router.push({ name: 'AlgorithmOverviewPageRoute' })"
                        class="w-2/3 bg-primary text-white p-3 rounded-lg cursor-pointer">
                        <div class="text-xl leading-none mb-2">
                            <template v-if="language.current == 'EN'">
                                Overview of PQC algorithms
                            </template>
                            <template v-if="language.current == 'NL'">
                                Overzicht van PQC-algoritmen
                            </template>
                        </div>

                        <div class="w-full flex justify-end items-center">
                            <div>
                                <template v-if="language.current == 'EN'">
                                    View
                                </template>
                                <template v-if="language.current == 'NL'">
                                    Bekijk
                                </template>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                    class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- devider -->
            <div class="w-[1px] flex-grow-0 bg-primary" />

            <!-- right panel -->
            <div class="flex-1">
                <template v-if="language.current == 'EN'">
                    <!-- title  -->
                    <h3 class="text-primary font-bold text-lg leading-none">
                        Welcome to the PQChoiceAssistant!
                    </h3>

                    <!-- description -->
                    <div  class="mt-8 leading-none">
                        This open-source tool provides you with advice on the applicability of various post-quantum
                        cryptographic algorithms for your use case.<br /><br />
                        By answering relevant questions about your use case, you are able to see recommendations on the
                        most well-suited option, as well as the pros and cons of the schemes.<br /><br />
                        All information entered in the PQChoiceAssistant is handled client-side, and all calculations are
                        done
                        in the browser. Therefore, no information is stored or viewed by the creators of the
                        PQChoiceAssistant.<br /><br />
                        <i>For this reason, the tool can also be used offline. You can download the website code and
                            background material from GitHub, by clicking the GitHub icon in the top right.</i>
                    </div>
                </template>
                <template v-if="language.current == 'NL'">
                    <!-- title  -->
                    <h3 class="text-primary font-bold text-lg leading-none">
                        Welkom bij de PQChoiceAssistant!
                    </h3>

                    <!-- description -->
                    <div class="mt-8 leading-none">
                    Deze open-source tool biedt advies over de geschiktheid van verschillende post-quantum cryptografische algoritmen voor uw toepassing.<br /><br />
                    Door relevante vragen over uw situatie te beantwoorden, kunt u aanbevelingen zien over de meest geschikte opties, net als de voor- en nadelen van elk algoritme.<br /><br />
                    Alle informatie die u in de PQChoiceAssistant invoert, wordt aan de client-side behandeld en alle berekeningen worden in uw browser uitgevoerd. Dit zorgt ervoor dat geen informatie wordt opgeslagen of gezien door de makers van de PQChoiceAssistant.<br /><br />
                    <i>Om deze reden is het hulpmiddel ook offline te gebruiken. U kunt eenvoudig de websitecode en het achtergrondmateriaal downloaden van GitHub, door op het GitHub-icoontje in de rechterbovenhoek te klikken.</i>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePageStandard',
    inject: ['language'],
}
</script>
