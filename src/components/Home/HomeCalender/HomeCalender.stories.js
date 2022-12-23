import HomeCalender from './HomeCalender.jsx'

export default {
    title: 'Home/HomeCalender',
    component: HomeCalender,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeCalender {...args} />

export const Default = {
    args: { children: 'button' },
}
