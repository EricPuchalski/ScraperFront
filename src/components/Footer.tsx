
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Sección Acerca de */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Acerca de</h2>
            <ul>
              <li className="mb-2">
                <a href="/informacion" className="hover:text-gray-400">Información</a>
              </li>
              <li className="mb-2">
                <a href="/preguntas-frecuentes" className="hover:text-gray-400">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="mailto:contacto@hardgamers.com.ar" className="hover:text-gray-400">contacto@hardgamers.com.ar</a>
              </li>
            </ul>
          </div>

          {/* Sección Secciones */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Secciones</h2>
            <ul>
              <li className="mb-2">
                <a href="/favoritos" className="hover:text-gray-400">Favoritos</a>
              </li>
              <li>
                <a href="/ofertas" className="hover:text-gray-400">Ofertas</a>
              </li>
            </ul>
          </div>

          {/* Sección Síguenos */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Síguenos</h2>
            <ul className="flex space-x-4">
              {/* <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaFacebook size={24} />
                </a>
              </li> */}
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaInstagram size={24} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaTwitter size={24} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaLinkedin size={24} />
                </a>
              </li>
              <li>
                <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaWhatsapp size={24} />
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <FaGithub size={24} />
                </a>
              </li>
            </ul>
          </div>

          {/* Sección Colaboran */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Colaboran</h2>
            <ul>
              <li className="mb-2">
                <a href="https://tecnovortex.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Tecnovortex</a>
              </li>
              <li>
                <a href="https://mepes.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Mepes</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} HardGamers - Todos los derechos reservados</p>
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
