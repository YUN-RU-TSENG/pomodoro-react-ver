import HomeSidebar from './HomeSidebar.jsx'

export default {
    title: 'Home/HomeSidebar',
    component: HomeSidebar,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeSidebar {...args} />

export const Default = {
    args: { children: 'button' },
}
