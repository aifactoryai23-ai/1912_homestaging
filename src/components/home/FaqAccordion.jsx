import React from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import "@/styles/faq-accordion.css";

/* fallbackFaqs ВНЕ компонента */
const fallbackFaqs = [
  {
    id: "how-it-works",
    question: "How does HomeDesignPro AI’s interior designer work?",
    answer:
      "HomeDesignPro AI is an online AI interior design tool that turns a single photo into a full room makeover.\n\nUpload a picture of your current room, pick the room type (living room, bedroom, kitchen, etc.) and choose an interior style. Our AI analyzes the space, layout and lighting and then, in about 30 seconds, generates photorealistic images of a redesigned interior based on your preferences.\n\nYou can use the service from any laptop, tablet or phone and get professional-looking design ideas without hiring a traditional interior designer for thousands of dollars. After signing up, you unlock the HomeDesignPro AI Studio with 30+ room types and 50+ interior design styles.",
  },
  {
    id: "design-modes",
    question: "How do the different HomeDesignPro AI design modes work?",
    answer:
      "HomeDesignPro AI offers several design modes, each optimized for a different use case:\n\n- Interior Design with 3D Vision – Keeps the existing structure of your room (walls, windows, main furniture) and mainly changes style, colors and decor. Ideal for realistic \"before and after\" previews.\n- Interior Design (2D Photo) – Similar to the 3D mode, but allows the AI to manipulate the space more freely. It can change furniture placement and some elements of the layout.\n- Virtual Staging AI – Built for filling empty rooms with furniture. Perfect for real-estate listings, Airbnb hosts and property developers who need quick virtual staging.\n- Freestyle – Does not require an input photo. The AI generates interior concepts from scratch using only the room type and style you choose.\n- Sketch2Image – Converts your hand-drawn or digital interior sketches into detailed, photorealistic renderings.\n- SketchUp Mode – Upload a screenshot from your SketchUp model and the AI transforms it into a high-quality, realistic interior render.",
  },
  {
    id: "virtual-staging",
    question: "Can I virtually stage properties with HomeDesignPro AI?",
    answer:
      "Yes. HomeDesignPro AI includes a dedicated Virtual Staging AI mode for real-estate virtual staging and empty room visualization.\n\nUpload a photo of an unfurnished or partially furnished space, select the room type and desired interior style, then choose Virtual Staging AI in the Mode dropdown and click Create. The system will keep the existing architecture (walls, windows, flooring) and automatically add appropriate furniture, decor and lighting.",
  },
  {
    id: "payment-not-accepted",
    question: "Why is my payment method not accepted when I sign up?",
    answer:
      "If your payment is being declined when subscribing to HomeDesignPro AI, it is usually due to security checks. Try the following:\n\n1. Disable any VPN or proxy you’re using and try again.\n2. Make sure the cardholder name, CVC/CVV code and postal/ZIP code exactly match the details registered with your bank.\n3. Your card country must match your billing country.\n4. Ensure that 3D Secure (or a similar authentication method) is enabled with your bank and complete any verification steps that appear.\n\nThese measures help us prevent fraud and keep all users’ payments secure.",
  },
  {
    id: "photo-types",
    question: "What type of photos should I upload of my current interior?",
    answer:
      "For the best AI interior design results, follow these photo guidelines:\n\n- Take photos from a straight-on angle, facing a main wall, window or focal point of the room.\n- Avoid extreme angles or very low/high shots – angled photos can work, but straight photos usually produce much higher-quality designs.\n- Ensure the image is sharp, in focus and well lit (natural daylight works best).\n- Try to capture the whole room or at least a large portion of it, not just close-ups of furniture.\n\nThe better your input photo, the more accurate and realistic the HomeDesignPro AI render will be.",
  },
  {
    id: "photo-formats",
    question: "Which photo file formats does HomeDesignPro AI support?",
    answer:
      "HomeDesignPro AI currently accepts the following image formats:\n\n- JPG / JPEG\n- PNG\n- WebP\n- AVIF\n\nThe HEIC format (common on iPhones) is not supported at the moment. If your images are in HEIC, please convert them to JPG or PNG before uploading. On macOS you can do this by right-clicking the file → Quick Actions → Convert Image → choose JPG.",
  },
  {
    id: "generation-time",
    question: "How long does it take to create an AI interior design?",
    answer:
      "With the current processing speed, HomeDesignPro AI typically generates a new interior design in about 15 seconds from the moment you click Create.",
  },
  {
    id: "photo-usage",
    question: "What will you do with my interior photos?",
    answer:
      "We use your photos only to generate AI interior design images for your account.\n\n- We do not use your images to train our models.\n- Your photos and AI renders are private and visible only to you inside your account.\n- Your data is stored securely and is protected from unauthorized access.\n\nIn short: your images are used purely to create your designs in HomeDesignPro AI and are not shared or reused elsewhere.",
  },
  {
    id: "who-built",
    question: "Who built HomeDesignPro AI and who is behind the project?",
    answer:
      "HomeDesignPro AI was created by Georgiy Avaliani (@geoava), an ML engineer and entrepreneur. The platform is built and maintained independently, without a large corporate team – just Georgiy working from his laptop, supported by a lot of AI automation running behind the scenes.",
  },
  {
    id: "match-current-interior",
    question:
      "How closely will the AI redesign match my real home and construction?",
    answer:
      "How accurately HomeDesignPro AI matches your real interior depends mainly on:\n\n1. Photo quality – Clear, high-resolution photos with good lighting help the AI understand your room’s proportions, materials and layout.\n2. Chosen design mode – Some modes are more experimental, while others are optimized for realism.\n\nFor example:\n- The Creative mode (where available) will give you bolder, more imaginative ideas that may not strictly follow your actual construction.\n- Interior Design with 3D Vision sticks very closely to your existing architectural structure and main elements, updating mostly the style, color scheme and decor.\n\nWe are continuously improving our models so that AI room makeovers become more precise and realistic over time.",
  },
  {
    id: "artifacts",
    question: "Will my AI interior designs contain artefacts or visual glitches?",
    answer:
      "Sometimes, yes. Any app using generative AI image technology can produce visual artefacts. Depending on the input photo and design mode, you might occasionally see:\n\n- Furniture with odd proportions (e.g. chairs with too few legs).\n- Small inconsistencies in shadows or reflections.\n- Minor construction details that don’t fully match reality.\n\nFrom our experience, roughly 90% of renders are good enough for practical use, and about 10% turn out exceptionally well.\n\nHomeDesignPro AI also includes a built-in editor that lets you brush out artefacts and regenerate specific areas of the image. We’re constantly working on reducing artefacts further, for example by automatically detecting them and re-rendering parts of the image. Still, the system isn’t perfect yet, and we don’t claim it is.",
  },
  {
    id: "payment-secure",
    question: "Is your payment processor secure?",
    answer:
      "Yes. HomeDesignPro AI uses BOG and Tochka – both leading regional financial institutions – for all financial transactions.\n\nWe never store your full card details on our own servers.\nThese banks provide bank-level encryption and security standards.\nAll card data is handled and processed directly by the banks in accordance with strict industry regulations (such as PCI DSS).\n\nThis setup helps keep your payments safe and your billing data protected.",
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer:
      "You can pay for HomeDesignPro AI with most major credit and debit cards, including:\n\n- MasterCard\n- VISA\n- MIR\n- American Express\n\nWe do not accept cryptocurrencies and currently have no plans to add them.",
  },
  {
    id: "refund",
    question: "Can I get a refund?",
    answer:
      "Unfortunately, we are not able to offer refunds. Generating AI images requires significant GPU computing power, and those infrastructure costs are paid per use. Our upstream providers do not refund us for processing time, which means issuing refunds would make the service unsustainable.\n\nWhen you sign up and start using HomeDesignPro AI, you agree to waive your standard right to refund in exchange for immediate access to the product and its AI generation features.",
  },
  {
    id: "cancel-subscription",
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your HomeDesignPro AI subscription at any time:\n\n1. If you are logged in:\n- Go to the top navigation bar and click Billing.\n- You’ll be taken to the Bank billing portal, where you can cancel your subscription, switch plans and download invoices.\n\n2. If you are not logged in:\n- On the HomeDesignPro AI homepage, enter your email in the login field and follow the magic-link email you receive.\n- Once inside the app, click Billing in the top right and manage your subscription.\n\n3. If you can’t access your account:\n- Click Billing from the top of the HomeDesignPro AI homepage.\n- Enter the email address you used to sign up. Bank will send you a secure link to the Customer Portal, where you can cancel your subscription, change plans and download invoices.",
  },
  {
    id: "months-free",
    question: "How do I get 2+ months free when signing up?",
    answer:
      "If you choose the yearly plan, HomeDesignPro AI is priced at over 16% less per year compared to paying monthly – effectively giving you 2 or more months free.\n\nJust select the annual subscription during checkout. This discounted long-term pricing is our way of thanking you for your trust and allows us to reinvest more into improving the product.",
  },
  {
    id: "access-after-payment",
    question: "Do I get access to HomeDesignPro AI immediately after payment?",
    answer:
      "Yes. Right after your payment is processed, you’ll receive an automated email with a secure login link to the HomeDesignPro AI app.\n\nFrom there, you can start creating your first AI interior designs and virtual room makeovers straight away.",
  },
  {
    id: "invoice",
    question: "Can I get a receipt or invoice for my payments?",
    answer:
      "Yes, of course. After each successful payment you automatically receive a receipt and invoice from Bank via email. You’ll also get an invoice for every renewal.\n\nIf you need to download a specific invoice again:\n1. Open the HomeDesignPro AI app and click Billing in the top right, or go to the Billing page from the website and log in with your account email.\n2. You’ll be redirected to Bank’s Customer Portal, where you can view and download all past invoices and receipts for your records or accounting.",
  },
  {
    id: "change-plan",
    question: "Can I upgrade or downgrade my subscription?",
    answer:
      "Yes, you can change your subscription plan at any time:\n\n- Log in to HomeDesignPro AI.\n- Click Billing in the top navigation.\n- You’ll be sent to the Bank billing portal or Pricing page, where you can upgrade, downgrade or switch between monthly and annual plans.\n\nAny price adjustments will be handled automatically according to Bank’s proration rules.",
  },
  {
    id: "commercial-use",
    question: "Can I use HomeDesignPro AI designs for commercial projects?",
    answer:
      "In general, HomeDesignPro AI renders can be used for a wide range of professional and commercial purposes such as client presentations, real-estate listings, Airbnb photos, marketing materials and social media, as long as you follow our Terms of Use and local regulations.\n\nYou remain responsible for ensuring the images are suitable for your specific project and for any required disclosures (for example, making it clear that an image is virtually staged). For full details and the latest rules, please review the commercial use section of our Terms of Service. This FAQ is provided for convenience only and does not constitute legal advice.",
  },
];

/* Компонент */
export default function FaqAccordion() {
  const { t } = useTranslation(["home"]);

  const title =
    t("faq.title", {
      ns: "home",
      defaultValue: "Frequently Asked Questions",
    }) || "Frequently Asked Questions";

  const faqsRaw = t("faq.items", {
    ns: "home",
    returnObjects: true,
    defaultValue: fallbackFaqs,
  });

  const faqs =
    Array.isArray(faqsRaw) && faqsRaw.length > 0 ? faqsRaw : fallbackFaqs;

  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Заголовок */}
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          {title}
        </h2>

        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Картинка слева, не обрезаем */}
          <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center md:justify-start">
          <img
            src="/jacques1.webp"
            alt="FAQ decoration"
            width={800}      // подставь реальные размеры файла
            height={600}
            className="max-w-full h-auto rounded-2xl"
          />
          </div>

          {/* Блок с вопросами: фон целиком #DCD8CF */}
          <div
            className="faq-shell w-full md:w-2/3 rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#DCD8CF", border: "none", boxShadow: "none" }}
          >
            <div className="morphing-disclosure">
              {faqs.map((item, index) => {
                const id = item.id || `faq-${index}`;
                const question = item.question;
                const answer = item.answer;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <details key={id} className="group">
                    {/* Вопрос (строка) */}
                    <summary className="flex justify-between items-center gap-3 px-6 py-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-base md:text-lg font-semibold tabular-nums">
                          {number}.
                        </span>
                        <h3 className="text-xl md:text-2xl font-semibold">
                          {question}
                        </h3>
                      </div>
                      <Plus className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    </summary>

                    {/* Ответ — такой же размер текста, как у вопроса */}
                    <div className="px-6 pb-5 pt-2 text-xl md:text-2xl leading-relaxed">
                      <p>{answer}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
