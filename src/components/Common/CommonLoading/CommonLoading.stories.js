import CommonLoading from './CommonLoading.jsx'

export default {
    title: 'Common/CommonLoading',
    component: CommonLoading,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonLoading {...args} />

export const Default = {
    args: { children: '' },
}
