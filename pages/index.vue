<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Fitness Studio App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Nuxt Ionic</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <div>
        </div>
        <div class="flex justify-center items-center">
  <nuxt-img provider="cloudinary" src="v1700979853/cld-sample-5.jpg" width="300" height="200" />
</div>

        <h1>Very Cool Fitness App</h1>
        <ion-grid :fixed="true">
          <ion-row>
            <ion-col> <ion-card>
                <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen class="w-full"></iframe>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col> <ion-card>
                <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen class="w-full"></iframe>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col> <ion-card>
                <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen class="w-full"></iframe>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button router-link="/resources">Get Started</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>