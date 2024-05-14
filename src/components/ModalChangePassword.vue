<template>
  <div class="pa-4 text-center change-password-dialog">
    <v-dialog v-model="showDialog" max-width="600">
      <v-card title="Đổi mật khẩu">
        <Form class="change-password-form" as="v-form" :validation-schema="schema" @submit="submit">
          <InputValidation
              class="mb-2"
              name="password"
              label="Mật khẩu hiện tại"
              :is-password="true"
              variant="underlined"
              color="red"
              v-model="form.password"
              :updater="form.password"
          />
          <InputValidation
              class="mb-2"
              name="new_password"
              label="Mật khẩu mới"
              :is-password="true"
              variant="underlined"
              color="red"
              v-model="form.new_password"
              :updater="form.new_password"
          />
          <InputValidation
              class="mb-4"
              name="new_password_confirmation"
              label="Xác nhận mật khẩu mới"
              :is-password="true"
              variant="underlined"
              color="red"
              v-model="form.new_password_confirmation"
              :updater="form.new_password_confirmation"
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
import * as Yup from "yup";

export default {
  name: "ModalChangePassword",
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      form: {
        password: null,
        new_password: null,
        new_password_confirmation: null
      }
    }
  },
  created() {
    this.showDialog = this.dialog
  },
  setup() {
    const schema = Yup.object().shape({
      password: Yup.string().required().min(6).label('mật khẩu hiện tại'),
      new_password: Yup.string().required().min(6).label('mật khẩu mới'),
      new_password_confirmation: Yup.string()
          .required().min(6)
          .oneOf([Yup.ref('new_password')], 'Mật khẩu xác nhận không trùng khớp.')
          .label('xác nhận mật khẩu mới')
    });

    return { schema }
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
    }
  },
  methods: {
    async submit() {
      this.showDialog = false
      const res = await this.$axios.post('change-password', this.form)
      this.resetForm()
    },
    resetForm() {
      this.form = {
        password: null,
        new_password: null,
        new_password_confirmation: null
      }
    }
  }
}
</script>

<style scoped>
.change-password-form {
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