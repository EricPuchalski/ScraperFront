import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {/* Grid para las secciones */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sección Acerca de */}
            <div className="mb-6 lg:mb-0 text-center">
              <h2 className="text-lg font-semibold mb-4">Acerca de</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/informacion" className="hover:text-gray-400">Información</a>
                </li>
                <li>
                  <a href="/preguntas-frecuentes" className="hover:text-gray-400">Preguntas frecuentes</a>
                </li>
                <li>
                  <a href="mailto:contacto@hardgamers.com.ar" className="hover:text-gray-400">ericpuchalski12@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Sección Secciones */}
            <div className="mb-6 lg:mb-0 text-center">
              <h2 className="text-lg font-semibold mb-4">Secciones</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/favoritos" className="hover:text-gray-400">Favoritos</a>
                </li>
                <li>
                  <a href="/ofertas" className="hover:text-gray-400">Ofertas</a>
                </li>
              </ul>
            </div>

            {/* Sección Síguenos */}
            <div className="mb-6 lg:mb-0 text-center">
              <h2 className="text-lg font-semibold mb-4">Síguenos</h2>
              <ul className="flex justify-center space-x-4">
                {/* <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaInstagram size={24} />
                  </a>
                </li> */}
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaTwitter size={24} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/eric-puchalski/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaLinkedin size={24} />
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/3765009935" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaWhatsapp size={24} />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/EricPuchalski" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaGithub size={24} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Puchalski Eric - Todos los derechos reservados</p>
          <div className="mt-2 space-x-4">
            <a href="/terminos-y-condiciones" className="text-gray-400 hover:text-white">Términos y condiciones</a>
            <a href="/politica-de-privacidad" className="text-gray-400 hover:text-white">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
