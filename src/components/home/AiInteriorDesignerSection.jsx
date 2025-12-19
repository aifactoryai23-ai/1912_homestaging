import React from "react";
import { useTranslation } from "react-i18next";

const AiInteriorDesignerSection = () => {
  const { t } = useTranslation(["home"]);

  const handleScrollToTopAndFocusEmail = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const emailInput = document.querySelector(".input_confirm_email");
      if (emailInput && typeof emailInput.focus === "function") {
        emailInput.focus();
      }
    }
  };

  const cards = [
    {
      id: "sketch1",
      image: "/sketch1.png",
      title: t("aiInteriorDesignerSection.cards.sketch1"),
    },
    {
      id: "sketch2",
      image: "/sketch2.png",
      title: t("aiInteriorDesignerSection.cards.sketch2"),
    },
    {
      id: "sketch3",
      image: "/sketch3.png",
      title: t("aiInteriorDesignerSection.cards.sketch3"),
    },
    {
      id: "sketch4",
      image: "/sketch4.png",
      title: t("aiInteriorDesignerSection.cards.sketch4"),
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {t("aiInteriorDesignerSection.title")}
          </h2>

          <p className="text-xl text-gray-600">
            {t("aiInteriorDesignerSection.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              aria-label={`Open example: ${card.title}`}
              onClick={handleScrollToTopAndFocusEmail}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                width={480}
                height={640}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">{card.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiInteriorDesignerSection;
