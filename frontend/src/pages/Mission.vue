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

            <p>
                Een overzicht van de verkiezingskaarten die door gerenommeerde
                media gemaakt worden
            </p>

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
                    label="NRC (provinciale verk.)"
                    href="https://www.nrc.nl/nieuws/2023/03/16/verkiezingsuitslag-in-kaarten-a4159644"
                    image-alt="Verkiezingskaart NRC"
                    image="img/doel/nrc-provincie.png"
                />

                <image-container
                    :size="250"
                    label="NOS"
                    href="https://app.nos.nl/nieuws/tk2023/"
                    image-alt="Verkiezingskaart NOS"
                    image="img/doel/nos1.png"
                />
            </div>
        </section>
    </page>
</template>
