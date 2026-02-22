const MODEL_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export type AiRecipeIdea = {
  title: string;
  ingredients: string[];
  instructions: string[];
  addOns?: string[];
};

const systemPrompt = (
  userIngredients: string[],
) => `You are a helpful cooking assistant. Given the user's available ingredients, propose 3-5 concise recipe ideas that mostly use those ingredients.
- Ground every idea in the provided ingredients first; pantry staples (salt, pepper, oil, sugar, vinegar, soy sauce, garlic/onion powder) are okay as helpers, not main items.
- Keep each idea short: clear title plus 3-6 ingredients and 2-4 quick steps.
- Prefer no-cook or minimal equipment; blender/ice/chill/freezer is okay.
- If an idea needs extra ingredients, list only 1-2 small add-ons.
- Use clear, familiar dish names (smoothie, salsa, lassi, parfait, toast, bowl, sorbet). Avoid vague titles like "mix" or "med".
- When you see fruit like mango/mangos, give sensible, known dishes (e.g., mango smoothie, mango salsa, mango lassi, mango sorbet).
- When you see savory combos like eggplant + rice + bread, suggest grounded dishes that use them (e.g., charred eggplant rice bowl, eggplant tomato toast, crispy eggplant over rice with yogurt drizzle). Do NOT invent tuna or meats unless provided.
- Steps must be actionable (blend, chill, stir, toast, simmer) and make culinary sense for the listed ingredients; include quick timings (e.g., "blend 30 sec", "toast 4 min", "simmer 8 min").
- Include a short descriptor of why it works (texture/temperature/acid-sweet balance) when helpful.
- Call out simple substitutions if an obvious swap fits (e.g., yogurt -> coconut milk for dairy-free; lime -> lemon; honey -> sugar). Keep it short.
- If a technique matters, specify it briefly (fine dice for salsa, rough chop for salad, gentle fold for whipped cream, toast for aroma).
- If an allergen is likely (dairy, nuts), note a one-line alternative.
- Always use the provided ingredients as the hero; if you see only one item, pair it with pantry staples to make a viable recipe.
- If an ingredient is unfamiliar or rare, still propose a sensible dish with it—never say you cannot; lean on simple prep and pantry basics.
- Output only the ideas with no intro text or numbering; separate ideas with blank lines.
- Avoid unsafe suggestions (no raw/undercooked meat, no toxic combinations).

User ingredients: ${userIngredients.join(', ')}`;

export async function fetchAiSuggestions(userIngredients: string[]): Promise<AiRecipeIdea[]> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY');
  }

  const debug = Boolean((import.meta as any).env?.DEV);

  const body = {
    contents: [
      {
        parts: [
          {
            text: systemPrompt(userIngredients),
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 512,
      topP: 0.8,
    },
  };

  const res = await fetch(`${MODEL_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
  if (debug) {
    console.debug('[AI] raw response text:', text ?? '<empty>');
  }
  if (!text) return [];

  // Simple parse: split by double newlines, then extract title/ingredients/steps heuristically
  const normalized = text.replace(/(?<=^)Here are[^\n]*\n?/i, '');

  const parsed = normalized
    .split(/\n\n+/)
    .map((block: string) => block.trim())
    .filter(Boolean)
    .map((block: string) => {
      const lines = block.split(/\n+/).map(l => l.trim()).filter(Boolean);
      const title = lines[0] || 'Idea';
      const ingredients: string[] = [];
      const instructions: string[] = [];
      const addOns: string[] = [];

      lines.slice(1).forEach(line => {
        const lower = line.toLowerCase();
        if (lower.startsWith('add-on') || lower.startsWith('add on') || lower.includes('optional')) {
          addOns.push(line.replace(/^[-*]\s*/, ''));
        } else if (line.match(/^[-*]\s*/)) {
          ingredients.push(line.replace(/^[-*]\s*/, ''));
        } else if (line.match(/^\d+\./)) {
          instructions.push(line.replace(/^\d+\.\s*/, ''));
        } else {
          // fallback classify short lines as ingredients, others as steps
          if (line.split(' ').length <= 6) ingredients.push(line);
          else instructions.push(line);
        }
      });

      return {
        title,
        ingredients,
        instructions,
        addOns,
      } satisfies AiRecipeIdea;
    });

  if (debug) {
    console.debug('[AI] parsed ideas count:', parsed.length, 'ingredients input:', userIngredients);
  }

  if (parsed.length > 0) return parsed;

  // Fallback so the UI still shows something even if the model returns nothing
  const hero = (userIngredients[0] || 'Pantry').trim();
  const heroTitle = hero.length > 0 ? hero : 'Pantry';
  return [
    {
      title: `${heroTitle} smoothie` ,
      ingredients: [hero, 'ice', 'milk or yogurt', 'honey or sugar', 'pinch of salt'],
      instructions: [
        'Blend hero ingredient with ice, dairy (or alt), and sweetener for 30 seconds.',
        'Taste and adjust sweetness; add a pinch of salt to brighten.',
        'Serve cold; freeze 20 minutes for a slushier texture.',
      ],
      addOns: ['Add lime or lemon for brightness', 'Swap dairy with coconut milk for dairy-free'],
    },
  ];
}
