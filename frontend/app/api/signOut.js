export default function handler(req, res) {
    if (req.method === 'POST') {
        // Here, you would handle the logout logic
        // Clear session or token
        res.status(200).json({ message: 'Logout successful' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}