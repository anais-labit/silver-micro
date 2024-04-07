export default function ValidateButton(props) {
  return (
    <button className='bg-black px-3 pb-1 text-white rounded-xl text-xl w-full'>
      {props.label}
      </button>
  )
}