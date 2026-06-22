"use client";

import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const RESPUESTAS_PARAMETRADAS: Record<string, string> = {
  horario: "Nuestro horario de atención es de lunes a viernes de 8:00 a 18:00.",
  carrera: "Ofrecemos la carrera de Ingeniería en Sistemas Informáticos con una duración de 3 años.",
  inscripcion: "Las inscripciones están abiertas. Puedes inscribirte en secretaría o en nuestra plataforma.",
  costo: "El costo mensual es accesible. Contáctanos para más información sobre aranceles.",
  requisitos: "Para inscribirte necesitas: carnet de identidad, certificado de bachiller y fotografías.",
  plan: "Nuestro plan de estudios incluye programación, redes, bases de datos, diseño web y más.",
  docentes: "Contamos con docentes titulados y con amplia experiencia en el sector tecnológico.",
  certificacion: "Al finalizar recibes un título técnico superior avalado por el Estado y convenios con IBNORCA.",
  contacto: "Puedes contactarnos al correo: info@institutoinfomatica.edu.bo o al teléfono: +591 2 1234567.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(RESPUESTAS_PARAMETRADAS)) {
    if (lower.includes(key)) return value;
  }
  return "No tengo información sobre eso aún. Puedes contactarnos directamente para más detalles. 😊";
}

export default function ChatBot() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "¡Hola! 👋 Soy el asistente virtual. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (): void => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: getBotResponse(trimmed),
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      
      <div className={`chatbot-fab ${open ? "chatbot-fab--hidden" : ""}`} onClick={() => setOpen(true)}>
        <span className="chatbot-fab__icon">?</span>
        <span className="chatbot-fab__label">Consulta</span>
      </div>

      
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__info">
              <div className="chatbot-header__avatar">?</div>
              <div>
                <p className="chatbot-header__name">Asistente Virtual</p>
                <p className="chatbot-header__status">En línea</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              ✕
            </button>
          </div>

         
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg ${msg.role === "user" ? "chatbot-msg--user" : "chatbot-msg--bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--bot chatbot-msg--typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

        
          <div className="chatbot-suggestions">
            {["Horario", "Inscripción", "Requisitos", "Costo"].map((s) => (
              <button
                key={s}
                className="chatbot-suggestion"
                onClick={() => {
                  setInput(s);
                  setTimeout(handleSend, 50);
                }}
              >
                {s}
              </button>
            ))}
          </div>

          
          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              type="text"
              placeholder="Escribe tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chatbot-send" onClick={handleSend} aria-label="Enviar">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
