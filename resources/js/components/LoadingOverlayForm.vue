<template>
    <form>
        <loading :active.sync="isLoading" />
        <div class="mb-3">
            <label for="name">姓名</label>
            <input
                type="text"
                class="form-control"
                id="name"
                v-model="data.name"
                :class="{ 'is-invalid': errors.hasOwnProperty('name') }"
            >
            <span class="invalid-feedback" v-if="errors.hasOwnProperty('name')">
                {{ errors.name[0] }}
            </span>
        </div>
        <div class="mb-3">
            <label for="email">電子郵件地址</label>
            <input
                type="email"
                class="form-control"
                id="email"
                v-model="data.email"
                :class="{ 'is-invalid': errors.hasOwnProperty('email') }"
            >
            <span class="invalid-feedback" v-if="errors.hasOwnProperty('email')">
                {{ errors.email[0] }}
            </span>
        </div>

        <div class="mb-3">
            <label for="question">問題</label>
            <textarea
                class="form-control"
                :class="{ 'is-invalid': errors.hasOwnProperty('question') }"
                id="question"
                v-model="data.question"
            ></textarea>
            <span class="invalid-feedback" v-if="errors.hasOwnProperty('question')">
                {{ errors.question[0] }}
            </span>
        </div>

        <button class="btn btn-primary" @click.prevent="submitForm">提交</button>

        <div class="alert alert-success my-2" v-if="isSuccess">
            電子郵件發送成功
        </div>
    </form>
</template>

<script>
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        Loading,
    },
    data () {
        return {
            isLoading: false,
            isSuccess: false,
            data: {
                name: '',
                email: '',
                question: '',
            },
            errors: {}
        }
    },
    methods: {
        submitForm () {
            this.errors = {};
            this.isLoading = true;
            this.isSuccess = false;
            axios.post('/contact-us', this.data)
                .then(() => this.isSuccess = true)
                .catch(({response}) => {
                    if (response.status === 422) {
                        this.errors = response.data.errors;
                    }
                })
                .finally(() => this.isLoading = false);
        }
    }
}
</script>
