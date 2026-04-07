import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const RESUME_CONTEXT = `# Currículo - Ivan Cavalcante

**Título:** LARAVEL | PHP | WORDPRESS | IA | DOCKER | NODE | JAVA SCRIPT
**Localização:** Belém e Região

## Contato
- **Localização:** Belém do Pará - Brasil
- **Celular:** 91980802607
- **E-mail:** [ivanolivendev@protonmail.com](mailto:ivanolivendev@protonmail.com)
- **LinkedIn:** [linkedin.com/in/ivanolivendev](https://www.linkedin.com/in/ivanolivendev)
- **GitHub:** [github.com/ivanolivendev](https://github.com/ivanolivendev)

## Resumo
Desenvolvedor orientado à construção de soluções que conectam tecnologia de ponta à resolução de problemas complexos, com domínio em PHP (Laravel e WordPress), Python e Node.js. Trajetória marcada por um perfil multidisciplinar que integra Ciência, Tecnologia e Educação. Atualmente, lidera iniciativas de inovação tecnológica em uma empresa local, com foco na integração de inteligência artificial em ecossistemas corporativos. Desenvolve soluções baseadas em LLMs para automação inteligente de processos e análise de dados, utilizando infraestrutura conteinerizada com Docker e orquestração de workflows por meio do n8n.

## Principais Competências
- AngularJS
- React.js
- Docker

## Experiência Profissional
### Agropalma - Full Stack Developer (Janeiro de 2025 - Agosto de 2025)
- Desenvolvimento de aplicações web end-to-end com PHP (Laravel), Angular e SQL.
- Integração de soluções de IA baseadas em LLMs e automação com n8n.

### 100% AMAZONIA - Full Stack Developer (Agosto de 2021 - Janeiro de 2025)
- Analista de Sistemas gerenciando soluções de eficiência operacional e segurança digital.

### Self Employed - Freelancer Specialist (Março de 2016 - Novembro de 2024)
- Desenvolvimento Web Freelancer (React, Angular, PHP/Laravel, Python/Django).
`;

export const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `Você é um assistente virtual especializado no currículo de Ivan Cavalcante. 
  Seu objetivo é responder perguntas sobre a carreira, habilidades e experiências de Ivan usando as informações abaixo:
  
  ${RESUME_CONTEXT}
  
  Instruções:
  1. Seja profissional e direto.
  2. Se a informação não estiver no currículo, diga educadamente que não tem essa informação específica.
  3. Destaque as competências em IA e Desenvolvimento Full Stack sempre que relevante.
  4. Use um tom prestativo como se estivesse apresentando Ivan a um recrutador.`
});

export async function sendMessage(history, message) {
  if (!API_KEY) {
      console.warn("A chave da API Gemini não foi encontrada.");
      return "Olá! Sou a IA do Ivan. Para eu funcionar, você precisa configurar a chave de API no painel da Vercel.";
  }

  try {
    // Formata o histórico para o padrão esperado pelo SDK do Google
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.parts[0].text }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro na API Gemini (Chat Mode):", error);
    
    // Fallback: Tenta gerar conteúdo simples sem o histórico se o chat falhar
    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text();
    } catch (innerError) {
        console.error("Erro fatal na API Gemini:", innerError);
        return "Desculpe, encontrei um erro ao processar sua solicitação. Por favor, verifique se a chave de API está correta e tente novamente.";
    }
  }
}
