import CommonNavbar from './CommonNavbar.jsx'

export default {
    title: 'Common/CommonNavbar',
    component: CommonNavbar,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonNavbar {...args} />

export const Default = {
    args: { children: 'button' },
}
