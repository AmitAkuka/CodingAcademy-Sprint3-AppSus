export function LongText({ text, isLongTxtShown }) {
  return <article>{isLongTxtShown ? text : text.substring(0, 99)}</article>
}
