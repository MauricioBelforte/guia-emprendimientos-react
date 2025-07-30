function BurbujaMensaje({ texto, esUsuario = true }) {
  return (
    <div
      className={`
        px-3 py-2 rounded-lg text-sm max-w-[80%]
        ${esUsuario ? 'bg-[#DCF8C6] self-end' : 'bg-white self-start'}
        shadow-md
      `}
    >
      {texto}
    </div>
  );
}

export default BurbujaMensaje;
