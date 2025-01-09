import { RiCloseLine, RiMenu3Line } from "@remixicon/react";
import React, { useState } from "react";

const Navbar = () => {
  const NAVIGATION_LINKS = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e, href) => {
    const offset = -85;
    const elementPosition = targetElement.getBoundingClienRect().top;
    const offsetPosition = elementPosition + window.scrollY + offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  };
  return (
    <>
      <div>
        <nav className="mt-2 h-16 left-0 right-0 z-50 lg:top-4">
          {/* dekstop menu */}
          <div
            className="mx-auto hidden max-w-xl items-center
   justify-center rounded-full border border-white/30 py-2
   backdrop-blur-lg lg:flex"
          >
            <div className="flex items-center justify-between gap-8">
              <div>
                <a href="/">
                  <span className="uppercase hover:text-stone-300 transition-all duration-300">
                    Abrar Faisal
                  </span>
                </a>
              </div>
              <div>
                <ul className="flex items-center gap-4">
                  {NAVIGATION_LINKS.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-sm hover:text-stone-300 transition-all duration-300"
                        onClick={(e) => handleLinkClick(e, item.href)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* mobile menu */}
          <div className="lg:hidden py-2 ">
            <div className="flex items-center justify-between">
              <div>
                <a href="#">
                  <span className="pl-4 uppercase ">Abrar Faisal</span>
                </a>
              </div>
              <div className="flex items-center">
                <button
                  className="focus:outline-none lg:hidden"
                  onClick={toggleMobileMenu}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? (
                    <RiCloseLine className="m-2 h-6 w-5" />
                  ) : (
                    <RiMenu3Line className="m-2 h-6 w-5" />
                  )}
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <ul className="my-4  mr-4 left-0 backdrop-blur-lg flex flex-col items-end gap-6 ">
                {NAVIGATION_LINKS.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="block w-full text-lg"
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
