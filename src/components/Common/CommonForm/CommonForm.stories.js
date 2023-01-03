import CommonForm from './CommonForm.jsx'

export default {
    title: 'Common/CommonForm',
    component: CommonForm,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonForm {...args} />

export const Default = {
    args: { children: '', title: '標題', message: '文字' },
}
