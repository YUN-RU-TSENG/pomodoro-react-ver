import HomeFolderModal from './HomeFolderModal.jsx'

export default {
    title: 'Home/HomeFolderModal',
    component: HomeFolderModal,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeFolderModal {...args} />

export const Default = {
    args: { children: 'button' },
}
