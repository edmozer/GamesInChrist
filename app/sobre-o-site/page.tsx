import Link from "next/link";

export default function SobreSite() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary-900 font-heading">Sobre o Site</h1>
      <p className="mb-4 text-brand-text-medium font-sans">
        O <span className="font-semibold">Jogos em Cristo</span> é um projeto sem fins lucrativos criado para propagar o evangelho de Jesus Cristo por meio de jogos educativos e de entretenimento cristão. Nosso objetivo é proporcionar momentos de aprendizado, diversão e fortalecimento da fé para famílias, jovens e crianças.
      </p>
      <p className="mb-4 text-brand-text-medium font-sans">
        Todo o conteúdo é gratuito e pode ser utilizado para fins pessoais, familiares e educacionais, desde que não haja finalidade comercial.
      </p>
      <h2 className="text-xl font-bold mt-8 mb-2 text-brand-primary-900 font-heading">Contato</h2>
      <p className="mb-4 text-brand-text-medium font-sans">
        Para dúvidas, sugestões ou solicitações, entre em contato pelo LinkedIn do desenvolvedor:
      </p>
      <a
        href="https://www.linkedin.com/in/edmozer-cavalcante/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2 rounded-full bg-brand-primary-700 text-white font-semibold shadow hover:bg-brand-primary-800 transition-all mb-8"
      >
        Fale com Edmozer Cavalcante
      </a>
    </div>
  );
}
