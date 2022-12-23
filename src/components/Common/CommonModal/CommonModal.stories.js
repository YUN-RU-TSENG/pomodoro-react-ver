import CommonModal from './CommonModal.jsx'

export default {
    title: 'Common/CommonModal',
    component: CommonModal,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <CommonModal {...args} />

export const Default = {
    args: { children: '' },
}
