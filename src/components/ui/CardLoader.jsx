const Loader = ({ count = 2 }) => {
  const arr = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <>
      {arr.map((el) => (
        <div
          key={el}
          className="animate-pulse flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-slate-200 dark:border-gray-700 rounded-lg w-full h-80"
        >
          {/* Imagen del loader */}
          <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full rounded-t-lg"></div>

          {/* Contenido del loader */}
          <div className="flex flex-col gap-3 p-4">
            {/* Línea para el título */}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Línea para la categoría */}
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

            {/* Línea para el precio */}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

            {/* Botón de carga */}
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Loader;
