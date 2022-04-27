export function ColorPicker({ onChangeNoteColor }) {
  return (
    <div className="color-picker fade-in">
      <div
        onClick={() => onChangeNoteColor('tomato')}
        className="color red"
      ></div>
      <div
        onClick={() => onChangeNoteColor('rgb(98, 167, 98)')}
        className="color green"
      ></div>
      <div
        onClick={() => onChangeNoteColor('dodgerblue')}
        className="color blue"
      ></div>
      <div
        onClick={() => onChangeNoteColor('yellow')}
        className="color yellow"
      ></div>
      <div
        onClick={() => onChangeNoteColor('rgb(197, 79, 197)')}
        className="color purple"
      ></div>
      <div
        onClick={() => onChangeNoteColor('brown')}
        className="color brown"
      ></div>
    </div>
  )
}
