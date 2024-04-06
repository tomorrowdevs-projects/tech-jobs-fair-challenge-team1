import 'styles/theme.scss';
import {AuthProvider} from "../context/AuthContext";

export const metadata = {
    title: 'TechSolutions Inc',
    description: 'TechSolutions Inc - Admin dashboard',
    keywords: ''
}

export default function RootLayout({ children }) {
    return (
        <AuthProvider>
        <html lang="en">
            <body className='bg-light'>
                {children}
            </body>
        </html>
        </AuthProvider>
    )
}
