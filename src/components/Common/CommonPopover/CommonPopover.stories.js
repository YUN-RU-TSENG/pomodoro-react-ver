import CommonPopover from './CommonPopover.jsx'

export default {
    title: 'Common/CommonPopover',
    component: CommonPopover,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonPopover {...args} />

export const Default = {
    args: { children: '' },
}
