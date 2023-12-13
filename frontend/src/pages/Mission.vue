<script setup lang="ts">
import Page from "@/components/page/Page.vue";
import ImageContainer from "@/components/image-container/ImageContainer.vue";
</script>

<template>
    <page>
        <section>
            <h3>"Het hele land kleurt PVV!"</h3>
            <p>
                Na de verkiezingen van 22 november 2023 verschenen weer allerlei
                koppen in de kranten met de strekking van "Nederland kleurt PVV"
            </p>

            <image-container
                label="Volkskrant 24 november 2023"
                href="https://www.volkskrant.nl/politiek/in-grafieken-het-hele-land-kleurt-pvv-links-is-historisch-klein~b73ba7c8/?referrer=https://www.google.com/"
                image-alt="kop Volkskrant"
                image="img/doel/kop-volkskrant.png"
            />
        </section>

        <section>
            <h3>Verkiezingskaarten in de media</h3>

            <div class="image-set">
                <image-container
                    :size="250"
                    label="RTL"
                    href="https://www.rtlnieuws.nl/nieuws/politiek/artikel/5419811/verkiezingsuitslag-tweede-kamer-stemmen-uitslag"
                    image-alt="Verkiezingskaart RTL"
                    image="img/doel/rtl.png"
                />

                <image-container
                    :size="250"
                    label="NOS"
                    href="https://app.nos.nl/nieuws/tk2023/"
                    image-alt="Verkiezingskaart NOS"
                    image="img/doel/nos1.png"
                />
            </div>

            <p>
                En inderdaad, de kaarten laten een land zien wat volledig
                omgeslagen is naar PVV (voor de kaartmakers is het nog even
                wennen welke kleur PVV te geven; RTL koos voor grijzig, NOS voor
                lichtblauw. Ook GL+PvdA is wennen, zijn ze nou rood of groen?
                Wij kozen er overigens voor om de NOS kleuren te volgen).
            </p>

            <p>
                Alleen de grote (studenten)steden laten voornamelijk GL+PVDA
                zien en heel Twente kleurde in het geel van NSC. Dus niet gek
                dat we het ook de hele tijd hebben over "de Stad" vs. "het
                Platteland".
            </p>

            <p>TOCH?</p>
        </section>

        <section>
            <h3>Weilanden mogen niet kiezen</h3>

            <p>
                Wat sowieso al een flinke gevoelsmatige vertekening geeft in
                deze kaarten, is het feit dat de blauwe vlek van bijv. de
                gemeente Het Hogeland (met zo'n 48 duizend inwoners) 3x zo groot
                is als de rode vlek van Amsterdam (met bijna 20x zo veel
                inwoners!)
            </p>

            <p>
                NOS heeft deze jaargang gekozen voor een aparte modus waarmee je
                kan wisselen van de traditionele kaart (waarin Het Hogeland dus
                3x zwaarder mee lijkt te tellen dan Amsterdam) en een zogenaamde
                <i>cartogram</i>, waarin de representatie van de gemeenten is
                gecorrigeerd voor het aantal inwoners.
            </p>

            <p>
                Is de kop "links is historisch klein" dan nog steeds
                gerechtvaardigd?<br />
                Het zal cijfermatig vast wel zo zijn, maar is het dé
                significante trend die we zien?
            </p>

            <image-container
                :size="250"
                label="NOS"
                href="https://app.nos.nl/nieuws/tk2023/"
                image-alt="Verkiezingskaart NOS"
                image="img/doel/nos2.png"
            />
        </section>

        <section>
            <h3>Missende kiezers op de kaart</h3>

            <p>
                In Rotterdam kozen 58 duizend stemmers voor GL+PvdA. Ze staan
                niet op deze kaarten.<br /><br />
                In Den Haag 47 duizend, ook zij staan niet op de kaarten.<br /><br />
                En Amsterdam een duidelijk links bolwerk? 49 duizend stemmen
                voor VVD, 41 duizend voor D66 en 40 duizend voor PVV. Ook zij
                staan allemaal niet op de kaarten.
            </p>

            <p>
                Op de kaart van 2023 volgens het gekozen principe (dus die van
                oa RTL en NOS) is slecht 27.6% van de stemmen zichtbaar!
            </p>
        </section>

        <section>
            <h3>Waarom een kaart?</h3>

            <p>
                Het medium <b>kaart</b> is voor ontwepers en developers een
                aantrekkelijke manier om de verkiezingsuitslag te visualiseren.
                Maar het heeft een aantal intrinsieke nadelen die gevoelsmatige
                vertekeningen geven.
            </p>

            <p>
                Waarom kiezen we eigenlijk voor een kaart? Wat is het verschil
                met een tabel/lijst met alle gemeenten/partijen/stemmen? Want
                dat is bij uitstek de manier om het wie/wat/waar te
                communiceren.
            </p>

            <p>
                Blijkbaar willen we meer vertellen of iets anders kunnen
                vertellen/analyseren. Willen we verbanden zien, dingen als "de
                stad" vs. "het platteland", de "Biblebelt", of welke kleur
                blijkbaar het land dit jaar heeft.
            </p>
        </section>

        <section>
            <h3>Ambitie</h3>

            <p>
                De ambitie van dit project is een alternatieve kaart te maken,
                die nog steeds de antwoorden probeert te geven op vragen als:<br />
                Welke kleur is het land dit jaar?<br />
                Zijn er regionale trends of verbanden te zien?<br />
                Wat stemt "de stad"? En stemt "het Platteland" zoveel anders?
            </p>

            <p>
                In de keuzes die we maken mag het wie/wat/waar iets aan
                concessies doen, als je dat wilt weten zijn de tabellen er
                immers ook nog steeds.<br />
                En een laatste uitdaging is om de kaart iconisch te houden, de
                unieke vorm van Nederland moet wel behouden blijven.
            </p>
        </section>
    </page>
</template>
