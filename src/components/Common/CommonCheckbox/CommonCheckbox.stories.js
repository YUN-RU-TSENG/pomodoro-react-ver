import CommonCheckbox from './CommonCheckbox.jsx'

export default {
    title: 'Common/CommonCheckbox',
    component: CommonCheckbox,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonCheckbox {...args} />

export const Default = {
    args: { children: 'button' },
}
