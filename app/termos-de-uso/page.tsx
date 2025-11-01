import Link from "next/link";

export default function TermosDeUso() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary-900 font-heading">Termos de Uso</h1>
      <p className="mb-4 text-brand-text-medium font-sans">
        Este site foi criado com o objetivo exclusivo de propagar o evangelho de Jesus Cristo e oferecer recursos educativos e de entretenimento cristão para famílias, jovens e crianças. O uso é totalmente gratuito e sem fins lucrativos.
      </p>
      <ul className="list-disc list-inside mb-4 text-brand-text-medium font-sans">
        <li>Todo o conteúdo pode ser utilizado livremente para fins pessoais, familiares e educacionais, desde que não haja finalidade comercial.</li>
        <li>Não garantimos a disponibilidade contínua do site, nem a exatidão ou atualização constante das informações.</li>
        <li>Não coletamos dados pessoais dos usuários, exceto o mínimo necessário para o funcionamento do site.</li>
        <li>Ao utilizar este site, você concorda em respeitar os princípios cristãos de respeito, amor ao próximo e honestidade.</li>
        <li>Caso tenha dúvidas, sugestões ou queira solicitar a remoção de algum conteúdo, entre em contato pelo <Link href="https://www.linkedin.com/in/edmozer-cavalcante/" target="_blank" className="text-brand-primary-700 underline">LinkedIn do desenvolvedor</Link>.</li>
      </ul>
      <p className="mb-4 text-brand-text-medium font-sans">
        Estes termos podem ser atualizados a qualquer momento, sem aviso prévio.
      </p>
    </div>
  );
}
