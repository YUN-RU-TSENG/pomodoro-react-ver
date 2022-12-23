import HomeEditForm from './HomeEditForm.jsx'

export default {
    title: 'Home/HomeEditForm',
    component: HomeEditForm,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeEditForm {...args} />

export const Default = {
    args: { children: 'button' },
}
