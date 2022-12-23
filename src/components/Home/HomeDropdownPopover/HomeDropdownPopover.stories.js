import HomeDropdownPopover from './HomeDropdownPopover.jsx'

export default {
    title: 'Home/HomeDropdownPopover',
    component: HomeDropdownPopover,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeDropdownPopover {...args} />

export const Default = {
    args: { children: '' },
}
