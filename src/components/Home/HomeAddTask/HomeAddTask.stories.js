import HomeAddTask from './HomeAddTask.jsx'

export default {
    title: 'Home/HomeAddTask',
    component: HomeAddTask,
}

//👇 We create a “template” of how args map to rendering
const Template = (args) => <HomeAddTask {...args} />

export const Default = {
    args: { children: 'button' },
}
