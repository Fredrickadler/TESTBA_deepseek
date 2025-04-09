export default function handler(req, res) {
  const frame = {
    version: "vNext",
    image: "https://i.imgur.com/muoYEIu.jpeg",
    buttons: [{
      label: "🪐 Mint Now",
      action: "post"
    }],
    postUrl: "https://testba-deepseek.vercel.app/api/frame"
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(frame);
}
