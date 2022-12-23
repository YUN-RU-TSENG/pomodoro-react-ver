import CommonAlert from './CommonAlert.jsx'

export default {
    title: 'Common/CommonAlert',
    component: CommonAlert,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonAlert {...args} />

export const Default = {
    args: { children: 'button' },
}
