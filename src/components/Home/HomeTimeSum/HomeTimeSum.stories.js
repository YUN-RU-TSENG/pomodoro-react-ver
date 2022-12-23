import HomeTimeSum from './HomeTimeSum.jsx'

export default {
    title: 'Home/HomeTimeSum',
    component: HomeTimeSum,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeTimeSum {...args} />

export const Default = {
    args: { children: 'button' },
}
