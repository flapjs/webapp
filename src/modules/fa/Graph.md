Graphs
- SVG Renders
- User Interactions
- Drawer Buttons
- Machine Changes

GraphState : render() ==> SVG
SVG : interact() ==> GraphState

GraphState : content() ==> Drawer
Drawer : button() ==> GraphState

GraphState : transform() ==> Machine
Machine : update() ==> GraphState
