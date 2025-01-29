<script setup lang="ts">

const client = useSupabaseClient();

const user = useSupabaseUser();
import { OverlayEventDetail } from '@ionic/core/components';

const access = ref('');

/* modal logic */

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
  if (event.detail.role === 'confirm') {
    message.value = `Hello, ${event.detail.data}!`;
  }
};

/* end modal logic */



async function fetchUserProfile() {
  if (user.value) {
    const { data, error } = await client
      .from('profiles')
      .select('access')
      .eq('id', user.value.id)
      .single();  // Assumes there is only one profile per user

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    access.value = data.access;
  }
}

onMounted(fetchUserProfile);

</script>

<template>
  <div id="limited-container" class="max-w-5xl mx-auto">

    <ion-card>
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <SingleVideo />
              <div
                class="flex flex-row my-4 gap-2.5 items-center rounded-lg p-1.5 bg-stone-200 dark:bg-stone-800 bg-opacity-50">
                <ion-icon class="text-5xl text-rose-400" :md="ioniconsAlertCircleOutline"
                  :ios="ioniconsAlertCircleOutline"></ion-icon>
                <p class="text-sm dark:text-white">To gain access to additional content please submit your TYE4/X order
                  number.</p>
              </div>
            </ion-text>
            <ion-text>
              <p>
                Access to the full PhysicalMind Studio app requires the purchase of TYE4 or TYE4X. Please submit your
                order number below and allow 48 hours to confirm. If you are still unable to access the content please
                see <ion-text router-link="/help" class="cursor-pointer">support</ion-text>.
              </p>
              <ion-button id="open-modal" expand="block" class="mt-4">Submit Order Number</ion-button>
              <p class="pt-2">Need more help?</p>
            </ion-text>
            <!-- Modal area -->
            <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                  </ion-buttons>
                  <ion-title></ion-title>

                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <h2 class="w-full block px-4 py-2">Enter Your TYE4/X Order Number</h2>
                <ion-item class="pt-0 overflow-visible !flex !flex-col">


                  <ion-input class="custom w-full" ref="input" type="text" placeholder="Your order number"
                    fill="outline"></ion-input>
                </ion-item>
                <div class="px-3">
                  <ion-button id="open-modal" expand="block" class="mt-4">Submit</ion-button>
                </div>
              </ion-content>
            </ion-modal>
            <!-- end Modal area -->
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
  </div>
</template>

<style scoped>
::v-deep input.sc-ion-input-md {
  padding-inline: 10px !important;
}

::v-deep .sc-ion-input-md .label-text-wrapper {
  transform: translateY(-25px) !important;
}

::v-deep input.label-text {
  padding-inline: 10px !important;
}

/* ion-input.custom {
  --background: #373737;
  --color: #fff;
  --placeholder-color: #ddd;
  --placeholder-opacity: 0.8;

  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 10px;
  --padding-top: 10px;
} */
</style>
