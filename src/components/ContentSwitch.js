// switches to content that has a true "visible" prop
export default function ContentSwitch({ children }) {
    return children.find((child) => {
        if (!child.props.visible) {
            return false;
        }
        return true;
    });
}
