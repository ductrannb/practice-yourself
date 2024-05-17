<template>
  <div class="pa-4 text-center change-password-dialog">
    <Payment @onSuccess="console.log('alo')"/>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card title="Nạp tiền">
        <Form class="recharge-form" @submit="submit">
          <v-autocomplete
              v-if="!isManual"
              v-model="form.amount"
              :items="items"
              label="Chọn mệnh giá"
              :auto-select-first="true"
              item-title="text"
              item-value="value"
              variant="underlined"
              hide-details/>
          <v-checkbox
              v-model="isManual"
              label="Nhập thủ công"
              class="mb-2"
              hide-details/>
          <v-number-input
              v-if="isManual"
              variant="underlined"
              label="Nhập thủ công"
              control-variant="split"
              v-model="amountManual"
              :min="10000"
              :step="10000"
              class="mb-2"
          />
          <div class="btn-login-container">
            <button type="button" class="custom-btn btn-cancel" @click="showDialog = false">Hủy</button>
            <button type="submit" class="custom-btn btn-login">Lưu</button>
          </div>
        </Form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import constants from "@/Utils/constants.js"
import {mapActions} from "vuex";
import Payment from "@/components/Payment.vue";

export default {
  name: "ModalRecharge",
  components: {Payment},
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      items: [
        { text: '10.000đ', value: 10000 },
        { text: '20.000đ', value: 20000 },
        { text: '30.000đ', value: 30000 },
        { text: '50.000đ', value: 50000 },
        { text: '100.000đ', value: 100000 },
        { text: '150.000đ', value: 150000 },
        { text: '200.000đ', value: 200000 },
        { text: '300.000đ', value: 300000 },
        { text: '500.000đ', value: 500000 }
      ],
      form: {
        amount: 10000,
        type: constants.PAYMENT_TYPE.RECHARGE
      },
      amountManual: 10000,
      checkoutUrl: null,
      isManual: false
    }
  },
  created() {
    this.showDialog = this.dialog
  },
  watch: {
    dialog(val) {
      this.showDialog = val
    },
    showDialog(val) {
      if (!val) {
        this.resetForm()
        this.$emit('onHidden')
      }
    },
    amountManual(newVal) {
      if (!newVal || Number(newVal) !== newVal || newVal < 10000) {
        this.amountManual = 10000
        this.form.amount = 10000
      } else {
        this.form.amount = newVal
      }
    }
  },
  methods: {
    ...mapActions(['setPaymentUrl', 'removePaymentUrl']),
    async submit() {
      this.showDialog = false
      const res = await this.$axios.post('payment/create-link', this.form)
      this.setPaymentUrl({
        checkout_url: res.data.data.checkout_url || null,
        return_url: res.data.data.return_url || null
      })
      this.resetForm()
    },
    resetForm() {
      this.form = {
        amount: 10000,
        type: constants.PAYMENT_TYPE.RECHARGE
      }
    }
  }
}
</script>

<style scoped>
.recharge-form {
  padding: 1rem 2rem;
}
.btn-login-container {
  display: flex;
  justify-content: end;
  column-gap: 1rem;
}
.btn-cancel {
  border-color: #bebebe;
  color: #000000;
}
.btn-cancel:hover {
  background-color: #bebebe;
  border-color: #bebebe;
  color: #FFFFFF;
}
</style>