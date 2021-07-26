import { Descendant } from 'slate';

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'This is editable ' }, { text: 'rich', bold: true }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
];
