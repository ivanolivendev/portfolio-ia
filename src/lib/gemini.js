const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

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
Desenvolvedor orientado à construção de soluções que conectam tecnologia de ponta à resolução de problemas complexos, com domínio em PHP (Laravel e WordPress), Python e Node.js. Atualmente, lidera iniciativas de inovação tecnológica em uma empresa local, com foco na integração de inteligência artificial em ecossistemas corporativos. Desenvolve soluções baseadas em LLMs para automação inteligente de processos e análise de dados.

## Experiência Profissional
- Agropalma (Full Stack Developer) - Jan 2025 - Ago 2025. Foco em IA e Laravel.
- 100% AMAZONIA (Full Stack Developer) - Ago 2021 - Jan 2025.
- Freelancer Specialist (React, Angular, PHP/Laravel, Python).
`;

export async function sendMessage(history, message) {
  if (!API_KEY || API_KEY.length < 10) {
    return "Erro: Chave de API não configurada corretamente.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const prompt = `
    Você é o assistente virtual do Ivan Cavalcante. 
    Use o currículo abaixo para responder de forma profissional e curta.
    
    CURRÍCULO:
    ${RESUME_CONTEXT}
    
    PERGUNTA DO USUÁRIO:
    ${message}
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erro da API Gemini:", data.error);
      return `Erro na API: ${data.error.message}`;
    }

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }

    return "Não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Erro de rede:", error);
    return "Erro de conexão. Verifique sua internet ou tente novamente mais tarde.";
  }
}
