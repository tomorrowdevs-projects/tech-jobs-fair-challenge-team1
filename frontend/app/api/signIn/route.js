import config from '../../../utils/config';
import { NextResponse } from "next/server";

export async function POST(req, res) {
    if (req.method === 'POST') {

        const { email, password } = await req.json();
        console.log(email, password)
        const response = await fetch(`${config.baseURL}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const {access_token} = await response.json();
        if (access_token) {
            return NextResponse.json({ message: 'Login successful', access_token }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }
    } else {
       return  NextResponse.json({ message: 'Method Not Allowed' });
    }
}