<template>

<ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
  </ion-menu>
  <ion-page  id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Fitness Studio App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Nuxt Ionic</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container" class="my-10 max-w-5xl mx-auto">
        <div class="flex justify-center items-center">
          <nuxt-img provider="cloudinary" src="v1700979853/cld-sample-5.jpg" width="300" height="200" />
        </div>
        <h1>Very Cool Fitness App</h1>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="12" size-md="3">
              <ion-card>
                <div class="video-responsive">
                  <iframe src="https://player.vimeo.com/video/857228700" title="Video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
                <ion-card-header>
                  <ion-card-title>Card Title</ion-card-title>
                  <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </ion-card-content>
              </ion-card>
            </ion-col>

            <!-- Repeat for other columns, ensure each iframe is wrapped with .video-responsive -->
          </ion-row>
        </ion-grid>
        <ion-button router-link="/resources">Get Started</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>


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
.video-responsive {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#container {
  text-align: center;
  
}
</style>
