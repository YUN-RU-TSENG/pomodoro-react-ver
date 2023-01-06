import HomeList from './HomeList.jsx'

export default {
    title: 'Home/HomeList',
    component: HomeList,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeList {...args} />

export const Default = {
    args: {},
}
