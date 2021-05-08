<template>
    <label :class="classObject">
		<slot name="label"></slot>

        <input type="checkbox" :disabled="disabled" @change="trigger" :checked="modelValue">

        <div></div>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Switch',
    props: {
        typeBold: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
                type: String,
        default: ''
        },
        color: {
            type: String,
            default: 'default'
        },
        theme: {
            type: String,
            default: 'default'
        },
        emitOnMount: {
            type: Boolean,
            default: true
        }
    },
	computed: {
        classObject(): any {
            const { modelValue, typeBold, disabled } = this.$props;
            return {
                'vue-switcher' : true,
                'vue-switcher-theme': true,
                'vue-switcher-color': true,
                ['vue-switcher--unchecked'] : !modelValue,
                ['vue-switcher--disabled'] : disabled,
                ['vue-switcher--bold']: typeBold,
                ['vue-switcher--bold--unchecked']: typeBold && !modelValue
            };
        }
	},
	methods: {
        trigger (e: { target: { checked: any } }) {
            this.$emit('update:modelValue', e.target.checked)
        }
	},
	mounted () {
        if(this.emitOnMount) {
            this.$emit('update:modelValue', this.modelValue)
        }
	}
})
</script>

<style scope>
    .vue-switcher {
        position: relative;
        display: inline-block;
    }

    .vue-switcher input {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        cursor: pointer;
    }

    .vue-switcher div {
        height: 15px;
        width: 36px;
        position: relative;
        border-radius: 30px;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        transition: linear .2s, background-color linear .2s;
    }

    .vue-switcher div:after {
        content: '';
        height: 20px;
        width: 20px;
        border-radius: 100px;
        display: block;
        transition: linear .15s, background-color linear .15s;
        position: absolute;
        left: 100%;
        margin-left: -18px;
        cursor: pointer;
        top: -3px;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    }

    .vue-switcher--unchecked div {
        justify-content: flex-end;
    }

    .vue-switcher--unchecked div:after {
        left: 15px;
    }

    .vue-switcher--disabled div {
        opacity: .3;
    }

    .vue-switcher--disabled input {
        cursor: not-allowed;
    }

    .vue-switcher--bold div {
        top: -8px;
        height: 26px;
        width: 51px;
    }

    .vue-switcher--bold div:after {
        margin-left: -24px;
        top: 3px;
    }

    .vue-switcher--bold--unchecked div:after {
        left: 28px;
    }

    .vue-switcher-theme.vue-switcher-color div {
        background-color: #7cb305;
        background-color: var(--primary);
    }

    .vue-switcher-theme.vue-switcher-color div:after {
        background-color: #aee43a;
        background-color: var(--switchCheck);
    }

    .vue-switcher-theme.vue-switcher-color.vue-switcher--unchecked div {
        background-color: rgb(183 183 183 / 24%);
        background-color: var(--switchUncheckBg);
    }

    .vue-switcher-theme.vue-switcher-color.vue-switcher--unchecked div:after {
        background-color: rgb(157 157 157 / 41%);
        background-color: var(--switchUncheck);
    }
</style>
