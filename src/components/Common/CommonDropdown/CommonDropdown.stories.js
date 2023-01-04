import CommonDropdown from './CommonDropdown.jsx'

export default {
    title: 'Common/CommonDropdown',
    component: CommonDropdown,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonDropdown {...args} />

export const Default = {
    args: {},
}
