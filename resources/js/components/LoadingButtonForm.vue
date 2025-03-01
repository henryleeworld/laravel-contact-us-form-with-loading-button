<template>
    <form>
        <div class="mb-3">
            <label for="name">{{ $t('Name') }}</label>
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
            <label for="email">{{ $t('Email Address') }}</label>
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
            <label for="question">{{ $t('Question') }}</label>
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

        <VueLoadingButton
            :styled="false"
            :loading="isLoading"
            @click.native="submitForm"
            class="h6 btn btn-sm btn-primary"
        >{{ $t('Submit') }}</VueLoadingButton>

        <div class="alert alert-success my-2" v-if="isSuccess">
            {{ $t('Email sent successfully') }}
        </div>
    </form>
</template>

<script>
import VueLoadingButton from 'vue-loading-button'

export default {
    components: {
        VueLoadingButton,
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
