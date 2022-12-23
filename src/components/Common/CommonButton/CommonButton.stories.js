import CommonButton from './CommonButton.jsx'

export default {
    title: 'Common/CommonButton',
    component: CommonButton,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonButton {...args} />

export const Default = {
    args: { children: 'button' },
}