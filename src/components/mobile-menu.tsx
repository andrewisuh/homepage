import { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import NavMenu from './nav-menu';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const allowScroll = () => {
    document.body.style.overflow = '';
    document.body.style.height = 'unset';
  };
  const lockSroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  };

  function openMenu() {
    setIsMenuOpen(true);
    lockSroll();
  }

  function closeMenu() {
    setIsMenuOpen(false);
    allowScroll();
  }

  useEffect(() => {
    return allowScroll;
  }, []);

  return (
    <>
      <button className="h-10" type="button" onClick={openMenu}>
        <MdMenu size={30} />
      </button>
      {isMenuOpen && (
        <div className="absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-[var(--background)]">
          <button
            className="absolute top-0 right-0 z-50 m-4 h-10"
            type="button"
            onClick={closeMenu}
          >
            <MdClose size={30} />
          </button>
          <NavMenu />
        </div>
      )}
    </>
  );
}
