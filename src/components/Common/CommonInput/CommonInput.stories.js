import CommonInput from './CommonInput.jsx'

export default {
    title: 'Common/CommonInput',
    component: CommonInput,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonInput {...args} />

export const Default = {
    args: { children: '' },
}
