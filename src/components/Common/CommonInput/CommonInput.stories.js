import CommonInput from './CommonInput.jsx'

export default {
    title: 'Common/CommonInput',
    component: CommonInput,
}

export const Default = {
    args: {
        title: '',
        errorMessage: '',
        attributes: {},
        label: 'label',
        register: () => {},
        required: {},
    },
}

export const Title = {
    args: {
        title: '標題',
        errorMessage: '',
        attributes: {},
        label: 'label',
        register: () => {},
        required: {},
    },
}

export const ErrorMessage = {
    args: {
        title: '',
        errorMessage: '錯誤訊息',
        attributes: {},
        label: 'label',
        register: () => {},
        required: {},
    },
}
