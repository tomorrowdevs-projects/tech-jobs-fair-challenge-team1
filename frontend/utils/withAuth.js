import {useContext, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {AuthContext} from "../context/AuthContext";
import LoadingSpinner from "../components/loadingSpinner/page";


export default function withAuth(WrappedComponent) {
    return function WithAuthWrapper(props) {
        const { user, isLoading } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!isLoading && !user) {
                // If user is not authenticated and authentication check is complete, redirect to sign-in page
                router.push('/authentication/sign-in');
            }
        }, [isLoading, user, router]);

        if (isLoading) {
            // Display a loading indicator while authentication check is in progress
            return <LoadingSpinner />;
        }

        // If authentication check is complete and user is authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };
}
