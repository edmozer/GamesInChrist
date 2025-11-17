import Link from "next/link";

export default function Privacidade() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary-900 font-heading">Sobre o Desenvolvimento do Sistema</h1>
      <p className="mb-4 text-brand-text-medium font-sans">
        Este site foi desenvolvido com <b>Next.js</b> (React), utilizando componentes reutilizáveis, estilização com <b>Tailwind CSS</b> e deploy moderno. O desenvolvimento contou com auxílio da IA <b>Claude Sonnet</b> para código e estrutura.
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        A maioria das imagens foi gerada/editada por IA utilizando o <b>Google Gemini 2.5 Flash Image</b>, conhecido popularmente como <b>Nano Banana</b>.
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        Um dos objetivos do site é mostrar como a inteligência artificial pode ser usada em prol do evangelho de Jesus Cristo.
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        Ideias e feedbacks são muito bem-vindos! Você pode encontrar o criador do projeto <a href="https://www.linkedin.com/in/edmozer-cavalcante/" target="_blank" rel="noopener noreferrer" className="underline text-brand-primary-700 hover:text-brand-primary-900">Edmozer Cavalcante</a> no LinkedIn.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-brand-primary-700 underline hover:text-brand-primary-900">Voltar para a Home</Link>
      </div>
    </div>
  );
}
