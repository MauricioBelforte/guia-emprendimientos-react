function FondoChat() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        backgroundImage: 'url("/bg6.png")', // Ruta corregida para archivos en /public
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
}

export default FondoChat;