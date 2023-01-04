import styled from 'styled-components'

import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react'
import { createPortal } from 'react-dom'

const Wrapper = styled.div`
    position: relative;
`

const Button = styled.button`
    padding: 4px 12px;
    font-size: 14px;
    line-weight: 21px;
    font-weight: 400;
    border-radius: 4px;
    background: #fff;
`

const PopoverWrapper = styled.div`
    position: absolute;
    top: 24px;
    right: 0px;
    padding: 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 4px #ededed;
    margin-top: 12px;
    width: 240px;
    font-size: 14px;
    line-weight: 21px;

    > *:not(:last-child) {
        margin-bottom: 12px;
    }

    &::before {
        display: block;
        content: '';
        position: absolute;
        top: -12px;
        left: 114px;
        border: 6px solid;
        border-color: transparent transparent #fff transparent;
    }
`

function CommonPopover({ text, children, isOpen, onClick }) {
    const { x, y, reference, floating, strategy } = useFloating({
        placement: 'bottom',
        middleware: [offset(18), flip(), shift()],
        whileElementsMounted: autoUpdate,
    })

    return (
        <Wrapper>
            <Button onClick={onClick} type="button" ref={reference}>
                {text}
            </Button>
            {createPortal(
                isOpen && (
                    <PopoverWrapper
                        ref={floating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                        }}
                    >
                        {children}
                    </PopoverWrapper>
                ),
                document.body
            )}
        </Wrapper>
    )
}

export default CommonPopover
