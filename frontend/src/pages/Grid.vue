<script setup lang="ts">
import Page from "@/components/page/Page.vue";
</script>

<template>
    <page>
        <h2>Uitleg grid</h2>

        <section>
            <p>
                Uitgangspunt van dit project, is om zoveel mogelijk stemmers te
                representeren op de kaart. Om dit te bereiken moeten wat
                concessies gedaan worden op het gebied van wie/wat/waar. Niet
                elke stemmer zal precies belanden in zijn eigen gemeente. We
                gebruiken een principe van cellen op een grid vullen, wat
                hieronder uitgelegd wordt.
            </p>

            <p>
                De kaart is opgedeeld in een grid van een aantal cellen (dit
                aantal is variabel en aan te passen door de gebruiker). Aan de
                hand van de grootte van de cellen, wordt bepaald hoeveel
                stemmers er in een cel passen. In het fictieve voorbeeld
                hieronder, passen er 20.000 stemmers in een cel.
            </p>

            <p>
                We kijken naar een klein onderdeel van de kaart waar 2 gemeentes
                (Gemeente 1 en Gemeente 2) in vallen.
            </p>

            <img src="img/grid/grid-1.png" alt="Uitleg grid deel 1" />
        </section>

        <section>
            <h3>Sets verdelen op volgorde van grootte</h3>

            <p>
                We sorteren alle stem-sets (een set van stemmen in een gemeente
                op een partij) op volgorde van grootte. Partij A in Gemeente 1 -
                met 30.000 stemmen - is dus als eerste aan de beurt. Alleen
                passen er maar 20.000 (van de 30.000) stemmen in de cel. We
                vullen dus de cel op de exacte locatie van de gemeente met
                20.000 stemmen van Partij A. De overige houden we even apart.
            </p>

            <p>
                Vervolgens is Partij B in Gemeente 1 aan de beurt. Deze partij
                heeft 25.000 stemmen. Maar de exacte cel die hoort bij de
                gemeente is nu al gevuld, dus we kijken rondom de cel (arbitrair
                startend vanaf noord-west in een cirkel met de klok mee) naar
                een beschikbare cel. Die vullen we met 20.000 stemmen van Partij
                B en de overige 5.000 houden we weer apart.
            </p>
            <img src="img/grid/grid-2.png" alt="Uitleg grid deel 1" />
        </section>

        <section>
            <h3>Grootte van een vierkant</h3>
            <p>
                Nu is de stem-set van 15.000 stemmen voor Partij C in Gemeente 2
                het grootste overgebleven set. Deze past in de cel op de locatie
                van Gemeente 2. Omdat het geen volle cel is wordt hij iets
                kleiner afgebeeld.
            </p>

            <img src="img/grid/grid-3.png" alt="Uitleg grid deel 1" />

            <p>
                De 10.000 resterende stemmen op Partij A in Gemeente 1 is nu het
                grootste stem-set. Die krijgt een eigen plekje, en wordt in de
                dichstbijzijnde cel rondom de gemeente geplaatst. En vervolgens
                de resterende stemmen van Partij B en tenslotte de 5.000 stemmen
                op Partij C. Gemeente 1 is nu volledig geplaatst op de kaart.
            </p>

            <img src="img/grid/grid-4.png" alt="Uitleg grid deel 1" />
        </section>

        <section>
            <h3>Meerdere sets in 1 cel</h3>
            <p>
                Er zijn nu nog in Gemeente 2 5.000 stemmen op Partij B en 5.000
                stemmen op Partij A over. Voor Partij B is er nog 1 plekje over
                op de eerste cel naast de gemeente.
            </p>

            <p>
                Vervolgens stuit de zoektocht voor een gaatje voor de stemmen
                van Partij A op de al gevulde stemmen van Gemeente 1. De
                volgende cel aan de beurt is de cel met stemmen voor Partij A,
                maar van Gemeente 1. Omdat hier nog plaats is voor de 5.000
                stemmen, worden die samengevoegd en wordt het vierkant
                vervolgens dus groter afgebeeld.
            </p>
            <img src="img/grid/grid-5.png" alt="Uitleg grid deel 1" />
        </section>
    </page>
</template>
