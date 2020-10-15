import React from "react"
import Menu from "../widgets/menu"
import MenuWrapper from "../widgets/menuWrapper"
import mutator from "../mutator"
import Button from "./button"

type Props = {
    children: React.ReactNode
    toolsMenu: React.ReactNode
	onClose: () => void
}

export default class Dialog extends React.Component<Props> {
    keydownHandler = (e: KeyboardEvent) => {
        if (e.target !== document.body) { return }

        if (e.keyCode === 27) {
            this.close()
            e.stopPropagation()
        }
    }

	componentDidMount() {
		document.addEventListener("keydown", this.keydownHandler)
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keydownHandler)
	}

	render() {
        const {toolsMenu} = this.props

		return (
			<div
				className="dialog-back"
                onMouseDown={(e) => { if (e.target === e.currentTarget) { this.close() } }}
            >
				<div className="dialog" >
                    {toolsMenu &&
                        <div className="toolbar">
                            <div className="octo-spacer"></div>
                            <MenuWrapper>
                                <Button text="..."></Button>
                                {toolsMenu}
                            </MenuWrapper>
                        </div>}
                    {this.props.children}
				</div >
			</div >
        )
	}

	close() {
		this.props.onClose()
	}
}
