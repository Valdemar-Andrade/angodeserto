"use client";

import { useRef, useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { navigation, reservationLink } from "../../content/site";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="mobile-navigation"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <button
        className="menu-toggle"
        type="button"
        ref={menuButton}
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((previous) => !previous)}
      >
        {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <nav id="mobile-navigation" className="mobile-panel" aria-label="Menu móvel" hidden={!open}>
        {navigation.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>Contactos</a>
        <a className="button button--sand" href={reservationLink} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
          Pedir reserva <FiArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
}
