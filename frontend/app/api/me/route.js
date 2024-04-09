import config from "../../../utils/config";
import {NextResponse} from "next/server";

export async function POST(req) {
    if (req.method ==='POST'){
        const access_token= req.headers.get('Authorization');
        if (!access_token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        try {
            const response = await fetch(`${config.baseURL}/auth/me`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: access_token,
                },
            });
            const user = await response.json();
            if (!user) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.json(user, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    } else {
        return NextResponse.json({ message: 'Method Not Allowed' });
    }
}