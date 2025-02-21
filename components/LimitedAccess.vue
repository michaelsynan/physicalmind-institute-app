<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';


const client = useSupabaseClient();
const user = useSupabaseUser();
const message = ref('');
const success = ref(false);

const access = ref('');
const validOrders = ['12345', '67890', '13579']; // Example valid order numbers

/* modal logic */
const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

import { defineEmits } from 'vue';

const emit = defineEmits(['accessGranted']);

const confirm = async () => {
  const orderNumber = input.value.$el.value.trim();
  if (!orderNumber) {
    message.value = 'Please enter a valid order number.';
    success.value = false;
    return;
  }

  try {
    console.log('Checking order number:', orderNumber);

    // Step 1: Verify the order exists
    const { data, error } = await client
      .from('order_numbers')
      .select('order_no')
      .eq('order_no', orderNumber)
      .maybeSingle();

    if (error) {
      console.error('Supabase query error:', error);
      message.value = 'Error verifying order number. Please try again later.';
      success.value = false;
    } else if (!data) {
      console.warn('No matching order found.');
      message.value = 'We could not find that order number, please contact info@pmiemail.com';
      success.value = false;
    } else {
      console.log('Order found:', data);

      // Step 2: Update the user's profile
      const { error: updateError } = await client
        .from('profiles')
        .update({ order_no: orderNumber })
        .eq('id', user.value.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        message.value = 'Order verified, but we couldn’t update your profile. Contact support.';
        success.value = false;
      } else {
        console.log('Profile updated successfully.');
        message.value = 'Congratulations, your order is confirmed and saved!';
        success.value = true;

        // Emit event to notify parent
        emit('accessGranted');
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    message.value = 'An unexpected error occurred. Please try again.';
    success.value = false;
  }

  modal.value.$el.dismiss();
};



const onWillDismiss = () => {
  // Optional cleanup or further actions after modal dismissal
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
          <ion-col size-md="12" size-lg="6" size-xs="12">
            <ion-text>
              <p class="mb-2">
                To gain full access to this app, you must submit your TYE4/X order number. If you do not have your order
                number or it doesn't work, you can submit photo proof of you and your TYE4/X to <a
                  href="mailto:info@pmiemail.com">info@pmiemail.com</a>.
                <br />
              </p>
              <ion-button id="open-modal" expand="block" class="mt-4">Submit Order Number</ion-button>
              <p v-if="message" :class="{ 'text-green-500': success, 'text-red-500': !success }">{{ message }}</p>
              <p class="pt-2">Need more help?</p>
            </ion-text>
            <!-- Modal area -->
            <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="cancel">Cancel</ion-button>
                  </ion-buttons>
                  <ion-title>Enter Your Order Number</ion-title>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <ion-item class="pt-0 overflow-visible !flex !flex-col">
                  <ion-input class="custom w-full" ref="input" type="text" placeholder="Your order number"
                    fill="outline"></ion-input>
                </ion-item>
                <div class="px-3">
                  <ion-button expand="block" class="mt-4" @click="confirm">Submit</ion-button>
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
