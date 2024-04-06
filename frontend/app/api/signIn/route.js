import config from '../../../utils/config';
import { NextResponse } from "next/server";

export async function POST(req, res) {
    if (req.method === 'POST') {

        const { email, password } = await req.json();
        const response = await fetch(`${config.baseURL}/users`);
        const users = await response.json();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            return NextResponse.json({ message: 'Login successful', user });
        } else {
            return NextResponse.json({ message: 'Invalid username or password' });
        }
    } else {
       return  NextResponse.json({ message: 'Method Not Allowed' });
    }
}