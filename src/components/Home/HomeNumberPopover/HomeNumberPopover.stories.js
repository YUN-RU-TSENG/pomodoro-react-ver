import HomeNumberPopover from './HomeNumberPopover.jsx'

export default {
    title: 'Home/HomeNumberPopover',
    component: HomeNumberPopover,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeNumberPopover {...args} />

export const Default = {
    args: { children: 'button' },
}
