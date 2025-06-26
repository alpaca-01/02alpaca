export default async function handler(req, res) {
  // Permitir CORS para preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  const { baseUsuario, nombre } = req.query;

  const url = `https://script.google.com/macros/s/AKfycbwKAfwGplbYFgv7IWAdiTLxFn-2GPrHedolzHzFwGHj-h-lSiwFidoVjBww-qqtAC_Npw/exec?baseUsuario=${encodeURIComponent(baseUsuario)}&nombre=${encodeURIComponent(nombre)}`;

  try {
    // Habilitar CORS antes
    res.setHeader('Access-Control-Allow-Origin', '*');

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Script respondió con status ${response.status}`);
    }
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar Google Apps Script', details: error.message });
  }
}
