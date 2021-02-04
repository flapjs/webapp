# UI Deep Dive

### Table of Contents

### User Persona
#### Who

#### What are their constraints?

#### What are their needs?

---

### Iconography
**Initial Note**: *most icons going forward should have a small text description/title to make it more accessible and obvious. It won't detract from the UI but help to clarify features. We need to prepare not for the ideal user but the one that may click the "new" icon and remove all their work by accident.*

| New | Undo | Redo | Save | Upload | Bug Report |
| --- | ---- | ---- | ---- | ------ | ---------- |
| ![new](images/new_icon.png) | ![undo](images/undo_icon.png) | ![redo](images/redo_icon.png) | ![save](images/save_icon.png) | ![upload](images/upload_icon.png) | ![bug](images/bug_icon.png) |

#### New & Remove (new addition)
The purpose of this icon is to create a fresh, new page. It basically clears all work. I think that a clearing option can be useful to completely start over. However, there is no delete option on this website which is the most obvious feature users will use. A new page icon (like the one we're using) usually represents creating a new external doc or a new tab. This is currently our only "delete" method meaning users must start completely from scratch. Once this button has been clicked, it is a blank slate with no undo.

In the webapp, we had a giant trash can at the bottom of the screen. Users could either (a) drag a node towards the trash can, the lines around the screen would go red, and the node would disappear OR (b) they could double-click on the trash can to delete the whole whiteboard. The trash can is an icon everyone is familiar with. In a survey, it was found to be one of the *least ambiguous* icons. However, it was incorrectly labeled 'Delete' when it was actually a 'Remove' because, upon clicking the 'Undo' option, the node(s) reappeared in their previous position. Deletes are final (a destruction of data); removals are temporary (old data still accessible). While deletes are commonly associated with a trash can rather than removals, the visible trash can is so intuitive and obvious that users would be more likely to engage the feature. 

![old_del2](images/old_delete2.png)

I think we can have both a clear and remove option. This can take the form of the following:
- (a) clear and remove are both icons at the top; both are trash cans with one having an 'x' for a more permanent deletion (aka clear)
- (b) users can back/right click on the whiteboard and choose clear
- (c) users can back/right click on a node and choose remove
- NOTE: we may want to have a notification of "Are you sure you want to clear" to confirm they understand that a clear removes ALL work
  - we can also log whether they're a new user or not so we only give them this warning the first time they use the site so it doesn't get annoying

![del/rem](images/delete-remove.png)

- **References**: [Remove vs Delete](https://medium.com/swlh/ui-copy-remove-vs-delete-33c58ce16d9b) and [Trash can unambiguous](https://medium.com/@annakop/lean-ux-icon-testing-7f7fb78412e)

---

#### Undo & Redo
Intuitive and follows the design of Google's undo/redo arrows. Follows a natural mapping of undo as left/the past and redo as right/future. The only change may be to make the undo arrow slightly darker than the redo to make it a bit more distinct and match the Google style.

- **References**: [Legacy of Undo/Redo](https://ux.stackexchange.com/questions/83723/why-are-the-undo-and-redo-arrow-icons-commonly-round)


#### Save & Upload
These are a little tricky. 'Save' is actually a **download** because it's moving from the remote server to a local drive. However, once the user clicks the upper tool bar 'Save' icon, the side bar pulls out and is labelled as 'Export'. Now, export is actually when we move from a local application to a remote drive. This is an issue because traditional download and export icons are VERY different: a download has a flat bar with an arrow pointing down; an export is when we have an arrow pointing out of a box. The directions of the arrows follow our learned mapping of downloading locally or exporting externally. Our 'save' icon has a box with an arrow pointing down. This is the icon for 'Import'. We need to be using a bar and arrow icon.

The 'Upload' is correct in that it's moving from a local drive to a remote server. The icon is correctly used (bar with arrow pointint up).

- **Suggestion**: Change sidebar wording to be 'Download' not 'Export' for 'save' and use the correct Download icon (bar with arrow). <br/>
- **References**: [Download, Upload, Export, Import](https://graphicdesign.stackexchange.com/questions/119273/import-export-vs-upload-download-icons-arrow-direction)


#### Bug Report
The bug logo is explicit and does fit its name. It may be fine to keep it, however, users may also assume it is for "debugging" rather than filing a bug report/feedback. Sometimes feedback icons consist of a thumbs up and thumbs down together as that indicates an approval or disapproval. Many websites also use a circle with a question mark inside to indicate a section where more information/feedback can be given externally. We could also use a circle with an exclamation point as they usually have a negative connotation of "something is wrong" that would align more with the purpose of a bug report.

- **Notes**: after doing a bit more research, I [found our icon](https://material.io/resources/icons/?style=baseline) and it is in fact labeled a 'bug report' so we may not change it.

---

| Expand | Format | Test | Transform | Export |
| ------ | ------ | ---- | --------- | ------ | 
| ![expand](images/expand_icon.png) | ![format](images/format_icon.png) | ![test](images/test_icon.png) | ![transform](images/transform_icon.png) | ![export](images/save_icon.png) |

#### Expand
The expand icon lets the user pull out the sidebar. This is actually a version of the disclosure triangle which is popular for expanding sections. These sections tend to be vertically displayed: the triangle tip points right when condensed and down when the section below is expanded. It isn't used for side bars as much (horizontal display). For side bars, the current winner, and favorite among 20-somethings is the hamburger side bar icon (3 lines). However, there has been much criticism over the hamburger side bar as there is less discoverability because the user has no idea what the menu features. UI experts are pushing for more explicit side bar features like our side bar icons for 'Format'/'Test'/etc. Since we already have those icons for the sub-sections of the sidebar, the disclosure triangle is redundant and not necessary. 

- **Suggestion**: remove this icon
- **References**: [Hamburger menu icon](https://smallbiztrends.com/2015/01/3-line-menu-icon-hamburger-menu.html) and [Explicit sidebar features](https://lmjabreu.com/post/why-and-how-to-avoid-hamburger-menus/)

#### Format
This icon pulls out the side bar for both "Format" and "Definition". Format consists of "Layout" and "Alphabet Label Editor". Currently, the user can only apply the 'Circle' layout and not 'Grid' not the alphabet/renaming features. I think this icon is truly a 'Format' icon as the majority of the ones on the web are a page (usually with a corner folded). It also has horizontal lines in the middle which can relate to text which is what we associate formatting with: justifying text, modifying number of columns, changing margins, etc. Overall, this icon is perfectly usable and intuitive. However, it is weird that the 'Format' feature brings out both the 'Definition' and 'Format' rather than just the 'Format' section. We may also want to include other types of text/stylistic formatting here since that would make the section more obvious. As mentioned in a later section, we may want to have the option to reduce/increase the text size of the node or edge labels. We could easy have those modifications also live in the formatting section.

- **Suggestion**: change the sidebar section for 'Format' to be *just* formatting features.

#### Test
This running man icon is supposed to indicate testing. However, it's not intuitive other than the fact that we have to *"run"* a test. It makes it very hard for users to discover the testing section which is, arguably, the most important section. This is not a good signifier and, likely, users wouldn't even click on it until they had given up other options and would be surprised that this was, in fact, testing.

#### Transform
The purpose of this option is to convert DFA :left_right_arrow: NFA, flip accept :left_right_arrow: nonaccept states, or delete unreachable states. All of these are more 'conversions' or 'swaps' than transformations. I think we should use 2 circular arrows to indicate we are alternating between states to be more indicative. A pencil icon usually means modify/edit/create on the user's behalf. However, the program is doing all the transforming so another icon is better suited.

![new_transform](images/new_transform.png)

- **References**: [Pencil Icon](https://ux.stackexchange.com/questions/117143/pencil-icon-for-create-vs-edit-is-there-a-correct-answer)


#### Export
This has the same icon as the 'Save' in the top/app bar. Both of these options pull out the sidebar and give options on how to download the work as different file types. This is NOT an export as we are not sharing but downloading the file locally. It is redundant to have 2 icons doing the same thing but labelled differently. This icon obviously goes against the traditional 'Export' icon (arrow pointing up, outside of box) as our arrow points inward. We need to remove one of these icons and make it represent the download one.

- **Suggestion**: Choose whether icon should live in top bar or side bar and use the correct Download icon (bar with arrow). <br/>
- **References**: [Download, Upload, Export, Import](https://graphicdesign.stackexchange.com/questions/119273/import-export-vs-upload-download-icons-arrow-direction)

---

### Feedback


---

### Whiteboard
1. When right-clicking on the object, it should pull up the options to: 
- (a) make it an accept state (if not)
- (b) make it a non-accept state (if not)
- (c) delete that node
- (d) make it the initial state.
2. When clicking/hovering or doing any engagement with a node, it should change color slightly (lighter/darker) to indicate which node the user is interacting with and help them confirm their behavior
3. Arrows auto-conform to fit the distance/angle which is great
4. Nodes and arrows could be more distinct
5. For a large alphabet, the arrow gets filled with a lot of text that can fill up the space
  - text resizing should be an option (like a bar with +/- to change arrow text)
  - node text isn't a problem because it's typically only 2 characters (e.g. q2)
