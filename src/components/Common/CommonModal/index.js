import * as ReactDOM from 'react-dom'
import CommonModal from './CommonModal'

const modals = []
let index = 0

export default function showCommonModal(props) {
    const container = document.createElement('div')
    container.id = `base-modal-${index++}-container`
    document.body.appendChild(container)

    const root = ReactDOM.createRoot(container)
    const component = root.render(
        <CommonModal {...props} onClick={destroyModal} />
    )

    modals.push({ component, index })

    function destroyModal() {
        modals.splice(index, 1)
        container.remove()
        root.unmount()
    }

    return {
        destroyModal,
    }
}
