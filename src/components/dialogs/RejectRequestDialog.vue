<template>
  <v-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    max-width="600"
  >
    <v-card>
      <v-card-title>Отклонить заявку №{{ request?.id }}</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="comment"
          label="Комментарий"
          auto-grow
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green" @click="confirm">Подтвердить</v-btn>
        <v-btn text @click="$emit('update:visible', false)">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RejectDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    request: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      comment: ''
    };
  },
  methods: {
    confirm() {
      if(!this.comment) return;
      this.$emit('confirm', {
        comment: this.comment
      });
      this.$emit('update:visible', false);
    }
  }
};
</script>
