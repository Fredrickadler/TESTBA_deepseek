export default function handler(req, res) {
  res.status(200).json({
    version: "vNext",
    image: "https://i.imgur.com/muoYEIu.jpeg",
    buttons: [{ label: "🪐 Mint Now", action: "post" }],
    postUrl: "https://testba-deepseek.vercel.app/api/frame"
  });
}