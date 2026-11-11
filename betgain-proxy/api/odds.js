export default async function handler(req, res) {
  // Permite que o seu GitHub Pages aceda a esta API (resolve o CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const API_KEY = process.env.THE_ODDS_API_KEY;
  const sportKey = req.query.sport || 'soccer_epl';
  const region = req.query.region || 'eu';
  const markets = req.query.markets || 'h2h';

  if (!API_KEY) {
    return res.status(500).json({ error: 'Chave de API não configurada no servidor.' });
  }

  const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=${region}&markets=${markets}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao consultar a The-Odds-API: ' + error.message });
  }
}